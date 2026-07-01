const fs = require("fs");

function poseidon2DemoHash(a, b) {
  // Mirrors the current Noir demo witness values generated from poseidon2_permutation([a, b, 0, 0], 4)[0].
  // Keep this helper deterministic for the seeded hackathon demo; production input generation should call Noir/ACVM directly.
  const knownPairs = new Map([
    ["1:2", 18820432867059154094859436055199616701968052823097718648623846518936613856822n],
    ["18820432867059154094859436055199616701968052823097718648623846518936613856822:3", 8665481275320621392487140290464218678481289013365264609736045226452000514922n],
    ["1:9001", 13822561947922128690834381504495326861140050023338305095746077241738818048655n],
  ]);

  const key = `${a}:${b}`;
  const value = knownPairs.get(key);

  if (value === undefined) {
    throw new Error(`Missing demo Poseidon2 fixture for pair ${key}`);
  }

  return value;
}

// Read beneficiaries
const beneficiaries = JSON.parse(
  fs.readFileSync("./backend/beneficiaries.json", "utf8")
);

// Select first eligible beneficiary
const beneficiary = beneficiaries.find(b => b.eligible);

if (!beneficiary) {
  throw new Error("No eligible beneficiary found");
}

// Generate demo values from beneficiary id
const leaf = BigInt(beneficiary.id);
const nullifierSecret = 9001n;
const sibling1 = 2n;
const sibling2 = 3n;

// Circuit logic
const nullifier = poseidon2DemoHash(leaf, nullifierSecret);
const h1 = poseidon2DemoHash(leaf, sibling1);
const root = poseidon2DemoHash(h1, sibling2);

const proverToml = `
root = "${root}"
nullifier = "${nullifier}"

leaf = "${leaf}"
nullifier_secret = "${nullifierSecret}"
sibling1 = "${sibling1}"
sibling2 = "${sibling2}"

is_left1 = true
is_left2 = true
`;

fs.writeFileSync(
  "./circuits/aidshield/Prover.toml",
  proverToml.trim()
);

console.log("✅ Beneficiary selected:");
console.log(beneficiary);

console.log("✅ Prover.toml generated");
console.log({
  leaf: leaf.toString(),
  root: root.toString(),
  nullifier: nullifier.toString(),
  nullifierSecret: nullifierSecret.toString(),
  sibling1: sibling1.toString(),
  sibling2: sibling2.toString()
});
