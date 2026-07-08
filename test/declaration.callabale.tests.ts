import { should } from 'chai';
import { tokenize, createToken, Token } from './utils/tokenize';

describe("Callable declarations", () => {
    before(() => { should(); });

    it("Typed parameter signature", async () => {
        const tokens = await tokenize(`function Subarray<'T>(indices : Int[], array : 'T[]) : 'T[]`);
        tokens.should.deep.equal([
            createToken("function", "keyword.other.callable.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Subarray", "entity.name.function.qsharp"),
            createToken("<", "punctuation.definition.typeparameters.begin.qsharp"),
            createToken("'T", "entity.name.type.type-parameter.qsharp"),
            createToken(">", "punctuation.definition.typeparameters.end.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken("indices", "entity.name.variable.parameter.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken(":", "punctuation.separator.colon.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Int", "storage.type.qsharp"),
            createToken("[", "punctuation.squarebracket.open.qsharp"),
            createToken("]", "punctuation.squarebracket.close.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("array", "entity.name.variable.parameter.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken(":", "punctuation.separator.colon.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("'T", "entity.name.type.type-parameter.qsharp"),
            createToken("[", "punctuation.squarebracket.open.qsharp"),
            createToken("]", "punctuation.squarebracket.close.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
            createToken(" : ", "source.qsharp"),
            createToken("'T", "entity.name.type.type-parameter.qsharp"),
            createToken("[", "punctuation.squarebracket.open.qsharp"),
            createToken("]", "punctuation.squarebracket.close.qsharp"),
        ]);
    });

    it("Two typed parameters signature", async () => {
        const tokens = await tokenize(`operation Delay<'T, 'U>(op : ('T => 'U), arg : 'T, aux : Unit) : 'U`);
        tokens.should.deep.equal([
            createToken("operation", "keyword.other.callable.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Delay", "entity.name.function.qsharp"),
            createToken("<", "punctuation.definition.typeparameters.begin.qsharp"),
            createToken("'T", "entity.name.type.type-parameter.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("'U", "entity.name.type.type-parameter.qsharp"),
            createToken(">", "punctuation.definition.typeparameters.end.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken("op", "entity.name.variable.parameter.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken(":", "punctuation.separator.colon.qsharp"),
            createToken(" (", "source.qsharp"),
            createToken("'T", "entity.name.type.type-parameter.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=>", "keyword.operator.lambda.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("'U", "entity.name.type.type-parameter.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
            createToken(", ", "source.qsharp"),
            createToken("arg", "variable.other.readwrite.qsharp"),
            createToken(" : ", "source.qsharp"),
            createToken("'T", "entity.name.type.type-parameter.qsharp"),
            createToken(", ", "source.qsharp"),
            createToken("aux", "variable.other.readwrite.qsharp"),
            createToken(" : ", "source.qsharp"),
            createToken("Unit", "storage.type.qsharp"),
            createToken(") : ", "source.qsharp"),
            createToken("'U", "entity.name.type.type-parameter.qsharp"),
        ]);
    });

    it("Type parameter with class constraint", async () => {
        const tokens = await tokenize(`function AllEqual<'T : Eq>(arg : 'T) : Bool`);
        tokens.should.deep.equal([
            createToken("function", "keyword.other.callable.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("AllEqual", "entity.name.function.qsharp"),
            createToken("<", "punctuation.definition.typeparameters.begin.qsharp"),
            createToken("'T", "entity.name.type.type-parameter.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken(":", "punctuation.separator.colon.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Eq", "support.type.constraint.qsharp"),
            createToken(">", "punctuation.definition.typeparameters.end.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken("arg", "entity.name.variable.parameter.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken(":", "punctuation.separator.colon.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("'T", "entity.name.type.type-parameter.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
            createToken(" : ", "source.qsharp"),
            createToken("Bool", "storage.type.qsharp"),
        ]);
    });
});
