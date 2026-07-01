# AidShield Architecture

AidShield is a privacy-preserving aid distribution system built on Stellar using zero-knowledge proofs. Beneficiaries prove eligibility without exposing raw identity records, while aid operators get an auditable claim trail and duplicate-claim protection through nullifiers.

## Components

### 1. Off-chain proof preparation

- Builds the eligible beneficiary set.
- Generates Noir witness inputs.
- Produces UltraHonk proof artifacts.
- Derives a nullifier for replay prevention.

Relevant paths:

```text
backend/
circuits/aidshield/
scripts/build-aidshield-zk-artifacts.sh
```

### 2. Stellar verifier contract

- Stores the AidShield verification key at deployment.
- Verifies `public_inputs` and `proof` on Stellar testnet.
- Gives judges concrete on-chain evidence that ZK is doing real work.

Relevant path:

```text
contracts/aidshield_verifier/
```

Current verifier contract:

```text
CDUWF4UER3TFEAH2ZDLVEW4EKDLUNPEL5EMIBS5R4DPPIFGVUMF4MDCC
```

Successful proof verification transaction:

```text
https://stellar.expert/explorer/testnet/tx/17d58cd111b7a995cf13b1d3fbedfcf27d9ef84d24f870a1bd432a44ce4bf385
```

### 3. Stellar claim gate contract

- Tracks used nullifiers.
- Rejects duplicate claims.
- Returns typed errors for invalid proof and duplicate claim paths.

Relevant path:

```text
contracts/aidshield_contract/
```

Current limitation: the claim gate still receives `proof_valid` as an input. The verifier contract proves the ZK path on-chain, but the next production hardening step is to make claim acceptance depend directly on verifier success through the app/API or a composed contract flow.

### 4. Demo frontend

- Shows the registry, verification desk, claim flow, and operator dashboard.
- Surfaces the deployed verifier contract and proof verification transaction.
- Makes the claim page require a verifier preflight before the demo claim can be accepted.

Relevant path:

```text
frontend/
```

## User Flow

1. An NGO prepares an eligible beneficiary set.
2. A beneficiary generates a private Noir witness and proof.
3. The proof is verified by the AidShield verifier contract on Stellar.
4. The claim page treats verifier success as the preflight gate.
5. The claim gate consumes the nullifier once.
6. A repeated claim is rejected because the nullifier is already used.

## Why This Architecture

- **Zero-knowledge:** eligibility can be proven without exposing the beneficiary record.
- **Stellar:** proof and claim evidence can be audited on a low-cost public settlement network.
- **Nullifiers:** operators can prevent duplicate aid claims without knowing private identity data.
- **Two-contract split:** the verifier contract can use the current Stellar SDK and ZK verifier stack while the claim gate stays focused on claim-state enforcement.
