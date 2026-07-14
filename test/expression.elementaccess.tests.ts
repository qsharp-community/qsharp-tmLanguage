import { should } from 'chai';
import { tokenize, createToken, Token } from './utils/tokenize';

// regression test for array element acccess (ensure proper tokenization of the square brackets and the index expression)
describe("Array element access", () => {
    before(() => { should(); });

    it("index by variable: total[y]", async () => {
        const tokens = await tokenize(`total[y];`);
        tokens.should.deep.equal([
            createToken("total", "variable.other.readwrite.qsharp"),
            createToken("[", "punctuation.squarebracket.open.qsharp"),
            createToken("y", "variable.other.readwrite.qsharp"),
            createToken("]", "punctuation.squarebracket.close.qsharp"),
        ]);
    });

    it("index by literal: total[0]", async () => {
        const tokens = await tokenize(`total[0];`);
        tokens.should.deep.equal([
            createToken("total", "variable.other.readwrite.qsharp"),
            createToken("[", "punctuation.squarebracket.open.qsharp"),
            createToken("0", "constant.numeric.decimal.qsharp"),
            createToken("]", "punctuation.squarebracket.close.qsharp"),
        ]);
    });
});
