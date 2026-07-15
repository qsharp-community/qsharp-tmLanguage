import { should } from 'chai';
import { tokenize, createToken, Token } from './utils/tokenize';

describe("Array Assignment", () => {
    before(() => { should(); });

    it("set arr w/= 0 <- 1;", async () => {
        const tokens = await tokenize("set arr w/= 0 <- 1;");
        tokens.should.deep.equal([
            createToken("set", "keyword.other.set.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("arr", "entity.name.variable.local.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("w/=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("0", "constant.numeric.decimal.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("<-", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("1", "constant.numeric.decimal.qsharp"),
        ]);
    });

    it("set arr = arr w/ 0 <- 1;", async () => {
        const tokens = await tokenize("set arr = arr w/ 0 <- 1;");
        tokens.should.deep.equal([
            createToken("set", "keyword.other.set.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("arr", "entity.name.variable.local.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("arr", "entity.name.variable.local.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("w/", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("0", "constant.numeric.decimal.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("<-", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("1", "constant.numeric.decimal.qsharp"),
        ]);
    });

    it("set ary w/= x <- 10; (variable index)", async () => {
        const tokens = await tokenize("set ary w/= x <- 10;");
        tokens.should.deep.equal([
            createToken("set", "keyword.other.set.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("ary", "entity.name.variable.local.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("w/=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("x", "variable.other.readwrite.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("<-", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("10", "constant.numeric.decimal.qsharp"),
        ]);
    });
});