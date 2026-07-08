import { should } from 'chai';
import { tokenize, createToken, Token } from './utils/tokenize';

describe("Expression Operators", () => {
    before(() => { should(); });

    let declarationNot = "let a = not b;";
    it(declarationNot, async () => {
        const tokens = await tokenize(declarationNot);
        tokens.should.deep.equal([
            createToken("let", "keyword.other.let.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("a", "entity.name.variable.local.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("not", "keyword.operator.logical.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("b", "variable.other.readwrite.qsharp"),
        ]);
    });

    let argumentNot = `Fact(not And(false, false), "And returned wrong output.");`
    it(argumentNot, async () => {
        const tokens = await tokenize(argumentNot);
        tokens.should.deep.equal([
            createToken("Fact", "entity.name.function.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken("not", "keyword.operator.logical.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("And", "entity.name.function.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken("false", "constant.language.boolean.false.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("false", "constant.language.boolean.false.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("\"", "string.quoted.double.qsharp"),
            createToken("And returned wrong output.", "string.quoted.double.qsharp"),
            createToken("\"", "string.quoted.double.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
        ]);
    });

    let declarationOr = "let a = b or c;";
    it(declarationOr, async () => {
        const tokens = await tokenize(declarationOr);
        tokens.should.deep.equal([
            createToken("let", "keyword.other.let.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("a", "entity.name.variable.local.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("b", "variable.other.readwrite.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("or", "keyword.operator.logical.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("c", "variable.other.readwrite.qsharp"),
        ]);
    });

    let declarationAnd = "let a = b and c;";
    it(declarationAnd, async () => {
        const tokens = await tokenize(declarationAnd);
        tokens.should.deep.equal([
            createToken("let", "keyword.other.let.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("a", "entity.name.variable.local.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("b", "variable.other.readwrite.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("and", "keyword.operator.logical.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("c", "variable.other.readwrite.qsharp"),
        ]);
    });

    let comparison = `if foo == false {}`;
    it(comparison, async () => {
        const tokens = await tokenize(comparison);
        tokens.should.deep.equal([
            createToken("if", "keyword.control.conditional.if.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("foo", "variable.other.readwrite.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("==", "keyword.operator.comparison.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("false", "constant.language.boolean.false.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("{", "punctuation.curlybrace.open.qsharp"),
            createToken("}", "punctuation.curlybrace.close.qsharp"),
        ]);
    });

    let bitwise = `let m = a &&& b ||| c;`;
    it(bitwise, async () => {
        const tokens = await tokenize(bitwise);
        tokens.should.deep.equal([
            createToken("let", "keyword.other.let.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("m", "entity.name.variable.local.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("a", "variable.other.readwrite.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("&&&", "keyword.operator.bitwise.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("b", "variable.other.readwrite.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("|||", "keyword.operator.bitwise.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("c", "variable.other.readwrite.qsharp"),
        ]);
    });

    let tightNotEqual = `let b = a!=c;`;
    it(tightNotEqual, async () => {
        const tokens = await tokenize(tightNotEqual);
        tokens.should.deep.equal([
            createToken("let", "keyword.other.let.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("b", "entity.name.variable.local.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("a", "variable.other.readwrite.qsharp"),
            createToken("!=", "keyword.operator.comparison.qsharp"),
            createToken("c", "variable.other.readwrite.qsharp"),
        ]);
    });
});