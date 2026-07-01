use std::hash::poseidon2_permutation;

fn hash_pair(a: Field, b: Field) -> Field {
    let state = poseidon2_permutation([a, b, 0, 0], 4);
    state[0]
}

fn main(
    root: pub Field,
    nullifier: pub Field,
    leaf: Field,
    nullifier_secret: Field,
    sibling1: Field,
    sibling2: Field,
    is_left1: bool,
    is_left2: bool,
) {
    let computed_nullifier = hash_pair(leaf, nullifier_secret);
    assert(computed_nullifier == nullifier);

    let h1 = if is_left1 {
        hash_pair(leaf, sibling1)
    } else {
        hash_pair(sibling1, leaf)
    };

    let h2 = if is_left2 {
        hash_pair(h1, sibling2)
    } else {
        hash_pair(sibling2, h1)
    };

    assert(h2 == root);
}
