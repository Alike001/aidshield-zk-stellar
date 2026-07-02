# AidShield

Privacy-preserving humanitarian aid claims on Stellar, powered by Noir zero-knowledge proofs and Soroban nullifier enforcement.

AidShield is built for **Stellar Hacks: Real-World ZK**. It helps NGOs, governments, foundations, and relief agencies verify that a beneficiary is eligible for aid without exposing the beneficiary's private registry record. A public nullifier then lets the Stellar contract block duplicate claims.

## Hackathon Summary

Aid distribution systems have a hard tradeoff: operators need to prevent fraud, but beneficiaries should not have to reveal sensitive identity data, household details, or risk status every time they receive support.

AidShield separates those concerns:

- **Private eligibility:** a Noir circuit proves the beneficiary is part of an approved aid registry.
- **Public replay protection:** a nullifier is revealed so the same eligibility record cannot claim twice.
- **Stellar audit trail:** Soroban contracts provide public verifier and claim evidence on Stellar testnet.
- **Operator workflow:** a Next.js demo shows verification, claim submission, duplicate-claim prevention, and claim history.

## Why This Needs Stellar

Humanitarian aid often crosses borders, organizations, and currencies. Stellar is a strong fit because it is designed for low-cost, real-world payment and settlement flows, including stable-value assistance.

AidShield uses Stellar as the shared trust layer:

- Verifier evidence can be checked publicly on Stellar testnet.
- Claim nullifiers are consumed by a Soroban contract so replay attempts are visible and blocked.
- The architecture can evolve into stablecoin disbursement once eligibility and claim authorization are proven.
- NGOs and auditors do not need to trust a private database as the only source of truth.

## Why This Needs Zero-Knowledge

Eligibility data can be dangerous when exposed. In real aid programs, a beneficiary record may imply location, displacement status, household size, medical risk, political vulnerability, or financial hardship.

AidShield uses ZK so the public system only sees what it needs:

| Public | Private |
| --- | --- |
| Registry root | Beneficiary leaf |
| Claim nullifier | Merkle path |
| Verifier result | Path direction bits |
| Contract and transaction evidence | Nullifier secret |

The proof is load-bearing: it is the reason the system can verify eligibility without publishing the underlying beneficiary record.

## What Works Today

| Area | Status |
| --- | --- |
| Open-source repo | Present |
| Frontend demo | Landing, verification, claim, and dashboard routes |
| Noir circuit | Poseidon2-based private membership path with public nullifier |
| ZK artifacts | UltraHonk proof, public inputs, and verification key generation |
| Stellar verifier | Deployed Soroban verifier contract on Stellar testnet |
| Stellar claim gate | Deployed Soroban contract that stores used nullifiers |
| Duplicate prevention | Implemented and tested in the claim contract |
| Claim history | Demo dashboard shows claim and deployment context |
| Real aid transfer | Not yet implemented; next step after claim authorization |

## Live Stellar Evidence

Network: **Stellar testnet**

Claim gate contract:

```text
CDB7NHCG27T3SB7KTGUALZHIAAVQ4NAVGMPBWBJ55FQWJTQLQRMQORKD
```

Claim gate explorer:

```text
https://lab.stellar.org/r/testnet/contract/CDB7NHCG27T3SB7KTGUALZHIAAVQ4NAVGMPBWBJ55FQWJTQLQRMQORKD
```

Verifier contract:

```text
CCRP7IP4Z2L4AOX2ASL3SB67CRB4F3E3374IZBDLWQLLLJMYJZ5JUEVA
```

Verifier explorer:

```text
https://lab.stellar.org/r/testnet/contract/CCRP7IP4Z2L4AOX2ASL3SB67CRB4F3E3374IZBDLWQLLLJMYJZ5JUEVA
```

Verifier deployment transactions:

```text
https://stellar.expert/explorer/testnet/tx/0b9d26ccffb8dce7dd6e18374e1098a642ce65b51c69bb09f6cdd56d4326a647
https://stellar.expert/explorer/testnet/tx/f5bebe17bded8cccc54e29a0bd35d6b9348cbbc01f7ca6bba9e89a5d949fe00f
```

