// Builds the Q# TextMate grammar outputs from the YAML source.
//
//   src/qsharp.tmLanguage.yml  ->  grammars/qsharp.tmLanguage       (plist)
//                              ->  grammars/qsharp.tmLanguage.json  (JSON)
//
// The YAML file is the single source of truth and the only file that should be
// edited by hand. Run with `npm run build`.

const fs = require("fs");
const path = require("path");
const jsYaml = require("js-yaml");
const plist = require("plist");

const srcFile = path.join(__dirname, "src", "qsharp.tmLanguage.yml");
const grammarsDir = path.join(__dirname, "grammars");

function build() {
    const text = fs.readFileSync(srcFile, "utf8");
    const grammar = jsYaml.load(text);

    fs.mkdirSync(grammarsDir, { recursive: true });

    fs.writeFileSync(
        path.join(grammarsDir, "qsharp.tmLanguage.json"),
        JSON.stringify(grammar, null, "\t") + "\n"
    );

    fs.writeFileSync(
        path.join(grammarsDir, "qsharp.tmLanguage"),
        plist.build(grammar)
    );

    console.log("Built grammars/qsharp.tmLanguage and grammars/qsharp.tmLanguage.json");

    // Keep a copy inside the test extension (gitignored) so its manifest can
    // reference a grammar within its own folder — VS Code warns otherwise.
    const testExtDir = path.join(__dirname, "test-extension");
    if (fs.existsSync(testExtDir)) {
        fs.writeFileSync(
            path.join(testExtDir, "qsharp.tmLanguage.json"),
            JSON.stringify(grammar, null, "\t") + "\n"
        );
        console.log("Refreshed test-extension/qsharp.tmLanguage.json");
    }
}

build();
