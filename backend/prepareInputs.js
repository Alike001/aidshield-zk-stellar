const fs = require("fs");

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
const leaf = beneficiary.id;
const sibling1 = 2;
const sibling2 = 3;

// Circuit logic
const h1 = leaf + sibling1;
const root = h1 + sibling2;

const proverToml = `
leaf = "${leaf}"
root = "${root}"

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
  leaf,
  root,
  sibling1,
  sibling2
});
