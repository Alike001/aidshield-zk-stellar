"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { beneficiaries } from "@/data/beneficiaries";
import { deployment } from "@/data/deployment";

export default function VerifyPage() {
  const [selectedId, setSelectedId] = useState(1);
  const [generated, setGenerated] = useState(false);
  const [status, setStatus] = useState<string>("Select a beneficiary to begin.");

  const selected = useMemo(
    () => beneficiaries.find((person) => person.id === selectedId) ?? beneficiaries[0],
    [selectedId]
  );

  const proofEnvelope = useMemo(() => {
    if (!generated || !selected) return null;

    return {
      beneficiary: selected.name,
      region: selected.location,
      root: deployment.publicRoot,
      nullifier: deployment.publicNullifier,
      witness: selected.eligible
        ? "private leaf + siblings + direction bits constrained"
        : "eligibility witness failed",
      contract: "Soroban claim gate",
      verifier: deployment.verifierContractId,
    };
  }, [generated, selected]);

  const verifyUser = () => {
    if (!selected) return;

    setGenerated(true);

    if (selected.eligible) {
      setStatus("Proof accepted. The deployed verifier path is ready for the claim.");
    } else {
      setStatus("Proof rejected. The registry does not prove eligibility.");
    }
  };

  const resetState = () => {
    setGenerated(false);
    setStatus("Select a beneficiary to begin.");
  };

  return (
    <main className="page-shell">
      <section className="section-head">
        <div>
          <p className="eyebrow">Verification desk</p>
          <h1>Generate the proof before the claim reaches Stellar.</h1>
          <p className="section-lede">
            This screen is the private side of the system. The beneficiary
            chooses a registry record, the proof envelope is assembled locally,
            and only then does the app allow the claim path to continue.
          </p>
        </div>
        <div className="section-actions">
          <Link href="/claim" className="button-link secondary">
            Jump to claim flow
          </Link>
        </div>
      </section>

      <section className="split-layout">
        <article className="surface-panel">
          <div className="panel-heading">
            <h3>Beneficiary registry</h3>
            <span className="status-pill">
              <span className="status-dot" aria-hidden="true" />
              {beneficiaries.length} records seeded
            </span>
          </div>

          <div className="list-grid">
            {beneficiaries.map((person) => {
              const active = person.id === selectedId;
              const initials = person.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              return (
                <button
                  key={person.id}
                  type="button"
                  className={active ? "beneficiary-card active" : "beneficiary-card"}
                  onClick={() => {
                    setSelectedId(person.id);
                    setGenerated(false);
                    setStatus(`Selected ${person.name}. Ready to generate proof.`);
                  }}
                >
                  <div className="beneficiary-card-top">
                    <div className="beneficiary-avatar">{initials}</div>
                    <div className="beneficiary-copy">
                      <strong>{person.name}</strong>
                      <span>{person.location}</span>
                      <span>{person.household}</span>
                    </div>
                    <span className={person.eligible ? "status-chip" : "status-chip danger"}>
                      <span className="chip-dot" aria-hidden="true" />
                      {person.eligible ? "Eligible" : "Not eligible"}
                    </span>
                  </div>

                  <div className="stat-row">
                    <span className="mini-chip">{person.proofState}</span>
                    <span className="mini-chip">{person.tranche}</span>
                    <span className="mini-chip">Last claim {person.lastClaim}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </article>

        <article className="proof-card">
          <div className="panel-heading">
            <h3>Proof envelope</h3>
            <span className="info-chip">Noir witness path</span>
          </div>

          <p className="panel-note">
            The proof summary below is intentionally human-readable for the demo.
            The important part is the boundary: root and nullifier are public,
            while the beneficiary leaf and membership path stay private.
          </p>

          <div className="proof-grid" aria-label="Verification summary">
            <div className="metric-card">
              <span className="metric-label">Selected beneficiary</span>
              <strong className="metric-value">{selected?.name}</strong>
              <p className="metric-copy">{selected?.location}</p>
            </div>
            <div className="metric-card">
              <span className="metric-label">Current verdict</span>
              <strong className="metric-value">
                {generated ? (selected?.eligible ? "Accepted" : "Rejected") : "Pending"}
              </strong>
              <p className="metric-copy">{status}</p>
            </div>
          </div>

          <div className="proof-grid" aria-label="Public proof inputs">
            <div className="metric-card">
              <span className="metric-label">Public root</span>
              <strong className="metric-value mono-value">{deployment.publicRoot.slice(0, 14)}...</strong>
              <p className="metric-copy">Registry commitment verified by the Noir circuit.</p>
            </div>
            <div className="metric-card">
              <span className="metric-label">Public nullifier</span>
              <strong className="metric-value mono-value">{deployment.publicNullifier.slice(0, 14)}...</strong>
              <p className="metric-copy">Replay-safe claim marker derived from private inputs.</p>
            </div>
          </div>

          <div className="proof-list">
            <div className="proof-item">
              <span className="proof-check" aria-hidden="true">
                1
              </span>
              <div>
                <strong>Registry lookup</strong>
                <p>The beneficiary record is matched against the seeded eligibility set.</p>
              </div>
            </div>
            <div className="proof-item">
              <span className="proof-check" aria-hidden="true">
                2
              </span>
              <div>
                <strong>Private witness generation</strong>
                <p>
                  The private leaf, path siblings, direction bits, and nullifier
                  secret stay inside the Noir witness.
                </p>
              </div>
            </div>
            <div className="proof-item">
              <span className="proof-check" aria-hidden="true">
                3
              </span>
              <div>
                <strong>Nullifier and contract gate</strong>
                <p>
                  Poseidon2 constraints produce the public root and nullifier that
                  Stellar verifies.
                </p>
              </div>
            </div>
          </div>

          <div className="proof-output">
            {proofEnvelope ? (
              <>
                beneficiary: {proofEnvelope.beneficiary}
                {"\n"}
                region: {proofEnvelope.region}
                {"\n"}
                public_root: {proofEnvelope.root}
                {"\n"}
                public_nullifier: {proofEnvelope.nullifier}
                {"\n"}
                witness: {proofEnvelope.witness}
                {"\n"}
                verifier: {proofEnvelope.verifier}
                {"\n"}
                contract: {proofEnvelope.contract}
              </>
            ) : (
              "Generate a proof to reveal the envelope."
            )}
          </div>

          <div className="hero-actions">
            <button type="button" onClick={verifyUser}>
              Generate proof
            </button>
            <button type="button" className="secondary" onClick={resetState}>
              Reset
            </button>
          </div>

          <div className="route-callout">
            <strong>{generated ? "Next step" : "What happens next"}</strong>
            <p>
              {generated && selected?.eligible
                ? "Send the proof envelope to the claim page. Stellar has verified the public root/nullifier pair, and the claim gate should consume the nullifier once."
                : generated
                ? "This record should not move forward. The user should be shown a clear rejection path."
                : "When the proof is generated, the claim route becomes available for eligible beneficiaries."}
            </p>
            {generated && selected?.eligible ? (
              <div className="section-actions inline-actions">
                <Link
                  href="/claim"
                  className="button-link"
                >
                  Continue to claim
                </Link>
                <a
                  href={deployment.proofVerificationTx}
                  target="_blank"
                  rel="noreferrer"
                  className="contract-link"
                >
                  View testnet proof verification
                </a>
              </div>
            ) : null}
          </div>
        </article>
      </section>
    </main>
  );
}
