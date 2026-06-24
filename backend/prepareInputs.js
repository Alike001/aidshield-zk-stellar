const fs = require("fs");

// simple deterministic values (stable for hackathon demo)
const leaf = 1;
const sibling1 = 2;
const sibling2 = 3;

// same logic as circuit
const h1 = leaf + sibling1;
const root = h1 + sibling2;

// proof direction flags
const is_left1 = true;
const is_left2 = true;

const proverToml = `
leaf = "${leaf}"
root = "${root}"

sibling1 = "${sibling1}"
sibling2 = "${sibling2}"

is_left1 = true
is_left2 = true
`;

fs.writeFileSync("../circuits/aidshield/Prover.toml", proverToml.trim());

console.log("✔ Stable ZK inputs generated");
console.log({ leaf, root, sibling1, sibling2 });
