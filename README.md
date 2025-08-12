# minifyCSS
Extension for VS Code to automatically minify CSS files on save, using the [cssnano](https://cssnano.github.io/cssnano/) library

## To package as VCIX
1. Download files
2. Install *VSCE* if not already installed: `npm install -g @vscode/vsce`
3. Install dependancies: `npm install`
4. Package using: `vsce package`

## Roadmap
1. Add option to select cssnano preset (currently uses default preset)
2. Bundle using webpack and modify codebase to support vscode.dev

