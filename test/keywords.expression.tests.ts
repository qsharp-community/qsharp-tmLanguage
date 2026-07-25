import { should } from 'chai';
import { tokenize, createToken, Token } from './utils/tokenize';

// keywords should be recognized inside expression contexts too, not only where
// a statement is expected
describe("Keywords in expression contexts", () => {
    before(() => { should(); });

    it("within/apply in a lambda body", async () => {
        const tokens = await tokenize(`let op = q => within { H(q); } apply { X(q); };`);
        tokens.should.deep.equal([
            createToken("let", "keyword.other.let.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("op", "entity.name.variable.local.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("q", "variable.other.readwrite.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=>", "keyword.operator.lambda.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("within", "keyword.control.qsharp"),
            createToken(" { ", "source.qsharp"),
            createToken("H", "support.function.quantum.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken("q", "variable.other.readwrite.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
            createToken("; } ", "source.qsharp"),
            createToken("apply", "keyword.control.qsharp"),
            createToken(" { ", "source.qsharp"),
            createToken("X", "support.function.quantum.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken("q", "variable.other.readwrite.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
        ]);
    });

    it("Keyword inside an argument list", async () => {
        const tokens = await tokenize(`Foo(for);`);
        tokens.should.deep.equal([
            createToken("Foo", "entity.name.function.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken("for", "keyword.control.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
        ]);
    });

    it("Keyword-looking text inside a string is not a keyword", async () => {
        const tokens = await tokenize(`let s = "return within apply";`);
        tokens.should.deep.equal([
            createToken("let", "keyword.other.let.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("s", "entity.name.variable.local.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken(`"`, "string.quoted.double.qsharp"),
            createToken("return within apply", "string.quoted.double.qsharp"),
            createToken(`"`, "string.quoted.double.qsharp"),
        ]);
    });

    it("Keyword-looking text inside a comment is not a keyword", async () => {
        const tokens = await tokenize(`let x = 1; // return within apply`);
        tokens.should.deep.equal([
            createToken("let", "keyword.other.let.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("x", "entity.name.variable.local.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("1", "constant.numeric.decimal.qsharp"),
            createToken("; ", "source.qsharp"),
            createToken("//", "punctuation.definition.comment.qsharp"),
            createToken(" return within apply", "comment.line.double-slash.qsharp"),
        ]);
    });
});

// An unterminated statement must not swallow the rest of the file: a closing
// curly brace ends the statement just like `;` or `)` do.
describe("Unterminated statements stop at a closing brace", () => {
    before(() => { should(); });

    it("let without a semicolon", async () => {
        const tokens = await tokenize(`operation Main() : Unit {
    let x = 1
}
function Bar() : Unit {}`);
        tokens.should.deep.equal([
            createToken("operation", "keyword.other.callable.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Main", "entity.name.function.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
            createToken(" : ", "source.qsharp"),
            createToken("Unit", "storage.type.qsharp"),
            createToken(" {", "source.qsharp"),
            createToken("    ", "source.qsharp"),
            createToken("let", "keyword.other.let.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("x", "entity.name.variable.local.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("1", "constant.numeric.decimal.qsharp"),
            createToken("}", "source.qsharp"),
            createToken("function", "keyword.other.callable.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Bar", "entity.name.function.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
            createToken(" : ", "source.qsharp"),
            createToken("Unit", "storage.type.qsharp"),
        ]);
    });

    it("set without a semicolon", async () => {
        const tokens = await tokenize(`operation Main() : Unit {
    set x = 1
}
function Bar() : Unit {}`);
        tokens.should.deep.equal([
            createToken("operation", "keyword.other.callable.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Main", "entity.name.function.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
            createToken(" : ", "source.qsharp"),
            createToken("Unit", "storage.type.qsharp"),
            createToken(" {", "source.qsharp"),
            createToken("    ", "source.qsharp"),
            createToken("set", "keyword.other.set.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("x", "entity.name.variable.local.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("1", "constant.numeric.decimal.qsharp"),
            createToken("}", "source.qsharp"),
            createToken("function", "keyword.other.callable.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Bar", "entity.name.function.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
            createToken(" : ", "source.qsharp"),
            createToken("Unit", "storage.type.qsharp"),
        ]);
    });

    it("use without a semicolon", async () => {
        const tokens = await tokenize(`operation Main() : Unit {
    use q = Qubit()
}
function Bar() : Unit {}`);
        tokens.should.deep.equal([
            createToken("operation", "keyword.other.callable.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Main", "entity.name.function.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
            createToken(" : ", "source.qsharp"),
            createToken("Unit", "storage.type.qsharp"),
            createToken(" {", "source.qsharp"),
            createToken("    ", "source.qsharp"),
            createToken("use", "keyword.other.use.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("q", "entity.name.variable.local.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Qubit", "entity.name.function.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
            createToken("}", "source.qsharp"),
            createToken("function", "keyword.other.callable.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Bar", "entity.name.function.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
            createToken(" : ", "source.qsharp"),
            createToken("Unit", "storage.type.qsharp"),
        ]);
    });

    it("copy-and-update assignment without a semicolon", async () => {
        const tokens = await tokenize(`operation Main() : Unit {
    set ary w/= 0 <- 10
}
function Bar() : Unit {}`);
        tokens.should.deep.equal([
            createToken("operation", "keyword.other.callable.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Main", "entity.name.function.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
            createToken(" : ", "source.qsharp"),
            createToken("Unit", "storage.type.qsharp"),
            createToken(" {", "source.qsharp"),
            createToken("    ", "source.qsharp"),
            createToken("set", "keyword.other.set.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("ary", "entity.name.variable.local.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("w/=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("0", "constant.numeric.decimal.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("<-", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("10", "constant.numeric.decimal.qsharp"),
            createToken("}", "source.qsharp"),
            createToken("function", "keyword.other.callable.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Bar", "entity.name.function.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
            createToken(" : ", "source.qsharp"),
            createToken("Unit", "storage.type.qsharp"),
        ]);
    });
});
