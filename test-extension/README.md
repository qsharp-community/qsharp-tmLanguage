# Grammar test extension

A throwaway VS Code extension used to manually test the Q# TextMate grammar in a
real editor, isolated from the QDK extension (no language server, so no semantic
highlighting paints over the grammar).

It contributes the `qsharp` language for `.qs` files. Its grammar
(`qsharp.tmLanguage.json`) is generated into this folder by `npm run build`
(gitignored) so the manifest can reference a file inside its own folder — VS Code
warns about grammar paths that escape the extension directory.

## Usage

1. Build the grammar so `grammars/qsharp.tmLanguage.json` is current:

   ```bash
   npm run build
   ```

2. Open the **repository root** in VS Code and press **F5** (the
   `Test grammar (Extension Development Host)` launch config). This opens an
   Extension Development Host with the official QDK extension disabled and
   [`sample.qs`](./sample.qs) loaded.

3. Verify tokenization with **`Developer: Inspect Editor Tokens and Scopes`**
   (Command Palette) — hover a token to see its `source.qsharp` scopes. This is
   the authoritative check; colors are just the active theme's scope mapping.

4. After editing `src/qsharp.tmLanguage.yml`, re-run `npm run build` and reload
   the host window (`Cmd/Ctrl+R`) to pick up the new grammar.

## Notes

- The launch config disables `quantum.qsharp-lang-vscode` only inside the
  development host — your normal editor is untouched.
- If you prefer not to use F5, symlink this folder into your extensions dir
  (`ln -s "$PWD/test-extension" ~/.vscode/extensions/qsharp-tmlanguage-test`),
  disable the QDK extension, and reload.