Successful `verify_proof` transaction:

```text
https://stellar.expert/explorer/testnet/tx/6994f5839af521a900a8b4d1a73d20a97573f82c1fbd7dea7a10fc8a866037ad
```

Public proof inputs shown in the demo:

```text
root:      0x13287d14736b83bbd54da85e40b028f6128eb92d2b0fdb63c33f7893d811236a
nullifier: 0x1e8f4af5f474c2fbf6e4fc60190759071045a057a595c3d614098fae0bdd528f
```

## Demo Walkthrough

1. Open the landing page and frame the problem: aid eligibility should be verified without exposing beneficiary records.
2. Open `/verify`, select an eligible beneficiary, and generate the proof envelope.
3. Show the public/private boundary: only the root, nullifier, and verifier evidence become public.
4. Open `/claim`, run the Stellar verifier preflight, and submit the claim.
5. Submit again to show duplicate-claim prevention through the consumed nullifier.
6. Open `/dashboard` to show registry health, claim history, and contract evidence.

Recommended video length: 2-3 minutes.

## Architecture

```text
NGO registry
    |
    v
Private witness + Merkle path
    |
    v
Noir circuit -> UltraHonk proof
    |
    v
Soroban verifier contract on Stellar
    |
    v
Claim gate consumes public nullifier once
    |
    v
Dashboard / audit trail
```

Key paths:

```text
backend/                         Merkle and proof helper scripts
circuits/aidshield/              Noir circuit and prover input
contracts/aidshield_verifier/    Soroban UltraHonk verifier wrapper
contracts/aidshield_contract/    Soroban claim gate and nullifier store
frontend/                        Next.js demo app
docs/                            Architecture and audit notes
```

## Project Structure

```text
aidshield-zk-stellar/
  backend/
  circuits/
  contracts/
    aidshield_contract/
    aidshield_verifier/
  docs/
  frontend/
  scripts/
```

## Run The Frontend

```bash
cd frontend
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

Production checks:

```bash
cd frontend
npm run lint
npx tsc --noEmit
npm run build
```

Note: the frontend uses `next dev --webpack` because this project hit a Turbopack filesystem/HMR issue during local development.

## Test The Claim Contract

```bash
cd contracts/aidshield_contract
cargo test
```

The tests cover:

- Accepting one valid claim.
- Rejecting a duplicate nullifier.
- Rejecting an invalid proof flag.

## Generate ZK Artifacts

AidShield generates UltraHonk proof artifacts for the Noir circuit using a verifier-compatible toolchain.

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

Circuit audit:

```text
docs/noir-circuit-audit.md
```

Verifier integration notes:

```text
docs/zk-verifier-integration.md
```

## Build The Verifier Contract

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

## Current Limitations

This is a hackathon prototype, so the unfinished parts are explicit:

- The frontend uses seeded demo data rather than a live NGO beneficiary database.
- The Noir circuit uses a small fixed-depth demo tree; production should support larger registry depths and registry rotation.
- The verifier contract proves the ZK path on Stellar, while the claim gate still receives `proof_valid` as an input. The next hardening step is composing verifier success directly into claim acceptance.
- The proof helper scripts are local scripts, not a hosted proof service.
- Wallet authentication and stablecoin disbursement are future work.

## Roadmap

Critical before final submission:

- Record and attach the 2-3 minute demo video.
- Add screenshots of the landing, verification, claim, and dashboard flows.
- Make the final README/demo explicitly show the successful verifier transaction.

High value:

- Connect verifier success directly to claim-gate submission in a composed app/API flow.
- Add wallet/testnet account setup instructions.
- Expand the Noir circuit to support configurable registry depth.

Post-hackathon:

- Add NGO registry administration.
- Add stablecoin disbursement after successful claim authorization.
- Add role-based operator access and audit exports.
- Add beneficiary recovery and privacy-preserving appeal flows.

## Stack

- Frontend: Next.js, React, Tailwind CSS
- ZK: Noir, UltraHonk
- Contracts: Stellar Soroban, Rust
- Helpers: Node.js Merkle/proof utilities

## License

MIT
