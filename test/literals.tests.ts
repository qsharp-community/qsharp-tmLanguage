import { should } from 'chai';
import { tokenize, createToken, Token } from './utils/tokenize';

describe("Literals", () => {
    before(() => { should(); });

    it("Boolean true", async () => {
        const tokens = await tokenize("return true;");
        tokens.should.deep.equal([
            createToken("return", "keyword.control.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("true", "constant.language.boolean.true.qsharp")
        ]);
    });

    it("Boolean false", async () => {
        const tokens = await tokenize("return false;");
        tokens.should.deep.equal([
            createToken("return", "keyword.control.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("false", "constant.language.boolean.false.qsharp")
        ]);
    });

    it("Result Zero", async () => {
        const tokens = await tokenize("return input == Zero;");
        tokens.should.deep.equal([
            createToken("return", "keyword.control.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("input", "variable.other.readwrite.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("==", "keyword.operator.comparison.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Zero", "constant.language.result.zero.qsharp"),
        ]);
    });

    it("Result One", async () => {
        const tokens = await tokenize("return input == One;");
        tokens.should.deep.equal([
            createToken("return", "keyword.control.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("input", "variable.other.readwrite.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("==", "keyword.operator.comparison.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("One", "constant.language.result.one.qsharp"),
        ]);
    });

    it("String", async () => {
        const tokens = await tokenize(`return "foo";`);
        tokens.should.deep.equal([
            createToken("return", "keyword.control.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("\"", "string.quoted.double.qsharp"),
            createToken("foo", "string.quoted.double.qsharp"),
            createToken("\"", "string.quoted.double.qsharp"),
        ]);
    });

    it("Paulis in an array", async () => {
        const tokens = await tokenize("return [PauliX, PauliY, PauliZ];");
        tokens.should.deep.equal([
            createToken("return", "keyword.control.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("[", "punctuation.squarebracket.open.qsharp"),
            createToken("PauliX", "constant.language.pauli.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("PauliY", "constant.language.pauli.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("PauliZ", "constant.language.pauli.qsharp"),
            createToken("]", "punctuation.squarebracket.close.qsharp"),
        ]);
    });
});