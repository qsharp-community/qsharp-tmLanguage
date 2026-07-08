import { should } from 'chai';
import { tokenize, createToken, Token } from './utils/tokenize';

describe("Numeric literals", () => {
    before(() => { should(); });

    async function value(src: string): Promise<Token> {
        const tokens = await tokenize(`let x = ${src};`);
        return tokens[tokens.length - 1];
    }

    it("Hexadecimal", async () => {
        (await value("0xFF")).should.deep.equal(createToken("0xFF", "constant.numeric.hexadecimal.qsharp"));
    });

    it("Binary", async () => {
        (await value("0b1010")).should.deep.equal(createToken("0b1010", "constant.numeric.binary.qsharp"));
    });

    it("Octal", async () => {
        (await value("0o52")).should.deep.equal(createToken("0o52", "constant.numeric.octal.qsharp"));
    });

    it("BigInt", async () => {
        (await value("42L")).should.deep.equal(createToken("42L", "constant.numeric.decimal.qsharp"));
    });

    it("Float with exponent", async () => {
        (await value("1.0e-3")).should.deep.equal(createToken("1.0e-3", "constant.numeric.decimal.qsharp"));
    });

    it("Digit separators", async () => {
        (await value("1_000")).should.deep.equal(createToken("1_000", "constant.numeric.decimal.qsharp"));
    });

    it("Range is not swallowed by the numeric literal", async () => {
        const tokens = await tokenize(`let r = 2..2..6;`);
        tokens.should.deep.equal([
            createToken("let", "keyword.other.let.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("r", "entity.name.variable.local.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("2", "constant.numeric.decimal.qsharp"),
            createToken("..", "keyword.operator.range.qsharp"),
            createToken("2", "constant.numeric.decimal.qsharp"),
            createToken("..", "keyword.operator.range.qsharp"),
            createToken("6", "constant.numeric.decimal.qsharp"),
        ]);
    });
});
