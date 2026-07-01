"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { beneficiaries } from "@/data/beneficiaries";

function makeNullifier(name: string, id: number) {
  const seed = `${name}-${id}-aidshield`;
  let hash = 0;

  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) >>> 0;
  }

  return `0x${hash.toString(16).padStart(8, "0")}${(hash ^ 0xa5a5a5a5)
    .toString(16)
    .padStart(8, "0")}`;
}

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
      nullifier: makeNullifier(selected.name, selected.id),
      commitment: `commitment-${selected.id.toString().padStart(4, "0")}`,
      witness: selected.eligible ? "private eligibility witness built" : "eligibility witness failed",
      contract: "Soroban claim gate",
    };
  }, [generated, selected]);

  const verifyUser = () => {
    if (!selected) return;

    setGenerated(true);

    if (selected.eligible) {
      setStatus("Proof accepted. The contract can receive the claim.");
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
            The important part is the sequence: witness, commitment, nullifier,
            then contract submission.
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
                  A private witness is built for the selected registry entry so the
                  public flow never needs raw beneficiary details.
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
                  The nullifier is what makes the Stellar claim replay-resistant.
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
                commitment: {proofEnvelope.commitment}
                {"\n"}
                nullifier: {proofEnvelope.nullifier}
                {"\n"}
                witness: {proofEnvelope.witness}
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
                ? "Send the proof envelope to the claim page. The contract should accept it once and only once."
                : generated
                ? "This record should not move forward. The user should be shown a clear rejection path."
                : "When the proof is generated, the claim route becomes available for eligible beneficiaries."}
            </p>
          </div>
        </article>
      </section>
    </main>
  );
}
