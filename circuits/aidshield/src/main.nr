fn hash(a: Field, b: Field) -> Field {
    a + b
}

fn main(
    leaf: Field,
    root: pub Field,
    proof: [Field; 2]
) {
    let mut current = leaf;

    current = hash(current, proof[0]);
    current = hash(current, proof[1]);

    assert(current == root);
}

#[test]
fn test_main() {
    main(1, 6, [2, 3]);
}