#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CIRCUIT_DIR="${ROOT_DIR}/circuits/aidshield"

export PATH="${HOME}/.bb/bin:${HOME}/.nargo/bin:${PATH}"

required_nargo="1.0.0-beta.9"
required_bb="0.87.0"

if ! command -v nargo >/dev/null 2>&1; then
  echo "nargo is required. Install Noir ${required_nargo} with: noirup -v ${required_nargo}" >&2
  exit 1
fi

if ! command -v bb >/dev/null 2>&1; then
  echo "bb is required. Install Barretenberg ${required_bb} with: bbup -v ${required_bb}" >&2
  exit 1
fi

nargo_version="$(nargo --version | head -n 1 | awk '{print $4}')"
bb_version="$(bb --version | tr -d '[:space:]')"

if [[ "${nargo_version}" != "${required_nargo}" ]]; then
  echo "Expected nargo ${required_nargo}, got ${nargo_version}." >&2
  echo "Run: noirup -v ${required_nargo}" >&2
  exit 1
fi

if [[ "${bb_version}" != "${required_bb}" ]]; then
  echo "Expected bb ${required_bb}, got ${bb_version}." >&2
  echo "Run: bbup -v ${required_bb}" >&2
  exit 1
fi

cd "${CIRCUIT_DIR}"

nargo compile
nargo execute

bb prove \
  --scheme ultra_honk \
  --oracle_hash keccak \
  --bytecode_path target/aidshield.json \
  --witness_path target/aidshield.gz \
  --output_path target \
  --output_format bytes_and_fields

bb write_vk \
  --scheme ultra_honk \
  --oracle_hash keccak \
  --bytecode_path target/aidshield.json \
  --output_path target \
  --output_format bytes_and_fields

echo "AidShield ZK artifacts generated:"
echo "  ${CIRCUIT_DIR}/target/proof"
echo "  ${CIRCUIT_DIR}/target/public_inputs"
echo "  ${CIRCUIT_DIR}/target/vk"
