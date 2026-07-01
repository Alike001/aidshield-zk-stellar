# AidShield

AidShield is a privacy-preserving humanitarian aid distribution prototype for **Stellar Hacks: Real-World ZK**. It lets a beneficiary prove aid eligibility with a zero-knowledge proof path, then routes the claim through a Stellar Soroban contract that blocks duplicate claims with nullifiers.

## What It Solves

Aid programs often need to verify who is eligible before funds move, but exposing identity records creates privacy and safety risks. AidShield separates the two concerns:

- Beneficiaries prove they are in the eligible set without revealing the underlying private record.
- Operators get a clear audit trail for each claim decision.
- Stellar keeps the claim gate transparent and prevents replay through nullifier tracking.

## Demo Flow

1. An aid organization prepares an eligible beneficiary set.
2. The Noir circuit verifies a private witness against the expected root.
3. The frontend shows the proof envelope and nullifier that will protect the claim.
4. The Soroban contract accepts a valid claim once.
5. A repeated claim is rejected because the nullifier has already been used.
6. The dashboard shows registry, claim, and deployment context for judges/operators.

## ZK + Stellar Integration

The hackathon asks for meaningful ZK on Stellar: the proof should be load-bearing and Stellar should be part of the working system, ideally by verifying proofs inside a Soroban contract. AidShield currently includes the core pieces of that architecture:

- `circuits/aidshield/src/main.nr` contains the Noir circuit for the eligibility proof path.
- `contracts/aidshield_contract/src/lib.rs` contains the Soroban claim gate and nullifier store.
- `contracts/aidshield_verifier/src/lib.rs` contains the Soroban UltraHonk verifier wrapper for AidShield proof artifacts.
- `frontend/` presents the proof, claim, and dashboard workflow for the demo.

The current claim-gate MVP still accepts a `proof_valid` boolean so the deployed claim logic can focus on nullifier enforcement and claim replay prevention. AidShield now also includes a separate deployed verifier contract that verifies the Noir UltraHonk proof artifacts on Stellar testnet. The top submission-critical hardening step is connecting verifier success to the claim gate in the frontend/API flow.

## What Is Real Today

| Area | Status |
| --- | --- |
| Open-source repo | Present |
| Frontend demo | Next.js app with landing, verification, claim, and dashboard routes |
| ZK circuit | Noir eligibility circuit exists, currently with simplified demo hashing |
| Stellar contract | Soroban contract deployed on Stellar Testnet and stores used nullifiers |
| Duplicate prevention | Implemented in the contract and covered by tests |
| On-chain proof verification | Implemented as a separate Soroban verifier contract on Stellar Testnet |
| Aid transfer | Not yet implemented; claim acceptance prepares the settlement step |

## Stellar Deployment

Network: Stellar Testnet

Contract ID:

```text
CDB7NHCG27T3SB7KTGUALZHIAAVQ4NAVGMPBWBJ55FQWJTQLQRMQORKD
```

Contract explorer:

```text
https://lab.stellar.org/r/testnet/contract/CDB7NHCG27T3SB7KTGUALZHIAAVQ4NAVGMPBWBJ55FQWJTQLQRMQORKD
```

Note: the local contract source now returns typed claim errors for duplicate and invalid-proof paths. If you redeploy this updated contract before submission, replace the contract ID and explorer link above.

Verifier contract ID:

```text
CDUWF4UER3TFEAH2ZDLVEW4EKDLUNPEL5EMIBS5R4DPPIFGVUMF4MDCC
```

Verifier contract explorer:

```text
https://lab.stellar.org/r/testnet/contract/CDUWF4UER3TFEAH2ZDLVEW4EKDLUNPEL5EMIBS5R4DPPIFGVUMF4MDCC
```

Verifier deployment transactions:

```text
https://stellar.expert/explorer/testnet/tx/0b9d26ccffb8dce7dd6e18374e1098a642ce65b51c69bb09f6cdd56d4326a647
https://stellar.expert/explorer/testnet/tx/ad45d40b7ec57910ca745634daef6a91d535e4f2ab5e247a7176df4e127955bd
```

Successful `verify_proof` transaction:

```text
https://stellar.expert/explorer/testnet/tx/17d58cd111b7a995cf13b1d3fbedfcf27d9ef84d24f870a1bd432a44ce4bf385
```

## Project Structure

