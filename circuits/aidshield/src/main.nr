fn hash(a: Field, b: Field) -> Field {
    a + b
}

fn main(
    leaf: pub Field,
    root: pub Field,
    sibling1: Field,
    sibling2: Field,
    is_left1: pub bool,
    is_left2: pub bool
) {
    let h1 = if is_left1 {
        hash(leaf, sibling1)
    } else {
        hash(sibling1, leaf)
    };

    let h2 = if is_left2 {
        hash(h1, sibling2)
    } else {
        hash(sibling2, h1)
    };

    assert(h2 == root);
}
