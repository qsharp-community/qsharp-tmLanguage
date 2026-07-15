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
const prettier = require("prettier");

const srcFile = path.join(__dirname, "src", "qsharp.tmLanguage.yml");
const grammarsDir = path.join(__dirname, "grammars");

// JSON Schema for TextMate grammars. Emitted only into the JSON outputs (as the
// first key)
const JSON_SCHEMA = "https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json";

async function build() {
    const text = fs.readFileSync(srcFile, "utf8");
    const grammar = jsYaml.load(text);

    const jsonGrammar = { $schema: JSON_SCHEMA, ...grammar };
    
    // format with Prettier's defaults
    const jsonText = await prettier.format(JSON.stringify(jsonGrammar), {
        parser: "json",
    });

    fs.mkdirSync(grammarsDir, { recursive: true });

    fs.writeFileSync(
        path.join(grammarsDir, "qsharp.tmLanguage.json"),
        jsonText
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
            jsonText
        );
        console.log("Refreshed test-extension/qsharp.tmLanguage.json");
    }
}

build().catch((err) => {
    console.error(err);
    process.exit(1);
});
