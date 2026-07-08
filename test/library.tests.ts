import { should } from 'chai';
import { tokenize, createToken, Token } from './utils/tokenize';

describe("Library", () => {
    before(() => { should(); });

    // Bare intrinsic names are scoped as quantum operations.
    const gates = [
        "I", "X", "Y", "Z", "H", "S", "T", "SX",
        "CNOT", "CX", "CY", "CZ", "CCNOT", "SWAP",
        "Rx", "Ry", "Rz", "Rxx", "Ryy", "Rzz", "R", "R1", "RFrac", "R1Frac", "Exp", "ExpFrac",
        "M", "Measure", "MResetZ", "MResetX", "MResetY", "MResetEachZ",
        "MeasureEachZ", "MeasureAllZ", "Reset", "ResetAll",
    ];

    for (const gate of gates) {
        it(gate, async () => {
            const tokens = await tokenize(gate);
            tokens.should.deep.equal([
                createToken(gate, "support.function.quantum.qsharp"),
            ]);
        });
    }

    it("Intrinsic call keeps gate scope and tokenizes arguments", async () => {
        const tokens = await tokenize("Rx(0.5, qubit)");
        tokens.should.deep.equal([
            createToken("Rx", "support.function.quantum.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken("0.5", "constant.numeric.decimal.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("qubit", "variable.other.readwrite.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
        ]);
    });

    it("Reset call", async () => {
        const tokens = await tokenize("Reset(q)");
        tokens.should.deep.equal([
            createToken("Reset", "support.function.quantum.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken("q", "variable.other.readwrite.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
        ]);
    });
});
