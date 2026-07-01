# AidShield ZK Verifier Integration

AidShield now has a reproducible local path for generating UltraHonk artifacts that can be consumed by the Stellar Noir verifier contract.

## Toolchain

The current Stellar UltraHonk verifier reference expects:

- Noir `1.0.0-beta.9`
- Barretenberg `0.87.0`
- `rs-soroban-ultrahonk`
- Stellar CLI with Soroban contract support

AidShield's circuit also compiles under Noir `1.0.0-beta.9`.

## Generate AidShield Artifacts

```bash
scripts/build-aidshield-zk-artifacts.sh
```

This produces:

```text
circuits/aidshield/target/proof
circuits/aidshield/target/public_inputs
circuits/aidshield/target/vk
```

The verifier contract expects:

- `vk` at deployment time
- `public_inputs` when invoking `verify_proof`
- `proof` when invoking `verify_proof`

## Verified Build Results

Local feasibility checks completed:

- `rs-soroban-ultrahonk` sample circuit produced proof artifacts with Noir `1.0.0-beta.9` and `bb 0.87.0`.
- AidShield produced UltraHonk proof artifacts with the same toolchain.
- `rs-soroban-ultrahonk` verifier contract built successfully to WASM.
- AidShield now includes a repo-owned verifier wrapper at `contracts/aidshield_verifier`.
- `contracts/aidshield_verifier` builds successfully to WASM.

AidShield verifier build output:

```text
aidshield_verifier.wasm
Wasm hash: 8fd5bd398e98611f4868a82515e3da170c40cd91995f9eb158eabca197dccc5d
Exported functions: __constructor, verify_proof, vk_bytes
```

## Testnet Deployment

AidShield verifier contract:

```text
CCRP7IP4Z2L4AOX2ASL3SB67CRB4F3E3374IZBDLWQLLLJMYJZ5JUEVA
```

Explorer:

```text
https://lab.stellar.org/r/testnet/contract/CCRP7IP4Z2L4AOX2ASL3SB67CRB4F3E3374IZBDLWQLLLJMYJZ5JUEVA
```

Deployment transactions:

```text
https://stellar.expert/explorer/testnet/tx/0b9d26ccffb8dce7dd6e18374e1098a642ce65b51c69bb09f6cdd56d4326a647
https://stellar.expert/explorer/testnet/tx/f5bebe17bded8cccc54e29a0bd35d6b9348cbbc01f7ca6bba9e89a5d949fe00f
```

Successful `verify_proof` invocation:

```text
https://stellar.expert/explorer/testnet/tx/6994f5839af521a900a8b4d1a73d20a97573f82c1fbd7dea7a10fc8a866037ad
```

## Recommended Contract Architecture

Use two contracts for the hackathon submission:

1. `AidShieldVerifier`
   - Based on `rs-soroban-ultrahonk`
   - Stores AidShield's `vk` at deployment
   - Verifies `public_inputs` and `proof`

2. `AidShieldClaimGate`
   - Stores consumed nullifiers
   - Rejects duplicate claims
   - Accepts claims only after verifier success

This avoids forcing the existing SDK-20 claim contract to directly absorb an SDK-26 verifier crate. It also makes the demo easier for judges to inspect: one contract proves ZK verification, one contract proves aid claim enforcement.

## Deployment Commands

Build and deploy the repo-owned verifier contract with:

```bash
stellar contract build \
  --manifest-path contracts/aidshield_verifier/Cargo.toml \
  --out-dir contracts/aidshield_verifier/target/stellar

scripts/deploy-aidshield-verifier.sh
```

The deployment constructor stores:

```text
circuits/aidshield/target/vk
```

After deployment, invoke proof verification:

```bash
scripts/verify-aidshield-proof.sh <VERIFIER_CONTRACT_ID>
```

using:

```text
circuits/aidshield/target/public_inputs
circuits/aidshield/target/proof
```

The next product integration step is to connect this verifier success path to claim submission, so the user journey verifies the proof and then records the nullifier-gated aid claim.

## Current Limitation

The current AidShield circuit uses Poseidon2 constraints for a fixed two-level demo membership path and public nullifier. The verifier integration proves that Stellar can verify AidShield's Noir proof on-chain. The next cryptographic hardening step is to generalize the circuit and input tooling for larger dynamic registries.