```text
aidshield-zk-stellar/
  backend/                 Proof and Merkle helper scripts
  circuits/aidshield/      Noir circuit and prover input
  contracts/               Soroban smart contract
  docs/                    Architecture notes
  frontend/                Next.js demo app
```

## Running The Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

Production checks:

```bash
cd frontend
npm run lint
npx tsc --noEmit
npm run build
```

## Testing The Contract

```bash
cd contracts/aidshield_contract
cargo test
```

The contract tests cover:

- accepting one valid claim
- rejecting a duplicate nullifier
- rejecting an invalid proof flag

## Generating ZK Artifacts

AidShield can generate UltraHonk proof artifacts for the Noir circuit using the verifier-compatible toolchain:

```bash
noirup -v 1.0.0-beta.9
# ensure bb 0.87.0 is available on PATH, for example in ~/.bb/bin
scripts/build-aidshield-zk-artifacts.sh
```

Generated artifacts:

```text
circuits/aidshield/target/proof
circuits/aidshield/target/public_inputs
circuits/aidshield/target/vk
```

See `docs/zk-verifier-integration.md` for the Soroban verifier integration plan.

## Building The Verifier Contract

AidShield includes a Soroban verifier wrapper at `contracts/aidshield_verifier`. It stores the AidShield verification key at deployment and exposes `verify_proof(public_inputs, proof)`.

```bash
stellar contract build \
  --manifest-path contracts/aidshield_verifier/Cargo.toml \
  --out-dir contracts/aidshield_verifier/target/stellar
```

Current local verifier build:

```text
WASM: contracts/aidshield_verifier/target/stellar/aidshield_verifier.wasm
Hash: 8fd5bd398e98611f4868a82515e3da170c40cd91995f9eb158eabca197dccc5d
```

Deploy and verify:

```bash
scripts/deploy-aidshield-verifier.sh
scripts/verify-aidshield-proof.sh <VERIFIER_CONTRACT_ID>
```

## Demo Script

1. Start on the home page and explain the problem: aid eligibility needs proof without identity exposure.
2. Open `/verify`, select an eligible beneficiary, and generate the proof envelope.
3. Open `/claim`, run the Stellar verifier preflight, submit the claim once, then submit again to demonstrate replay blocking.
4. Open `/dashboard` and show the registry, claim history, and Stellar contract ID.
5. Point out the implementation boundary: Noir proof verification is live in a verifier contract, the claim gate blocks nullifier replays, and the next milestone is connecting verifier success directly to claim acceptance.

## Why Stellar

Aid programs often distribute stable-value assistance across borders and institutions. Stellar is a strong fit because it is already oriented around low-cost real-world payments, stablecoins, and transparent settlement. In AidShield, Stellar should become the shared settlement and audit layer: NGOs can publish claim rules, beneficiaries can claim once, and auditors can verify that nullifiers were consumed without exposing private beneficiary records.

## Why Zero-Knowledge

Aid eligibility is sensitive. A beneficiary should not have to reveal raw identity documents, household attributes, or risk status just to prove they qualify. ZK lets the system prove a private registry fact while exposing only the minimum public data needed for fraud prevention: the Merkle root, proof result, and nullifier.

## Current Limitations

- The frontend uses seeded demo data rather than a live beneficiary database.
- The current Noir circuit uses simplified demo hashing and should be upgraded before treating the proof system as production-like.
- The claim-gate MVP receives `proof_valid`; verifier proof checking is currently a separate Soroban contract invocation.
- The proof helper scripts are local Node.js scripts and are not yet exposed through an API.
- Wallet authentication and real aid token transfer are future work.

## Submission Roadmap

Critical before final submission:

- Connect deployed verifier success to claim-gate submission at the app/API or composed-contract level.
- Upgrade the Noir circuit away from placeholder hashing or clearly label it as a demo constraint system.
- Add a short 2-3 minute video showing the verification, claim, duplicate rejection, and contract evidence.
- Add screenshots of the landing page, verification flow, claim flow, and dashboard.

High value:

- Add a simple architecture diagram.
- Add loading, error, and duplicate-claim states to the frontend.
- Add wallet/testnet account setup instructions.

## Stack

- Frontend: Next.js, React, Tailwind CSS
- ZK: Noir
- Contract: Stellar Soroban, Rust
- Helpers: Node.js, Merkle tree utilities

## License

MIT
