import { spawn } from "node:child_process";

export default function openInEditor() {
  return {
    name: "fix-open-in-editor",
    configureServer(server) {
      const base = server.config.base || "/";

      server.middlewares.use(base + "__open-in-editor", (req, res, next) => {
        const url = new URL(req.url, "http://localhost");
        const file = url.searchParams.get("file");
        if (!file) {
          next();
          return;
        }

        spawn("zed", [file], {
          detached: true,
          stdio: "ignore",
        }).unref();

        res.statusCode = 200;
        res.end("OK");
        return;
      });
    },
  }
}
