#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WASM_PATH="${ROOT_DIR}/contracts/aidshield_verifier/target/stellar/aidshield_verifier.wasm"
VK_PATH="${ROOT_DIR}/circuits/aidshield/target/vk"

NETWORK="${STELLAR_NETWORK:-testnet}"
SOURCE_ACCOUNT="${STELLAR_ACCOUNT:-${STELLAR_SOURCE_ACCOUNT:-aidshield}}"

if [[ ! -f "${WASM_PATH}" ]]; then
  echo "Missing verifier WASM: ${WASM_PATH}" >&2
  echo "Run: stellar contract build --manifest-path contracts/aidshield_verifier/Cargo.toml --out-dir contracts/aidshield_verifier/target/stellar" >&2
  exit 1
fi

if [[ ! -f "${VK_PATH}" ]]; then
  echo "Missing AidShield verification key: ${VK_PATH}" >&2
  echo "Run: scripts/build-aidshield-zk-artifacts.sh" >&2
  exit 1
fi

stellar contract deploy \
  --wasm "${WASM_PATH}" \
  --source-account "${SOURCE_ACCOUNT}" \
  --network "${NETWORK}" \
  -- \
  --vk_bytes-file-path "${VK_PATH}"
