import { should } from 'chai';
import { tokenize, Token } from './utils/tokenize';
import * as fs from 'fs';
import * as path from 'path';

should();

// A single program that exercises the modern (QDK 1.x) Q# surface area.
const program = `import Std.Diagnostics.*;
import Std.Math.PI as Pi;

struct Complex { Re : Double, Im : Double }

@EntryPoint()
operation Main() : Result[] {
    use qs = Qubit[3];
    for i in 0..Length(qs) - 1 {
        H(qs[i]);
    }
    let c = new Complex { Re = 1.0, Im = 0.0 };
    let c2 = new Complex { ...c, Im = 2.0 };
    let flag = c2.Im > 0.0 ? One | Zero;
    Message($"Value: {c2.Re} flag={flag}");
    within {
        H(qs[0]);
    } apply {
        Z(qs[0]);
    }
    return MeasureEachZ(qs);
}

function Square<'T : Mul>(x : 'T) : 'T { x * x }
export Main, Square;`;

describe("Corpus smoke test", () => {
    let tokens: Token[];

    before(async () => {
        tokens = await tokenize(program);
    });

    it("produces no invalid / illegal scopes", () => {
        const bad = tokens.filter(t => /invalid|illegal/.test(t.type));
        bad.should.deep.equal([]);
    });

    const expectations: [string, string][] = [
        ["import", "keyword.other.import.qsharp"],
        ["Complex", "entity.name.type.struct.qsharp"],
        ["EntryPoint", "entity.name.function.attribute.qsharp"],
        ["operation", "keyword.other.callable.qsharp"],
        ["use", "keyword.other.use.qsharp"],
        ["Qubit", "storage.type.qsharp"],
        ["H", "support.function.quantum.qsharp"],
        ["..", "keyword.operator.range.qsharp"],
        ["new", "keyword.other.new.qsharp"],
        ["...", "keyword.operator.spread.qsharp"],
        ["?", "keyword.operator.ternary.qsharp"],
        ["|", "keyword.operator.ternary.qsharp"],
        ["'T", "entity.name.type.type-parameter.qsharp"],
        ["Mul", "support.type.constraint.qsharp"],
        ["export", "keyword.other.import.qsharp"],
    ];

    for (const [text, scope] of expectations) {
        it(`scopes ${JSON.stringify(text)} as ${scope}`, () => {
            const found = tokens.some(t => t.text === text && t.type === scope);
            found.should.equal(true, `expected a "${text}" token scoped as ${scope}`);
        });
    }
});

// Opt-in: point QDK_SAMPLES at a checkout of microsoft/qdk `samples/` to
// validate the grammar against the full sample corpus. Skipped when unset.
const samplesDir = process.env.QDK_SAMPLES;
(samplesDir && fs.existsSync(samplesDir) ? describe : describe.skip)("QDK sample corpus", () => {
    function collect(dir: string): string[] {
        const out: string[] = [];
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
            const full = path.join(dir, entry.name);
            if (entry.isDirectory()) out.push(...collect(full));
            else if (entry.name.endsWith(".qs")) out.push(full);
        }
        return out;
    }

    const files = samplesDir ? collect(samplesDir) : [];

    for (const file of files) {
        it(`tokenizes ${path.relative(samplesDir!, file)} without invalid scopes`, async () => {
            const source = fs.readFileSync(file, "utf8");
            const tokens = await tokenize(source, false);
            const bad = tokens.filter(t => /invalid|illegal/.test(t.type));
            bad.should.deep.equal([], `invalid scopes in ${file}`);
        });
    }
});
