import { should } from 'chai';
import { tokenize, createToken, Token } from './utils/tokenize';

describe("Import / export directives", () => {
    before(() => { should(); });

    it("Import with wildcard", async () => {
        const tokens = await tokenize(`import Std.Diagnostics.*;`);
        tokens.should.deep.equal([
            createToken("import", "keyword.other.import.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Std", "entity.name.namespace.qsharp"),
            createToken(".", "punctuation.accessor.qsharp"),
            createToken("Diagnostics", "entity.name.namespace.qsharp"),
            createToken(".", "punctuation.accessor.qsharp"),
            createToken("*", "keyword.operator.wildcard.qsharp"),
        ]);
    });

    it("Import single item", async () => {
        const tokens = await tokenize(`import Std.Arrays.Mapped;`);
        tokens.should.deep.equal([
            createToken("import", "keyword.other.import.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Std", "entity.name.namespace.qsharp"),
            createToken(".", "punctuation.accessor.qsharp"),
            createToken("Arrays", "entity.name.namespace.qsharp"),
            createToken(".", "punctuation.accessor.qsharp"),
            createToken("Mapped", "entity.name.namespace.qsharp"),
        ]);
    });

    it("Import multiple items", async () => {
        const tokens = await tokenize(`import Std.Diagnostics.DumpMachine, Std.Diagnostics.Fact;`);
        tokens.should.deep.equal([
            createToken("import", "keyword.other.import.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Std", "entity.name.namespace.qsharp"),
            createToken(".", "punctuation.accessor.qsharp"),
            createToken("Diagnostics", "entity.name.namespace.qsharp"),
            createToken(".", "punctuation.accessor.qsharp"),
            createToken("DumpMachine", "entity.name.namespace.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Std", "entity.name.namespace.qsharp"),
            createToken(".", "punctuation.accessor.qsharp"),
            createToken("Diagnostics", "entity.name.namespace.qsharp"),
            createToken(".", "punctuation.accessor.qsharp"),
            createToken("Fact", "entity.name.namespace.qsharp"),
        ]);
    });

    it("Import with alias", async () => {
        const tokens = await tokenize(`import Std.Math.PI as Pi;`);
        tokens.should.deep.equal([
            createToken("import", "keyword.other.import.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Std", "entity.name.namespace.qsharp"),
            createToken(".", "punctuation.accessor.qsharp"),
            createToken("Math", "entity.name.namespace.qsharp"),
            createToken(".", "punctuation.accessor.qsharp"),
            createToken("PI", "entity.name.namespace.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("as", "keyword.other.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Pi", "entity.name.type.alias.qsharp"),
        ]);
    });

    it("Export list", async () => {
        const tokens = await tokenize(`export TransversalCNOT, PreparePlus, PrepareZero;`);
        tokens.should.deep.equal([
            createToken("export", "keyword.other.import.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("TransversalCNOT", "entity.name.namespace.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("PreparePlus", "entity.name.namespace.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("PrepareZero", "entity.name.namespace.qsharp"),
        ]);
    });
});
