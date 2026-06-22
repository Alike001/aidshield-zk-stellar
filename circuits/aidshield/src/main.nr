fn main(
    eligibility_score: u32,
    threshold: pub u32
) {
    assert(eligibility_score >= threshold);
}

#[test]
fn test_main() {
    main(10, 1);
}