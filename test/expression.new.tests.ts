import { should } from 'chai';
import { tokenize, createToken, Token } from './utils/tokenize';

describe("Expression: struct instantiation (new)", () => {
    before(() => { should(); });

    it("New struct literal", async () => {
        const tokens = await tokenize(`let c = new Complex { Re = 1.0, Im = 0.0 };`);
        tokens.should.deep.equal([
            createToken("let", "keyword.other.let.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("c", "entity.name.variable.local.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("new", "keyword.other.new.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Complex", "entity.name.type.struct.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("{", "punctuation.curlybrace.open.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Re", "variable.other.property.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("1.0", "constant.numeric.decimal.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Im", "variable.other.property.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("0.0", "constant.numeric.decimal.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("}", "punctuation.curlybrace.close.qsharp"),
        ]);
    });

    it("Copy-and-update struct literal (spread)", async () => {
        const tokens = await tokenize(`let c2 = new Complex { ...c, Im = 2.0 };`);
        tokens.should.deep.equal([
            createToken("let", "keyword.other.let.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("c2", "entity.name.variable.local.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("new", "keyword.other.new.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Complex", "entity.name.type.struct.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("{", "punctuation.curlybrace.open.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("...", "keyword.operator.spread.qsharp"),
            createToken("c", "variable.other.readwrite.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Im", "variable.other.property.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("2.0", "constant.numeric.decimal.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("}", "punctuation.curlybrace.close.qsharp"),
        ]);
    });
});

describe("Expression: member access", () => {
    before(() => { should(); });

    it("Field access", async () => {
        const tokens = await tokenize(`let re = c.Re;`);
        tokens.should.deep.equal([
            createToken("let", "keyword.other.let.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("re", "entity.name.variable.local.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("c", "variable.other.readwrite.qsharp"),
            createToken(".", "punctuation.accessor.qsharp"),
            createToken("Re", "variable.other.property.qsharp"),
        ]);
    });
});
