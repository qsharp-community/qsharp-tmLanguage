import { should } from 'chai';
import { tokenize, createToken, Token } from './utils/tokenize';

describe("Code blocks", () => {
    before(() => { should(); });

    it("Simple parameterless operation", async () => {
        const code = `operation AllocateAndMeasure() : Result {
use qubit = Qubit();
Message("Performing measurement");
return M(qubit);
}
        `;
        const tokens = await tokenize(code);
        tokens.should.deep.equal([
            createToken("operation", "keyword.other.callable.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("AllocateAndMeasure", "entity.name.function.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
            createToken(" : ", "source.qsharp"),
            createToken("Result", "storage.type.qsharp"),
            createToken(" {", "source.qsharp"),
            createToken("use", "keyword.other.use.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("qubit", "entity.name.variable.local.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Qubit", "entity.name.function.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
            createToken(";", "source.qsharp"),
            createToken("Message", "entity.name.function.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken("\"", "string.quoted.double.qsharp"),
            createToken("Performing measurement", "string.quoted.double.qsharp"),
            createToken("\"", "string.quoted.double.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
            createToken(";", "source.qsharp"),
            createToken("return", "keyword.control.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("M", "support.function.quantum.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken("qubit", "variable.other.readwrite.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
            createToken(";", "source.qsharp"),
            createToken("}", "source.qsharp"),
        ]);
    });
});