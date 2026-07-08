import { should } from 'chai';
import { tokenize, createToken, Token } from './utils/tokenize';

describe("Lambdas and ternary", () => {
    before(() => { should(); });

    it("Function lambda (->)", async () => {
        const tokens = await tokenize(`let add = (x, y) -> x + y;`);
        tokens.should.deep.equal([
            createToken("let", "keyword.other.let.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("add", "entity.name.variable.local.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken("x", "variable.other.readwrite.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("y", "variable.other.readwrite.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("->", "keyword.operator.lambda.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("x", "variable.other.readwrite.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("+", "keyword.operator.arithmetic.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("y", "variable.other.readwrite.qsharp"),
        ]);
    });

    it("Operation lambda (=>)", async () => {
        const tokens = await tokenize(`let flip = q => X(q);`);
        tokens.should.deep.equal([
            createToken("let", "keyword.other.let.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("flip", "entity.name.variable.local.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("q", "variable.other.readwrite.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=>", "keyword.operator.lambda.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("X", "support.function.quantum.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken("q", "variable.other.readwrite.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
        ]);
    });

    it("Ternary expression (? |)", async () => {
        const tokens = await tokenize(`let abs = x > 0 ? x | -x;`);
        tokens.should.deep.equal([
            createToken("let", "keyword.other.let.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("abs", "entity.name.variable.local.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("x", "variable.other.readwrite.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken(">", "keyword.operator.comparison.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("0", "constant.numeric.decimal.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("?", "keyword.operator.ternary.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("x", "variable.other.readwrite.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("|", "keyword.operator.ternary.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("-", "keyword.operator.arithmetic.qsharp"),
            createToken("x", "variable.other.readwrite.qsharp"),
        ]);
    });
});
