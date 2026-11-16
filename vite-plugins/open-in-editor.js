import { execFile, spawn } from "node:child_process";
import { readdirSync } from "node:fs";
import path from "node:path";
import process from "node:process";

// Opens files clicked in the vite-plugin-checker overlay in an already running Neovim.
// Every Neovim instance listens on a named pipe/socket, so the instance whose cwd is
// this project is found automatically. Set NVIM_SERVER to force a specific address.
// Falls back to opening a new Neovide window when no Neovim instance is running.

// --headless keeps the remote client from writing terminal escape codes instead of the result
function runNvim(args) {
  return new Promise((resolve, reject) => {
    execFile("nvim", ["--headless", "--clean", ...args], { timeout: 2000, windowsHide: true }, (err, stdout) => {
      if (err) reject(err);
      else resolve(stdout.trim());
    });
  });
}

function listServers() {
  if (process.env.NVIM_SERVER) return [process.env.NVIM_SERVER];
  if (process.platform !== "win32") return [];

  try {
    return readdirSync("\\\\.\\pipe\\")
      .filter(name => /^nvim\.\d+\.\d+$/.test(name))
      .map(name => "\\\\.\\pipe\\" + name);
  } catch {
    return [];
  }
}

const normalize = p => path.resolve(p).toLowerCase();

async function findServer(root) {
  const servers = listServers();
  const cwds = await Promise.all(
    servers.map(address => runNvim(["--server", address, "--remote-expr", "getcwd()"]).catch(() => null))
  );

  const projectRoot = normalize(root);
  const reachable = servers
    .map((address, i) => ({ address, cwd: cwds[i] }))
    .filter(({ cwd }) => cwd !== null);
  const inProject = reachable.find(({ cwd }) => {
    const dir = normalize(cwd);
    return projectRoot === dir || projectRoot.startsWith(dir + path.sep);
  });
  return (inProject ?? reachable[0])?.address;
}

// Vimscript single quoted string, where the only escape is doubling the quote
const vimString = str => "'" + str.replaceAll("'", "''") + "'";

export default function openInEditor() {
  return {
    name: "fix-open-in-editor",
    configureServer(server) {
      const base = server.config.base || "/";

      server.middlewares.use(base + "__open-in-editor", async (req, res, next) => {
        const url = new URL(req.url, "http://localhost");
        const fileParam = url.searchParams.get("file");
        if (!fileParam) {
          next();
          return;
        }

        // "A:/path/file.jsx:12:5", the drive letter colon makes a plain split unreliable
        const [, file, line = "1", col = "1"] = fileParam.match(/^(.+?)(?::(\d+))?(?::(\d+))?$/);
        const filePath = path.resolve(server.config.root, file);

        try {
          const address = await findServer(server.config.root);
          if (address) {
            const command = `'drop ' . fnameescape(${vimString(filePath)}) . ' | call cursor(${line}, ${col}) | normal! zvzz'`;
            await runNvim(["--server", address, "--remote-expr", `execute(${command})`]);
          } else {
            spawn("neovide", [filePath, "--", `+call cursor(${line}, ${col})`], {
              detached: true,
              stdio: "ignore",
            }).unref();
          }
          res.statusCode = 200;
          res.end("OK");
        } catch (err) {
          server.config.logger.error(`[open-in-editor] ${err.message}`);
          res.statusCode = 500;
          res.end("Failed to open editor");
        }
      });
    },
  };
}
