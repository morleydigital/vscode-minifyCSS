# minifyCSS
VS Code extension to minify CSS files using [cssnano](https://cssnano.github.io/cssnano/) (via PostCSS). Minify the active file with a command or enable automatic minification on save. Outputs a `.min.css` file alongside the source, with optional source map generation.

### Why we created this extension
Whilst there are a number of CSS minification extensions available on the VS Code extensions marketplace, most have not been updated in several years, or use outdated CSS minification libraries that are no longer actively maintained.

### Why we chose cssnano as a minification library
cssnano is the most widely adopted CSS minification library in the JavaScript ecosystem, used under the hood by webpack, Vite, Parcel, and many other build tools. It is actively maintained, well documented, and built on top of [PostCSS](https://postcss.org/) — a battle-tested and highly stable CSS processing platform.

Compared to alternatives, cssnano offers a modular preset system that gives you control over how aggressively your CSS is optimised, from safe whitespace removal through to advanced techniques like selector merging and colour conversion. It consistently produces smaller output than older libraries while remaining reliable across modern CSS features.

## Usage

- **Command palette** → `Minify Current CSS File` — minifies the currently open CSS file immediately.
- **On save** — configure `minifyOnSave` to minify automatically whenever a CSS file is saved.

Output is written to `<filename>.min.css` in the same directory. `.min.css` files are never re-processed.

## Settings

| Setting | Default | Description |
|---|---|---|
| `minifycss.minifyOnSave` | `"No"` | `"No"` — disabled; `"Existing"` — only if a `.min.css` already exists; `"All"` — always |
| `minifycss.preset` | `"default"` | cssnano preset: `"default"`, `"advanced"`, or `"lite"` (see below) |
| `minifycss.generateSourceMap` | `false` | Write a `.min.css.map` file and append a `sourceMappingURL` comment |
| `minifycss.successNotificationStatusBar` | `false` | Show a status bar message on success |
| `minifycss.successNotificationInformationMessage` | `false` | Show an info popup on success |

### cssnano presets

- **default** — safe optimisations suitable for most projects.
- **advanced** — more aggressive optimisations; may alter some CSS behaviour (e.g. colour conversion, selector merging).
- **lite** — minimal optimisations.

## Test suite

The `test/` directory contains a visual comparison tool for verifying minification output across presets.

```
test/
  css/
    test1-default.css       # source CSS files
    test2-advanced.css
    test3-lite.css
  index.html                # side-by-side comparison viewer
  preview.html              # iframe target used by index.html
```

To use it:
1. Open the three source CSS files in VS Code and run **Minify Current CSS File** (or save with `minifyOnSave` enabled) to generate the `.min.css` output files.
2. Open `test/index.html` in a browser.
3. Use the **Left** and **Right** dropdowns to select any source or minified CSS file in each panel.
4. Toggle **Sync scroll** to scroll both previews together.

This lets you compare the rendered output of the original and minified CSS side-by-side to spot any visual regressions between presets.

## Packaging

```bash
# Install node.js - min 22.11.x required by PostCSS (if not already installed)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash
sudo apt install nodejs -y

# Install dependencies
npm install

# Package as .vsix
npm run package
```

> **Note:** package via `npm run package`, not a bare `vsce package`. The
> npm script runs `vsce package --readme-path README.vsce.md`, which bundles
> the Marketplace-specific README (`README.vsce.md`) instead of this GitHub
> README. A plain `vsce package` would ship the wrong README in the VSIX (and
> in the VS Code "Details" tab). The script uses `npx`, so a global `vsce`
> install isn't required.

## Changelog
- 1.0.0 - Initial release
- 1.1.0 - Added option to select cssnano preset (default, advanced or lite)
- 1.1.1 - Added dedicated readme for vscode
- 1.1.2 - Ensured the Marketplace README is bundled when packaging (CI + `npm run package`)

## Roadmap
✅ ~~Add option to select cssnano preset (default, advanced or lite)~~ *(completed in v1.1.0)*  
🔲 Add commands to minify a file using a specific preset  
🔲 Add options to further customise modules included in each preset  
🔲 Improve success message to include minification stats (eg. original file size, minified file size, saving)  
🔲 Bundle using webpack and modify codebase to support vscode.dev