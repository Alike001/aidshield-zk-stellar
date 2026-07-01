#!/usr/bin/env bash
set -euo pipefail

if [[ "$#" -ne 1 ]]; then
  echo "usage: $0 <VERIFIER_CONTRACT_ID>" >&2
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PUBLIC_INPUTS_PATH="${ROOT_DIR}/circuits/aidshield/target/public_inputs"
PROOF_PATH="${ROOT_DIR}/circuits/aidshield/target/proof"

CONTRACT_ID="$1"
NETWORK="${STELLAR_NETWORK:-testnet}"
SOURCE_ACCOUNT="${STELLAR_ACCOUNT:-${STELLAR_SOURCE_ACCOUNT:-aidshield}}"

if [[ ! -f "${PUBLIC_INPUTS_PATH}" || ! -f "${PROOF_PATH}" ]]; then
  echo "Missing proof artifacts." >&2
  echo "Run: scripts/build-aidshield-zk-artifacts.sh" >&2
  exit 1
fi

stellar contract invoke \
  --id "${CONTRACT_ID}" \
  --source-account "${SOURCE_ACCOUNT}" \
  --network "${NETWORK}" \
  --send yes \
  -- \
  verify_proof \
  --public_inputs-file-path "${PUBLIC_INPUTS_PATH}" \
  --proof_bytes-file-path "${PROOF_PATH}"
