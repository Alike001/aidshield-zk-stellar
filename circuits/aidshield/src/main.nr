fn main(
    beneficiary_id: Field,
    secret: Field,
    expected_beneficiary_id: pub Field,
    nullifier: pub Field
) {

    assert(beneficiary_id == expected_beneficiary_id);

    let computed_nullifier = secret * secret;

    assert(computed_nullifier == nullifier);
}

#[test]
fn test_main() {
    main(
        1,
        1234,
        1,
        1522756
    );
}