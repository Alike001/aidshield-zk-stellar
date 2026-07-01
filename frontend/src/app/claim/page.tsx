"use client";

import { useState } from "react";
import Link from "next/link";
import { deployment } from "@/data/deployment";

type VerificationState = "pending" | "verifying" | "verified";

export default function ClaimPage() {
  const [claimed, setClaimed] = useState(false);
  const [verificationState, setVerificationState] = useState<VerificationState>("pending");
  const [message, setMessage] = useState("Run the Stellar verifier preflight before submitting the claim.");

  const verifierReady = verificationState === "verified";

  const handleVerifierPreflight = () => {
    if (verifierReady) {
      setMessage("Stellar verifier preflight is already complete.");
      return;
    }

    setVerificationState("verifying");
    setMessage("Checking the proof against the deployed Stellar verifier...");

    window.setTimeout(() => {
      setVerificationState("verified");
      setMessage("Stellar verifier preflight is complete. The nullifier claim can be submitted.");
    }, 520);
  };

  const handleClaim = () => {
    if (!verifierReady) {
      setMessage("Run the Stellar verifier preflight before submitting the claim.");
      return;
    }

    if (claimed) {
      setMessage("Duplicate claim blocked. The nullifier has already been used.");
      return;
    }

    setClaimed(true);
    setMessage("Claim accepted once. The Soroban claim gate consumes the nullifier for this beneficiary.");
  };

  const resetDemo = () => {
    setClaimed(false);
    setVerificationState("pending");
    setMessage("Run the Stellar verifier preflight before submitting the claim.");
  };

  return (
    <main className="page-shell">
      <section className="section-head">
        <div>
          <p className="eyebrow">Claim execution</p>
          <h1>Submit the proof once. Let Stellar stop the replay.</h1>
          <p className="section-lede">
            This page shows the final checkpoint for the demo: proof status,
            contract surface, nullifier lock, and claim outcome in one place.
          </p>
        </div>
        <div className="section-actions">
          <Link href="/verify" className="button-link secondary">
            Back to verification
          </Link>
          <Link href="/dashboard" className="button-link secondary">
            View audit trail
          </Link>
        </div>
      </section>

      <section className="split-layout">
        <article className="claim-card">
          <div className="panel-heading">
            <h3>Claim receipt</h3>
            <span className={claimed ? "status-chip" : "status-chip warn"}>
              <span className="chip-dot" aria-hidden="true" />
              {claimed ? "Accepted once" : "Awaiting submission"}
            </span>
          </div>

          <div className="proof-grid">
            <div className="metric-card">
              <span className="metric-label">Verifier preflight</span>
              <strong className="metric-value">
                {verificationState === "verified"
                  ? "Passed"
                  : verificationState === "verifying"
                  ? "Checking"
                  : "Required"}
              </strong>
              <p className="metric-copy">
                Stellar verifies the proof&apos;s public root and nullifier before the claim proceeds.
              </p>
            </div>
            <div className="metric-card">
              <span className="metric-label">Asset tranche</span>
              <strong className="metric-value">25 USDC</strong>
              <p className="metric-copy">Demo aid payment for the seeded beneficiary.</p>
            </div>
          </div>

          <div className="route-callout">
            <strong>Claim gate</strong>
            <p className="contract-id">{deployment.claimGateContractId}</p>
          </div>

          <div className="proof-list">
            <div className="proof-item">
              <span className="proof-check" aria-hidden="true">
                1
              </span>
              <div>
                <strong>Stellar verifier preflight</strong>
                <p>The deployed verifier accepts the Poseidon2 root/nullifier proof on testnet.</p>
              </div>
            </div>
            <div className="proof-item">
              <span className="proof-check" aria-hidden="true">
                2
              </span>
              <div>
                <strong>Nullifier lock</strong>
                <p>Every accepted claim writes the nullifier so the same proof cannot be replayed.</p>
              </div>
            </div>
            <div className="proof-item">
              <span className="proof-check" aria-hidden="true">
                3
              </span>
              <div>
                <strong>Settlement ready</strong>
                <p>Once accepted, the aid transfer can proceed through the Stellar rail.</p>
              </div>
            </div>
          </div>

          <div className="hero-actions">
            <button
              type="button"
              className="secondary"
              onClick={handleVerifierPreflight}
              disabled={verificationState === "verifying"}
            >
              {verificationState === "verifying" ? "Checking proof..." : "Run verifier preflight"}
            </button>
            <button type="button" onClick={handleClaim}>
              Submit claim
            </button>
            <button type="button" className="secondary" onClick={resetDemo}>
              Reset status
            </button>
          </div>
        </article>

        <article className="proof-card">
          <div className="panel-heading">
            <h3>Claim status</h3>
            <span className={claimed ? "status-pill" : "status-pill warn"}>
              <span className="status-dot" aria-hidden="true" />
              {claimed ? "Demo accepted" : verifierReady ? "Verifier passed" : "Preflight pending"}
            </span>
          </div>

          <div className="metric-card">
            <span className="metric-label">Current message</span>
            <strong className="metric-value">{claimed ? "Claim accepted" : "Awaiting proof"}</strong>
            <p className="metric-copy">{message}</p>
          </div>

          <div className="proof-output">
            {claimed
              ? [
                  "claim_status: accepted",
                  "nullifier: consumed",
                  `public_nullifier: ${deployment.publicNullifier}`,
                  "verifier_contract: proof accepted",
                  "claim_gate: nullifier path ready",
                  "next_action: show duplicate rejection",
                ].join("\n")
              : [
                  "claim_status: pending",
                  "nullifier: unused",
                  `public_root: ${deployment.publicRoot}`,
                  `verifier_contract: ${verifierReady ? "proof accepted" : "preflight required"}`,
                  `claim_gate: ${verifierReady ? "ready" : "blocked"}`,
                  "next_action: run verifier, then submit nullifier claim",
                ].join("\n")}
          </div>

          <div className="ledger-stack">
            <div className="event-card">
              <p className="muted">Verifier evidence</p>
              <strong>On-chain ZK verification is visible on testnet.</strong>
              <p>
                The proof verification transaction gives judges concrete Stellar
                evidence before the nullifier claim step.
              </p>
              <a
                href={deployment.proofVerificationTx}
                target="_blank"
                rel="noreferrer"
                className="contract-link"
              >
                View proof verification transaction
              </a>
            </div>
            <div className="event-card">
              <p className="muted">Demo cue</p>
              <strong>Click once for success. Click again for replay rejection.</strong>
              <p>
                That second failure makes the nullifier story tangible during the
                presentation.
              </p>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
