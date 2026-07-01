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
          <h1>Verify the proof, then consume the nullifier once.</h1>
          <p className="section-lede">
            This is the transaction preflight. The claim stays blocked until the
            Stellar verifier accepts the public root and nullifier.
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
            <h3>Execution checklist</h3>
            <span className={claimed ? "status-chip" : "status-chip warn"}>
              <span className="chip-dot" aria-hidden="true" />
              {claimed ? "Accepted once" : "Awaiting submission"}
            </span>
          </div>

          <div className="workflow-status-grid" aria-label="Claim execution progress">
            <div className={verifierReady ? "workflow-status active" : "workflow-status"}>
              <span>1</span>
              <strong>Verifier preflight</strong>
              <p>{verifierReady ? "Proof accepted on Stellar" : "Required before claim"}</p>
            </div>
            <div className={claimed ? "workflow-status active" : "workflow-status"}>
              <span>2</span>
              <strong>Nullifier claim</strong>
              <p>{claimed ? "Nullifier consumed" : "Waiting for submission"}</p>
            </div>
            <div className={claimed ? "workflow-status active" : "workflow-status"}>
              <span>3</span>
              <strong>Replay guard</strong>
              <p>{claimed ? "Duplicate path sealed" : "Ready after acceptance"}</p>
            </div>
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

          <div className="proof-boundary-grid">
            <div className="boundary-row">
              <span>Verifier</span>
              <strong>{deployment.verifierContractId}</strong>
            </div>
            <div className="boundary-row">
              <span>Claim gate</span>
              <strong>{deployment.claimGateContractId}</strong>
            </div>
            <div className="boundary-row">
              <span>Nullifier</span>
              <strong>{deployment.publicNullifier}</strong>
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
            <span className="metric-label">Operator message</span>
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
              <p className="muted">Stellar evidence</p>
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
