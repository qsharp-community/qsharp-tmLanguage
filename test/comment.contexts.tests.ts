import { should } from 'chai';
import { tokenize, createToken, Token } from './utils/tokenize';

// comments should be recognized in (almost) every context, not just where a
// statement is expected
describe("Comments in nested contexts", () => {
    before(() => { should(); });

    it("Comment inside a parameter list", async () => {
        const tokens = await tokenize(`function Foo(
    // the input
    x : Int) : Unit {}`);
        tokens.should.deep.equal([
            createToken("function", "keyword.other.callable.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Foo", "entity.name.function.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken("    ", "punctuation.whitespace.comment.leading.qsharp"),
            createToken("//", "punctuation.definition.comment.qsharp"),
            createToken(" the input", "comment.line.double-slash.qsharp"),
            createToken("    ", "source.qsharp"),
            createToken("x", "entity.name.variable.parameter.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken(":", "punctuation.separator.colon.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Int", "storage.type.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
            createToken(" : ", "source.qsharp"),
            createToken("Unit", "storage.type.qsharp"),
        ]);
    });

    it("Comment between a parameter name and its type", async () => {
        const tokens = await tokenize(`function Foo(x : // c
    Int) : Unit {}`);
        tokens.should.deep.equal([
            createToken("function", "keyword.other.callable.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Foo", "entity.name.function.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken("x", "entity.name.variable.parameter.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken(":", "punctuation.separator.colon.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("//", "punctuation.definition.comment.qsharp"),
            createToken(" c", "comment.line.double-slash.qsharp"),
            createToken("    ", "source.qsharp"),
            createToken("Int", "storage.type.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
            createToken(" : ", "source.qsharp"),
            createToken("Unit", "storage.type.qsharp"),
        ]);
    });

    it("Comment inside a newtype tuple", async () => {
        const tokens = await tokenize(`newtype Pair = (
    // first
    Int, Int);`);
        tokens.should.deep.equal([
            createToken("newtype", "keyword.other.udt.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Pair", "entity.name.type.udt.qsharp"),
            createToken(" = ", "source.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken("    ", "punctuation.whitespace.comment.leading.qsharp"),
            createToken("//", "punctuation.definition.comment.qsharp"),
            createToken(" first", "comment.line.double-slash.qsharp"),
            createToken("    ", "source.qsharp"),
            createToken("Int", "storage.type.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Int", "storage.type.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
        ]);
    });

    it("Comment inside a newtype alias", async () => {
        const tokens = await tokenize(`newtype Alias = // c
    Int;`);
        tokens.should.deep.equal([
            createToken("newtype", "keyword.other.udt.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Alias", "entity.name.type.udt.qsharp"),
            createToken(" = ", "source.qsharp"),
            createToken("//", "punctuation.definition.comment.qsharp"),
            createToken(" c", "comment.line.double-slash.qsharp"),
            createToken("    ", "source.qsharp"),
            createToken("Int", "storage.type.qsharp"),
            createToken(";", "source.qsharp"),
        ]);
    });

    it("Comment between a struct field name and its type", async () => {
        const tokens = await tokenize(`struct S { Field : // c
    Int }`);
        tokens.should.deep.equal([
            createToken("struct", "keyword.other.struct.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("S", "entity.name.type.struct.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("{", "punctuation.curlybrace.open.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Field", "variable.other.property.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken(":", "punctuation.separator.colon.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("//", "punctuation.definition.comment.qsharp"),
            createToken(" c", "comment.line.double-slash.qsharp"),
            createToken("    ", "source.qsharp"),
            createToken("Int", "storage.type.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("}", "punctuation.curlybrace.close.qsharp"),
        ]);
    });

    it("Comment inside an import directive", async () => {
        const tokens = await tokenize(`import Foo // c`);
        tokens.should.deep.equal([
            createToken("import", "keyword.other.import.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Foo", "entity.name.namespace.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("//", "punctuation.definition.comment.qsharp"),
            createToken(" c", "comment.line.double-slash.qsharp"),
        ]);
    });

    it("Comment after an import alias keyword", async () => {
        const tokens = await tokenize(`import Std.Math as // c`);
        tokens.should.deep.equal([
            createToken("import", "keyword.other.import.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Std", "entity.name.namespace.qsharp"),
            createToken(".", "punctuation.accessor.qsharp"),
            createToken("Math", "entity.name.namespace.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("as", "keyword.other.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("//", "punctuation.definition.comment.qsharp"),
            createToken(" c", "comment.line.double-slash.qsharp"),
        ]);
    });

    it("Comment inside an open directive", async () => {
        const tokens = await tokenize(`namespace A {
    open // c
}`);
        tokens.should.deep.equal([
            createToken("namespace", "keyword.other.namespace.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("A", "entity.name.type.namespace.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("{", "punctuation.curlybrace.open.qsharp"),
            createToken("    ", "source.qsharp"),
            createToken("open", "keyword.other.open.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("//", "punctuation.definition.comment.qsharp"),
            createToken(" c", "comment.line.double-slash.qsharp"),
        ]);
    });

    it("Comment inside a tuple binding pattern", async () => {
        const tokens = await tokenize(`let (a, // c
    b) = pair;`);
        tokens.should.deep.equal([
            createToken("let", "keyword.other.let.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken("a", "entity.name.variable.local.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("//", "punctuation.definition.comment.qsharp"),
            createToken(" c", "comment.line.double-slash.qsharp"),
            createToken("    ", "source.qsharp"),
            createToken("b", "entity.name.variable.local.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("pair", "variable.other.readwrite.qsharp"),
        ]);
    });
});
