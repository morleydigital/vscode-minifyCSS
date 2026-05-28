// extension.js
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const cssnano = require('cssnano');

function activate(context) {
	function isCssDoc(document) {
		return document && document.languageId === 'css';
	}

	async function minify(document, showStatus = true) {
		if (!isCssDoc(document)) return;

		const inputPath = document.fileName;

		// Avoid re-minifying .min.css files
		if (inputPath.toLowerCase().endsWith('.min.css')) {
			if (showStatus) vscode.window.setStatusBarMessage('File already appears to be minified.', 5000);
			return;
		}

		const css = document.getText();
		if (!css.trim().length) {
			if (showStatus) vscode.window.setStatusBarMessage('File is empty, nothing to minify.', 5000);
			return;
		}

		const config = vscode.workspace.getConfiguration('minifycss');
		const generateSourceMap = config.get('generateSourceMap', false);
		const successNotificationStatusBar = config.get('successNotificationStatusBar', false);
		const successNotificationInformationMessage = config.get('successNotificationInformationMessage', false);

		const outName = inputPath.replace(/\.css$/i, '.min.css');
		const sourceMapName = `${outName}.map`;
		const fileName = path.basename(inputPath);

		try {
			const result = await postcss([cssnano({ preset: 'default' })]).process(css, {
				from: inputPath,
				to: outName,
				map: generateSourceMap ? { inline: false, annotation: false } : false,
			});

			// result.css and (optionally) result.map
			fs.writeFileSync(outName, result.css);

			if (generateSourceMap && result.map) {
				const mapString = typeof result.map === 'string' ? result.map : result.map.toString();
				fs.writeFileSync(sourceMapName, mapString);
				fs.appendFileSync(outName, `\n/*# sourceMappingURL=${path.basename(sourceMapName)} */`);
			}

			if (successNotificationStatusBar) {
				vscode.window.setStatusBarMessage(`${fileName} was minified successfully.`, 5000);
			}
			if (successNotificationInformationMessage) {
				vscode.window.showInformationMessage(`✅ ${fileName} was minified successfully.`);
			}
		} catch (err) {
			vscode.window.showErrorMessage('Minification failed: ' + (err && err.message ? err.message : String(err)));
		}
	}

	// Version info command
	const versionDisposable = vscode.commands.registerCommand('minifycss.showVersions', () => {
		const cssnanoVersion = require('cssnano/package.json').version;
		const postcssVersion = require('postcss/package.json').version;
		vscode.window.showInformationMessage(`minifyCSS — cssnano v${cssnanoVersion}, postcss v${postcssVersion}`);
	});
	context.subscriptions.push(versionDisposable);

	// Manual command
	const disposable = vscode.commands.registerCommand('minifycss.minify', async () => {
		const editor = vscode.window.activeTextEditor;
		if (editor && editor.document) {
			await minify(editor.document, true);
		}
	});
	context.subscriptions.push(disposable);

	// Auto minify on save
	const saveListener = vscode.workspace.onDidSaveTextDocument((doc) => {
		if (!isCssDoc(doc)) return;

		const config = vscode.workspace.getConfiguration('minifycss');
		const mode = config.get('minifyOnSave', 'No'); // "No" | "Existing" | "All"
		if (mode === 'No') return;

		// Don’t immediately re-minify minified files
		if (doc.fileName.toLowerCase().endsWith('.min.css')) return;

		const inputPath = doc.fileName;
		const outPath = inputPath.replace(/\.css$/i, '.min.css');

		if (mode === 'Existing') {
			if (fs.existsSync(outPath)) minify(doc, true);
		} else if (mode === 'All') {
			minify(doc, true);
		}
	});
	context.subscriptions.push(saveListener);
}

exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;
