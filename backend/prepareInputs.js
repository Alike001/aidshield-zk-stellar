const fs = require("fs");

const leaf = 1;
const sibling1 = 2;
const sibling2 = 3;

const root = leaf + sibling1 + sibling2;

const proverToml = `
leaf = "${leaf}"
root = "${root}"

sibling1 = "${sibling1}"
sibling2 = "${sibling2}"
`;

fs.writeFileSync("../circuits/aidshield/Prover.toml", proverToml.trim());

console.log("✔ synced inputs");
console.log({ leaf, root, sibling1, sibling2 });
