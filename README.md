# Legendary Octo Barnacle
This project does not currently have any real name, but it's supposed to combine AniList and MyAnimeList APIs to one simple site.

## Current progress
1. Make it work
2. Make it good <---
3. Make it fast

> [!IMPORTANT]
> This project is currently under works, and has a lot of bugs and missing features

## Usage

```bash
$ pnpm i
```

### Learn more on the [Solid Website](https://solidjs.com) and come chat with us on our [Discord](https://discord.com/invite/solidjs)

## Available Scripts

In the project directory, you can run:

### `pnpm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### `pnpm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment

Deployments are run manually, and they are published through the `gh-pages` branch. The branch is checked out to a git worktree next to this repository (`../<repo>-gh-pages`), which gets created on the first run.

### `pnpm run deploy [name]`

Builds the current checkout, including any uncommitted changes, and pushes it to `gh-pages`.<br>
The name defaults to the current branch, or to the commit message on a detached HEAD. `main` is published to the site root, and all other names to `branches/<name>/`.

### `pnpm run deploy:remove <name>`

Removes a published preview from `gh-pages`, for example after its branch has been merged.

Learn more about deploying your application with the [documentations](https://vite.dev/guide/static-deploy.html)
