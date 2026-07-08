import { should } from 'chai';
import { tokenize, createToken, Token } from './utils/tokenize';

describe("Quantum: Allocation", () => {
    before(() => { should(); });

    it("Use single qubit", async () => {
        const tokens = await tokenize(`use a = Qubit();`);
        tokens.should.deep.equal([
            createToken("use", "keyword.other.use.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("a", "entity.name.variable.local.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Qubit", "entity.name.function.qsharp"), // todo: should this be storage.type.qsharp or is this OK?
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
        ]);
    });

    it("Borrow single qubit", async () => {
        const tokens = await tokenize(`borrow a = Qubit();`);
        tokens.should.deep.equal([
            createToken("borrow", "keyword.other.borrow.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("a", "entity.name.variable.local.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Qubit", "entity.name.function.qsharp"), // todo: should this be storage.type.qsharp or is this OK?
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
        ]);
    });

    it("Use qubit array", async () => {
        const tokens = await tokenize(`use a = Qubit[2];`);
        tokens.should.deep.equal([
            createToken("use", "keyword.other.use.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("a", "entity.name.variable.local.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Qubit", "storage.type.qsharp"), 
            createToken("[", "punctuation.squarebracket.open.qsharp"),
            createToken("2", "constant.numeric.decimal.qsharp"),
            createToken("]", "punctuation.squarebracket.close.qsharp"),
        ]);
    });

    it("Borrow qubit array", async () => {
        const tokens = await tokenize(`borrow a = Qubit[2];`);
        tokens.should.deep.equal([
            createToken("borrow", "keyword.other.borrow.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("a", "entity.name.variable.local.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Qubit", "storage.type.qsharp"),
            createToken("[", "punctuation.squarebracket.open.qsharp"),
            createToken("2", "constant.numeric.decimal.qsharp"),
            createToken("]", "punctuation.squarebracket.close.qsharp"),
        ]);
    });

    it("Use with tuple allocation", async () => {
        const tokens = await tokenize(`use (q1, q2) = (Qubit(), Qubit());`);
        tokens.should.deep.equal([
            createToken("use", "keyword.other.use.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken("q1", "variable.other.readwrite.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("q2", "variable.other.readwrite.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken("Qubit", "entity.name.function.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Qubit", "entity.name.function.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
        ]);
    });
});