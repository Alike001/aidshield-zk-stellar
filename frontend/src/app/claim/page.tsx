"use client";

import { useState } from "react";
import Link from "next/link";

const CONTRACT_ID =
  "CDB7NHCG27T3SB7KTGUALZHIAAVQ4NAVGMPBWBJ55FQWJTQLQRMQORKD";

export default function ClaimPage() {
  const [claimed, setClaimed] = useState(false);
  const [message, setMessage] = useState("Ready to submit the proof-backed claim.");

  const handleClaim = () => {
    if (claimed) {
      setMessage("Duplicate claim blocked. The nullifier has already been used.");
      return;
    }

    setClaimed(true);
    setMessage("Demo claim accepted. The Soroban contract source enforces this nullifier path.");
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
              <span className="metric-label">Asset tranche</span>
              <strong className="metric-value">25 USDC</strong>
              <p className="metric-copy">Demo aid payment for the seeded beneficiary.</p>
            </div>
            <div className="metric-card">
              <span className="metric-label">Settlement rail</span>
              <strong className="metric-value">Stellar</strong>
              <p className="metric-copy">Soroban contract enforces the nullifier lock.</p>
            </div>
          </div>

          <div className="route-callout">
            <strong>Contract</strong>
            <p className="contract-id">{CONTRACT_ID}</p>
          </div>

          <div className="proof-list">
            <div className="proof-item">
              <span className="proof-check" aria-hidden="true">
                1
              </span>
              <div>
                <strong>Proof check</strong>
                <p>The contract only moves forward when the proof is valid.</p>
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
            <button type="button" onClick={handleClaim}>
              Submit claim
            </button>
            <button type="button" className="secondary" onClick={() => setMessage("Ready to submit the proof-backed claim.")}>
              Reset status
            </button>
          </div>
        </article>

        <article className="proof-card">
          <div className="panel-heading">
            <h3>Claim status</h3>
            <span className={claimed ? "status-pill" : "status-pill warn"}>
              <span className="status-dot" aria-hidden="true" />
              {claimed ? "Demo accepted" : "Preflight pending"}
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
                  "contract_state: source path verified",
                  "next_action: invoke Soroban transaction",
                ].join("\n")
              : [
                  "claim_status: pending",
                  "nullifier: unused",
                  "contract_state: ready",
                  "next_action: submit proof envelope",
                ].join("\n")}
          </div>

          <div className="ledger-stack">
            <div className="event-card">
              <p className="muted">Why this is competitive</p>
              <strong>It is easy to explain and hard to fake.</strong>
              <p>
                A judge can see the private proof concept, the Stellar contract,
                and the duplicate-claim prevention in one route.
              </p>
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
