// Manual deployment to the gh-pages branch, which is kept in its own git worktree.
//
//   pnpm run deploy [name]         Build the current checkout and publish it. Defaults to the
//                                  branch name, or the commit message on a detached HEAD.
//   pnpm run deploy:remove <name>  Remove a published preview.
//
// The name "main" is published to the site root, all others to branches/<name>/.
import { execFileSync, execSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";

const PAGES_BRANCH = "gh-pages";
const SITE_URL = "https://kassu11.github.io/legendary-octo-barnacle";

const git = (cwd, ...args) => execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] }).trim();
// Keep the published files byte for byte what the build produced, whatever the local autocrlf setting is
const pagesGit = (worktree, ...args) => git(worktree, "-c", "core.autocrlf=false", ...args);

// Must stay a single safe path segment, as it is used for deleting and creating folders under branches/
function toSlug(name) {
  const slug = name.replace(/[^\w.-]+/g, "-").slice(0, 60).replace(/^[-.]+|[-.]+$/g, "");
  if (!slug) throw new Error(`"${name}" can't be used as a deployment name`);
  return slug;
}

function findPagesWorktree(root) {
  git(root, "worktree", "prune");
  const blocks = git(root, "worktree", "list", "--porcelain").split("\n\n");
  const block = blocks.find(block => new RegExp(`^branch refs/heads/${PAGES_BRANCH}$`, "m").test(block));
  return block?.match(/^worktree (.+)$/m)[1];
}

function preparePagesWorktree(root) {
  git(root, "fetch", "origin", PAGES_BRANCH);

  let worktree = findPagesWorktree(root);
  if (!worktree) {
    worktree = join(dirname(root), `${basename(root)}-${PAGES_BRANCH}`);
    git(root, "worktree", "add", "-B", PAGES_BRANCH, worktree, `origin/${PAGES_BRANCH}`);
  }

  // The worktree is only used by this script, the remote is always the source of truth
  pagesGit(worktree, "reset", "--hard", `origin/${PAGES_BRANCH}`);
  pagesGit(worktree, "clean", "-fdx");
  return worktree;
}

function publishFiles(dist, worktree, slug) {
  if (slug === "main") {
    // Everything but the previews is replaced, so old assets don't pile up in the root
    for (const entry of readdirSync(worktree)) {
      if (entry !== "branches" && entry !== ".git") rmSync(join(worktree, entry), { recursive: true, force: true });
    }
    cpSync(dist, worktree, { recursive: true });
  } else {
    const target = join(worktree, "branches", slug);
    rmSync(target, { recursive: true, force: true });
    mkdirSync(target, { recursive: true });
    cpSync(dist, target, { recursive: true });
  }
}

// branches.json is read by the dev branch menu in the footer, and it lists what actually exists on gh-pages
function writeManifest(worktree) {
  const branchesDir = join(worktree, "branches");
  const branches = existsSync(branchesDir)
    ? readdirSync(branchesDir, { withFileTypes: true }).filter(entry => entry.isDirectory()).map(entry => entry.name).sort()
    : [];
  const manifest = JSON.stringify(["main", ...branches], null, 2) + "\n";

  writeFileSync(join(worktree, "branches.json"), manifest);
  for (const branch of branches) writeFileSync(join(branchesDir, branch, "branches.json"), manifest);
}

function commitAndPush(worktree, message) {
  pagesGit(worktree, "add", "-A");
  if (!pagesGit(worktree, "status", "--porcelain")) return false;

  pagesGit(worktree, "commit", "-m", message);
  console.log(`\nPushing ${PAGES_BRANCH}...`);
  pagesGit(worktree, "push", "origin", PAGES_BRANCH);
  return true;
}

function deploy(root, customName) {
  const name = customName || git(root, "branch", "--show-current") || git(root, "log", "-1", "--format=%s");
  const slug = toSlug(name);
  const dirty = git(root, "status", "--porcelain") !== "";
  const commit = git(root, "rev-parse", "--short", "HEAD") + (dirty ? "-dirty" : "");

  console.log(`Deploying ${commit} as "${slug}"`);
  if (dirty) console.warn("Warning: uncommitted changes will be included in this deployment");

  const shell = { cwd: root, stdio: "inherit" };
  execSync("pnpm install --frozen-lockfile", shell);
  execSync("pnpm run build", { ...shell, env: { ...process.env, SAFE_BRANCH_NAME: slug } });

  const worktree = preparePagesWorktree(root);
  publishFiles(join(root, "dist"), worktree, slug);
  writeManifest(worktree);

  const pushed = commitAndPush(worktree, `Deploy ${slug} to Pages (${commit})`);
  console.log(pushed ? "\nDeployed, Pages usually updates in 1-2 minutes:" : "\nNo changes to deploy:");
  console.log(slug === "main" ? SITE_URL : `${SITE_URL}?dev-branch=${slug}`);
}

function remove(root, name) {
  if (!name) throw new Error("Usage: pnpm run deploy:remove <name>");
  const slug = toSlug(name);
  if (slug === "main") throw new Error("The main site can't be removed");

  const worktree = preparePagesWorktree(root);
  const target = join(worktree, "branches", slug);
  if (!existsSync(target)) throw new Error(`branches/${slug} doesn't exist on ${PAGES_BRANCH}`);

  rmSync(target, { recursive: true, force: true });
  writeManifest(worktree);
  commitAndPush(worktree, `Remove ${slug} from Pages`);
  console.log(`\nRemoved ${slug}`);
}

try {
  const args = process.argv.slice(2).filter(arg => arg !== "--");
  const isRemove = args[0] === "--remove";
  const [name, ...extra] = isRemove ? args.slice(1) : args;
  if (extra.length) throw new Error(`Expected one name, got: ${[name, ...extra].join(" ")}`);

  const root = git(process.cwd(), "rev-parse", "--show-toplevel");
  if (isRemove) remove(root, name);
  else deploy(root, name);
} catch (error) {
  console.error(`\nDeployment failed: ${error.message}`);
  process.exit(1);
}
