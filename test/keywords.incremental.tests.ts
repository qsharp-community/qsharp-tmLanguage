import { should } from 'chai';
import { tokenize, createToken, Token } from './utils/tokenize';

// While a declaration is being typed, its leading keyword should be colored
// immediately, before the rest of the construct (name, parens, `=`, `;`)
// exists to satisfy the more specific declaration rules.
describe("Incremental keyword highlighting", () => {
    before(() => { should(); });

    it("operation without parameter list", async () => {
        const tokens = await tokenize(`operation Foo`);
        tokens.should.deep.equal([
            createToken("operation", "keyword.other.callable.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Foo", "variable.other.readwrite.qsharp"),
        ]);
    });

    it("function without parameter list", async () => {
        const tokens = await tokenize(`function Bar`);
        tokens.should.deep.equal([
            createToken("function", "keyword.other.callable.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Bar", "variable.other.readwrite.qsharp"),
        ]);
    });

    it("let without initializer", async () => {
        const tokens = await tokenize(`let temp`);
        tokens.should.deep.equal([
            createToken("let", "keyword.other.let.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("temp", "variable.other.readwrite.qsharp"),
        ]);
    });

    it("mutable without initializer", async () => {
        const tokens = await tokenize(`mutable temp`);
        tokens.should.deep.equal([
            createToken("mutable", "keyword.other.mutable.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("temp", "variable.other.readwrite.qsharp"),
        ]);
    });

    it("set without initializer", async () => {
        const tokens = await tokenize(`set temp`);
        tokens.should.deep.equal([
            createToken("set", "keyword.other.set.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("temp", "variable.other.readwrite.qsharp"),
        ]);
    });

    it("use without initializer", async () => {
        const tokens = await tokenize(`use q`);
        tokens.should.deep.equal([
            createToken("use", "keyword.other.use.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("q", "variable.other.readwrite.qsharp"),
        ]);
    });

    it("borrow without initializer", async () => {
        const tokens = await tokenize(`borrow q`);
        tokens.should.deep.equal([
            createToken("borrow", "keyword.other.borrow.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("q", "variable.other.readwrite.qsharp"),
        ]);
    });
});
