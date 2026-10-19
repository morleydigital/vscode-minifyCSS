# Changelog

All notable changes to the **minifyCSS** extension are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.4]

### Changed
- Updated cssnano to 9.9.0 and postcss to 8.5.31.
- Removed the separate `cssnano-preset-advanced` and `cssnano-preset-lite` dependencies — cssnano 9.9.0 bundles all three presets (`default`, `advanced`, `lite`) itself. Install size drops from ~30 transitive packages to a handful.
- Minimum VS Code version raised to 1.123.0 — the first release whose bundled Node (24.15.0) meets cssnano 9.9.0's requirement (`^22.22.3 || ^24.15.0`).
- Excluded the repository's `.github/` folder from the packaged VSIX.

## [1.1.3]

### Changed
- Updated cssnano and cssnano-preset-advanced to 8.0.2, and cssnano-preset-lite to 5.0.1.

## [1.1.2]

### Fixed
- The published VSIX (and the VS Code **Details** tab) now uses the dedicated Marketplace README. Packaging is routed through `npm run package` / the release workflow so the `--readme-path README.vsce.md` flag is always applied.

## [1.1.1]

### Added
- Dedicated README for the VS Code Marketplace listing.

## [1.1.0]

### Added
- Option to select the cssnano preset (`default`, `advanced`, or `lite`) via the `minifycss.preset` setting.

## [1.0.0]

### Added
- Initial release.
- Minify the active CSS file via the **Minify Current CSS File** command.
- Automatic minification on save (`minifycss.minifyOnSave`: `No` / `Existing` / `All`).
- Optional source map generation (`minifycss.generateSourceMap`).
- Optional success notifications in the status bar and as information messages.
