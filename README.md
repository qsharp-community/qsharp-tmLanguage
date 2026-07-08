# Q# language - syntax grammar for code highlighting

This repository contains the TextMate grammar for Q#. The grammar provides tokenization support for Q# language files, and can be used for syntax highlighting of Q# code in any editor.

[![CoC](https://img.shields.io/badge/code%20of%20conduct-contributor%20covenant-yellow)](CODE_OF_CONDUCT.md)

## Language coverage

The grammar tracks modern Q# (QDK 1.x) and covers, among other things:

* File-scoped namespaces, `import` / `export` directives (with `*` wildcards and `as` aliases), and the legacy `namespace { }` / `open` forms
* `struct` declarations, `new` struct instantiation, copy-and-update (`...spread`) and member access (`point.X`)
* Attributes (`@EntryPoint()`, `@Test()`, `@Config(...)`, ...)
* Operation/function declarations with type parameters and class constraints (`<'T : Eq + Add>`, `Exp['T]`), plus the functors `is Adj + Ctl`
* Lambdas (`->`, `=>`), partial application, ternary (`cond ? a | b`), and the full operator set (arithmetic, comparison, logical, bitwise `&&& ||| ^^^ ~~~ <<< >>>`, ranges `..`/`...`, copy-update `w/ ... <-`)
* Numeric literals in decimal, hex (`0xFF`), binary (`0b1010`), octal (`0o52`), `BigInt` (`42L`), exponent (`1.0e-3`) and digit-separator (`1_000`) forms
* Interpolated strings (`$"...{expr}..."`) with tokenized expression holes
* Intrinsic quantum operations highlighted as quantum operations while still tokenizing their arguments

The behaviour is pinned by an extensive unit-test suite; the tests can additionally be run against a checkout of the official [`microsoft/qdk`](https://github.com/microsoft/qdk) samples by pointing the `QDK_SAMPLES` environment variable at its `samples/` directory.

## Build and Development

To contribute, clone the repo and run (requires Node.js and `npm` to be installed on the dev machine)

* `npm install` to install all dependencies
* Run `npm run build` to regenerate the grammar outputs from the YAML source
* Run `npm test` to build the grammar and run the unit tests

The source grammar is located at `src/qsharp.tmLanguage.yml` and is the core file to be maintained.
The build (`build.js`) converts it into the two output files below; the tests tokenize
Q# snippets with `vscode-textmate` and assert on the resulting scopes.

## Output

The output are the grammar files located at:

* `grammars/qsharp.tmLanguage`
* `grammars/qsharp.tmLanguage.json`

These two files are committed to source control to allow easy access to latest grammars, but they should not be edited by hand.

The latest ones can be grabbed manually from [here](https://github.com/qsharp-community/qsharp-tmLanguage/tree/main/grammars) and used directly in any editor supporting TextMate grammar.

## License

[MIT License](https://github.com/qsharp-community/qsharp-tmLanguage/blob/main/LICENSE)
