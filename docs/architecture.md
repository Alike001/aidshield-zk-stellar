Overview

AidShield is a privacy-preserving aid distribution system built on Stellar using zero-knowledge proofs. It ensures beneficiaries can prove eligibility without revealing identity and prevents double claiming using nullifiers.

Components

1. Off-chain (Node.js + Noir)

Generates Merkle tree of eligible beneficiaries
Produces zero-knowledge proofs of eligibility
Generates nullifier to prevent double claims

2. Smart Contract (Soroban - Stellar)

Stores Merkle root
Tracks used nullifiers
Verifies proof validity (MVP: boolean verified input)
Releases aid upon successful verification
User Flow
NGO uploads beneficiary list
Merkle root is generated and stored on-chain
Beneficiary generates ZK proof locally
Proof is submitted to smart contract
Contract verifies proof and nullifier
Aid is released securely and privately
Key Innovation
Identity remains private
Fraud prevention via nullifiers
On-chain verification on Stellar
Real-world application: humanitarian aid, scholarships, subsidies