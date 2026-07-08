import { should } from 'chai';
import { tokenize, createToken, Token } from './utils/tokenize';

describe("Control flow statements", () => {
    before(() => { should(); });

    it("If statement body is tokenized", async () => {
        const tokens = await tokenize(`if n % 3 == 0 { Message("Fizz"); }`);
        tokens.should.deep.equal([
            createToken("if", "keyword.control.conditional.if.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("n", "variable.other.readwrite.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("%", "keyword.operator.arithmetic.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("3", "constant.numeric.decimal.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("==", "keyword.operator.comparison.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("0", "constant.numeric.decimal.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("{", "punctuation.curlybrace.open.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Message", "entity.name.function.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken("\"", "string.quoted.double.qsharp"),
            createToken("Fizz", "string.quoted.double.qsharp"),
            createToken("\"", "string.quoted.double.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
            createToken("; ", "source.qsharp"),
            createToken("}", "punctuation.curlybrace.close.qsharp"),
        ]);
    });

    it("If/else expression chains through the else block", async () => {
        const tokens = await tokenize(`let a = if x > 0 { x } else { -x };`);
        tokens.should.deep.equal([
            createToken("let", "keyword.other.let.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("a", "entity.name.variable.local.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("if", "keyword.control.conditional.if.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("x", "variable.other.readwrite.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken(">", "keyword.operator.comparison.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("0", "constant.numeric.decimal.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("{", "punctuation.curlybrace.open.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("x", "variable.other.readwrite.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("}", "punctuation.curlybrace.close.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("else", "keyword.control.conditional.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("{", "punctuation.curlybrace.open.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("-", "keyword.operator.arithmetic.qsharp"),
            createToken("x", "variable.other.readwrite.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("}", "punctuation.curlybrace.close.qsharp"),
        ]);
    });

    it("Bare reassignment of a mutable variable", async () => {
        const tokens = await tokenize(`mutableInt = 10;`);
        tokens.should.deep.equal([
            createToken("mutableInt", "variable.other.readwrite.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("10", "constant.numeric.decimal.qsharp"),
        ]);
    });

    it("Compound assignment", async () => {
        const tokens = await tokenize(`counter += 1;`);
        tokens.should.deep.equal([
            createToken("counter", "variable.other.readwrite.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("+=", "keyword.operator.assignment.compound.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("1", "constant.numeric.decimal.qsharp"),
        ]);
    });
});
