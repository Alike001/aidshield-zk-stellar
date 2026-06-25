# AidShield

Privacy-preserving aid distribution system using Zero-Knowledge Proofs and the Stellar blockchain.

## Problem

Aid distribution programs often require beneficiaries to reveal sensitive personal information before receiving support. This creates privacy concerns and increases the risk of fraud, duplicate claims, and data exposure.

## Solution

AidShield allows beneficiaries to prove they are eligible for aid without revealing sensitive information.

Using Zero-Knowledge Proofs (ZKPs), beneficiaries can verify eligibility while maintaining privacy. Smart contracts on Stellar ensure transparent and tamper-resistant claim processing.

## Features

* Zero-Knowledge eligibility verification
* Privacy-preserving beneficiary validation
* Stellar smart contract integration
* Duplicate claim prevention
* Beneficiary registry dashboard
* Claim history tracking
* Web-based user interface

## Architecture

Frontend:

* Next.js
* React
* Tailwind CSS

Backend:

* Node.js

Zero-Knowledge Layer:

* Noir

Blockchain Layer:

* Soroban Smart Contracts
* Stellar Testnet

## How It Works

1. Beneficiaries are registered by an aid organization.
2. Eligibility information is represented in a Merkle structure.
3. A beneficiary generates a proof of eligibility.
4. The Noir circuit verifies the proof.
5. The Stellar smart contract validates the claim.
6. Previously used claims are rejected to prevent double spending.

## Stellar Deployment

Contract ID:

CDB7NHCG27T3SB7KTGUALZHIAAVQ4NAVGMPBWBJ55FQWJTQLQRMQORKD

Network:

Stellar Testnet

## Project Structure

aidshield-zk-stellar/

* frontend/
* backend/
* circuits/
* contracts/
* docs/

## Future Improvements

* Real wallet authentication
* Production-ready ZK proof generation
* Multi-organization support
* On-chain beneficiary management
* Mobile application support

## Hackathon Submission

AidShield demonstrates how Zero-Knowledge Proofs and Stellar smart contracts can be combined to create secure, transparent, and privacy-preserving aid distribution systems.
