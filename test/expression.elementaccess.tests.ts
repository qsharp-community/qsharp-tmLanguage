import { should } from 'chai';
import { tokenize, createToken, Token } from './utils/tokenize';

// Array element access already emits distinct scopes for the array name
// (variable.other.readwrite) and the surrounding brackets
// (punctuation.squarebracket.*). Whether those render in different colors is a
// theme concern; the grammar's job is only to scope them distinctly, which
// these tests lock in.
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
