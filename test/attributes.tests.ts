import { should } from 'chai';
import { tokenize, createToken, Token } from './utils/tokenize';

describe("Attributes", () => {
    before(() => { should(); });

    it("EntryPoint attribute", async () => {
        const tokens = await tokenize(`@EntryPoint()`);
        tokens.should.deep.equal([
            createToken("@", "punctuation.definition.attribute.qsharp"),
            createToken("EntryPoint", "entity.name.function.attribute.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
        ]);
    });

    it("Config attribute with argument", async () => {
        const tokens = await tokenize(`@Config(Adaptive_RI)`);
        tokens.should.deep.equal([
            createToken("@", "punctuation.definition.attribute.qsharp"),
            createToken("Config", "entity.name.function.attribute.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken("Adaptive_RI", "variable.other.readwrite.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
        ]);
    });
});
