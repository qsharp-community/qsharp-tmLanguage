import Std.Diagnostics.*;
import Std.Math.PI as Pi;

/// A doc comment describing a struct.
struct Complex { Re : Double, Im : Double }

@EntryPoint()
operation Main() : Result[] {
    // literals: decimal, hex, binary, octal, BigInt, float, separators
    let ints = [42, 0xFF, 0b1010, 0o52, 1_000];
    let big = 42L;
    let approx = 1.0e-3;

    // qubit allocation (single + tuple), gates, measurement, reset
    use qs = Qubit[3];
    use (control, target) = (Qubit(), Qubit());
    for i in 0..Length(qs) - 1 {
        H(qs[i]);
    }
    Controlled X([control], target);
    Rx(Pi() / 4.0, target);

    // structs: construction, copy-and-update, field access
    let c = new Complex { Re = 1.0, Im = 0.0 };
    let c2 = new Complex { ...c, Im = 2.0 };
    let magnitudeSquared = c2.Re * c2.Re + c2.Im * c2.Im;

    // operators: comparison, bitwise, ternary, ranges
    let flags = (5 &&& 3) ||| (1 <<< 2);
    let sign = magnitudeSquared > 0.0 ? One | Zero;
    let slice = ints[1..2];

    // lambdas, partial application, string interpolation
    let addOne = x -> x + 1;
    let applyX = q => X(q);
    Message($"c2 = {c2.Re} + {c2.Im}i, sign = {sign}");

    // control flow: if / elif / else, within-apply, mutation without `set`
    mutable counter = 0;
    counter += 1;
    if counter == 1 {
        Message("one");
    } elif counter == 2 {
        Message("two");
    } else {
        Message("many");
    }

    within {
        H(qs[0]);
    } apply {
        Z(qs[0]);
    }

    ResetAll(qs);
    return MeasureEachZ(qs);
}

function Sum2<'T : Add>(a : 'T, b : 'T) : 'T {
    a + b
}

export Main, Sum2, Complex;
