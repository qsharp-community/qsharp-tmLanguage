import { should } from 'chai';
import { tokenize, createToken, Token } from './utils/tokenize';

describe("Struct declarations", () => {
    before(() => { should(); });

    it("Simple struct", async () => {
        const tokens = await tokenize(`struct Point3d { X : Double, Y : Double, Z : Double }`);
        tokens.should.deep.equal([
            createToken("struct", "keyword.other.struct.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Point3d", "entity.name.type.struct.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("{", "punctuation.curlybrace.open.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("X", "variable.other.property.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken(":", "punctuation.separator.colon.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Double", "storage.type.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Y", "variable.other.property.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken(":", "punctuation.separator.colon.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Double", "storage.type.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Z", "variable.other.property.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken(":", "punctuation.separator.colon.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Double", "storage.type.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("}", "punctuation.curlybrace.close.qsharp"),
        ]);
    });

    it("Internal struct", async () => {
        const tokens = await tokenize(`internal struct Complex { Re : Double, Im : Double }`);
        tokens.should.deep.equal([
            createToken("internal", "keyword.other.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("struct", "keyword.other.struct.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Complex", "entity.name.type.struct.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("{", "punctuation.curlybrace.open.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Re", "variable.other.property.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken(":", "punctuation.separator.colon.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Double", "storage.type.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Im", "variable.other.property.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken(":", "punctuation.separator.colon.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Double", "storage.type.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("}", "punctuation.curlybrace.close.qsharp"),
        ]);
    });
});
