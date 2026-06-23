const { MerkleTree } = require("merkletreejs");
const crypto = require("crypto");

function hash(data) {
  return crypto.createHash("sha256").update(data).digest();
}

// Example beneficiaries
const users = ["user1", "user2", "user3"];

const leaves = users.map(x => hash(x));

const tree = new MerkleTree(leaves, hash, { sortPairs: true });

const leaf = hash("user1");
const proof = tree.getProof(leaf).map(x => x.data);
const root = tree.getRoot().toString("hex");

console.log("Root:", root);
console.log("Proof:", proof);

const proofHex = proof.map(p => "0x" + p.toString("hex"));

console.log("Proof HEX:", proofHex);

const leaf = hash("user1");
console.log("Leaf:", "0x" + leaf.toString("hex"));