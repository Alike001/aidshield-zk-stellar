const { MerkleTree } = require("merkletreejs");
const crypto = require("crypto");

function hash(data) {
  return crypto.createHash("sha256").update(data).digest();
}

// Example whitelist (beneficiaries)
const users = ["user1", "user2", "user3"];

const leaves = users.map(x => hash(x));

const tree = new MerkleTree(leaves, hash, { sortPairs: true });

const leaf = hash("user1");
const proof = tree.getProof(leaf).map(x => x.data);
const root = tree.getRoot();

console.log("LEAF:", "0x" + leaf.toString("hex"));
console.log("ROOT:", "0x" + root.toString("hex"));

console.log("PROOF:");
proof.forEach((p, i) => {
  console.log(i, "0x" + p.toString("hex"));
});
