# Noir Circuit Audit

Date: 2026-07-01

## Summary

AidShield's Noir circuit was upgraded from an additive demo hash to a Poseidon2-constrained membership proof shape.

The current circuit proves:

- The prover knows a private beneficiary leaf.
- The prover knows a private two-level membership path for the public registry root.
- The public nullifier is derived from the private leaf and a private nullifier secret.
- Path direction bits are private.

Public inputs:

```text
root
nullifier
```

Private inputs:

```text
leaf
nullifier_secret
sibling1
sibling2
is_left1
is_left2
```

## What Changed

Previous circuit shape:

- `hash(a, b) = a + b`
- `leaf` was public.
- path direction bits were public.
- no nullifier was constrained by the circuit.

Current circuit shape:

- `hash_pair(a, b) = poseidon2_permutation([a, b, 0, 0], 4)[0]`
- `leaf` is private.
- path direction bits are private.
- public `nullifier` must equal `hash_pair(leaf, nullifier_secret)`.
- public `root` must match the private membership path.

## Verification Evidence

Local checks:

```bash
scripts/build-aidshield-zk-artifacts.sh
bb verify \
  --scheme ultra_honk \
  --oracle_hash keccak \
  --public_inputs_path circuits/aidshield/target/public_inputs \
  --proof_path circuits/aidshield/target/proof \
  --vk_path circuits/aidshield/target/vk
```

Stellar testnet verifier contract:

```text
CCRP7IP4Z2L4AOX2ASL3SB67CRB4F3E3374IZBDLWQLLLJMYJZ5JUEVA
```

Successful on-chain proof verification:

```text
https://stellar.expert/explorer/testnet/tx/6994f5839af521a900a8b4d1a73d20a97573f82c1fbd7dea7a10fc8a866037ad
```

## Remaining Limitations

- The membership path is fixed at two levels for the hackathon demo.
- Input generation is deterministic demo tooling, not production registry tooling.
- The claim gate still receives `proof_valid`; verifier success should be connected directly to claim acceptance at the app/API or composed-contract layer.
- Production deployments need registry lifecycle controls, root rotation, operator authorization, and larger dynamic trees.
