import { should } from 'chai';
import { tokenize, createToken, Token } from './utils/tokenize';

describe("String interpolation", () => {
    before(() => { should(); });

    it("Interpolated string with an expression hole", async () => {
        const tokens = await tokenize(`Message($"x={x}");`);
        tokens.should.deep.equal([
            createToken("Message", "entity.name.function.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken("$\"", "punctuation.definition.string.begin.qsharp"),
            createToken("x=", "string.quoted.double.interpolated.qsharp"),
            createToken("{", "punctuation.section.interpolation.begin.qsharp"),
            createToken("x", "variable.other.readwrite.qsharp"),
            createToken("}", "punctuation.section.interpolation.end.qsharp"),
            createToken("\"", "punctuation.definition.string.end.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
        ]);
    });
});
