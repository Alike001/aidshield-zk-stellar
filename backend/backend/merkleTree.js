const { MerkleTree } = require("merkletreejs");
const crypto = require("crypto-js");

// Hash function
function hash(data) {
    return crypto.SHA256(data).toString();
}

// Sample beneficiaries
const beneficiaries = [
    "user1|12345",
    "user2|54321",
    "user3|99999"
];

// Create leaf nodes
const leaves = beneficiaries.map(x => hash(x));

// Build tree
const tree = new MerkleTree(leaves, hash, { sortPairs: true });

// Root
const root = tree.getRoot().toString("hex");

console.log("Merkle Root:", root);

// Generate proof for first user
const leaf = hash(beneficiaries[0]);
const proof = tree.getProof(leaf);

console.log("Proof for user1:");
console.log(proof);