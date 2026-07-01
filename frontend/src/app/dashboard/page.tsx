import Link from "next/link";
import { beneficiaries } from "@/data/beneficiaries";
import { claims } from "@/data/claims";
import { deployment } from "@/data/deployment";

const operationalChecks = [
  {
    label: "Registry commitment",
    value: "Published",
    copy: "The dashboard only shows sample records; eligibility proof uses the public root.",
  },
  {
    label: "Noir verifier",
    value: "Accepted proof",
    copy: "The deployed Soroban verifier has checked the upgraded Poseidon2 circuit proof.",
  },
  {
    label: "Replay control",
    value: "Nullifier ready",
    copy: "Claim execution is keyed by a public nullifier instead of exposing identity data.",
  },
];

export default function Dashboard() {
  const total = beneficiaries.length;
  const eligible = beneficiaries.filter((b) => b.eligible).length;
  const ineligible = total - eligible;
  const claimCount = claims.length;
  const sealedProofs = beneficiaries.filter((b) => b.proofState === "Proof sealed").length;

  return (
    <main className="page-shell">
      <section className="section-head">
        <div>
          <p className="eyebrow">Operator dashboard</p>
          <h1>One operating view for privacy-safe aid release.</h1>
          <p className="section-lede">
            Aid teams can review roster health, proof readiness, claim events,
            and the live Stellar verifier without exposing beneficiary records.
          </p>
        </div>
        <div className="section-actions">
          <Link href="/verify" className="button-link secondary">
            Run verification
          </Link>
          <Link href="/claim" className="button-link secondary">
            Test claim flow
          </Link>
        </div>
      </section>

      <section className="metric-strip">
        <div className="metric-card">
          <span className="metric-label">Registered beneficiaries</span>
          <strong className="metric-value">{total}</strong>
          <p className="metric-copy">Seeded registry records in the demo set.</p>
        </div>
        <div className="metric-card">
          <span className="metric-label">Proof-ready records</span>
          <strong className="metric-value">{sealedProofs}</strong>
          <p className="metric-copy">These can move through the Noir verification desk.</p>
        </div>
        <div className="metric-card">
          <span className="metric-label">Claim trail</span>
          <strong className="metric-value">{claimCount}</strong>
          <p className="metric-copy">The history view shows accepted and queued claims.</p>
        </div>
      </section>

      <section className="ops-evidence-grid" aria-label="Operational readiness">
        {operationalChecks.map((check) => (
          <article className="workflow-status active" key={check.label}>
            <span aria-hidden="true">OK</span>
            <strong>{check.label}</strong>
            <p>
              <b>{check.value}</b> - {check.copy}
            </p>
          </article>
        ))}
      </section>

      <section className="split-layout">
        <article className="registry-card">
          <div className="panel-heading">
            <h3>Beneficiary registry</h3>
            <span className="status-pill">
              <span className="status-dot" aria-hidden="true" />
              {eligible} eligible / {ineligible} blocked
            </span>
          </div>

          <div className="table-scroll">
            <table className="table-shell">
              <thead>
                <tr>
                  <th>Beneficiary</th>
                  <th>Region</th>
                  <th>Proof state</th>
                  <th>Tranche</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {beneficiaries.map((person) => (
                  <tr key={person.id}>
                    <td>
                      <strong>{person.name}</strong>
                      <div className="muted">{person.household}</div>
                    </td>
                    <td>{person.location}</td>
                    <td>{person.proofState}</td>
                    <td>{person.tranche}</td>
                    <td>
                      <span className={person.eligible ? "status-chip" : "status-chip danger"}>
                        <span className="chip-dot" aria-hidden="true" />
                        {person.eligible ? "Eligible" : "Not eligible"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="proof-card">
          <div className="panel-heading">
            <h3>Claim operations</h3>
            <span className="info-chip">Replay-aware</span>
          </div>

          <div className="ledger-stack">
            {claims.map((claim) => (
              <div className="event-card" key={claim.id}>
                <div className="ledger-event">
                  <div className="event-meta">
                    <strong>{claim.beneficiary}</strong>
                    <span>
                      {claim.amount} on {claim.network}
                    </span>
                  </div>
                  <span className="event-time">{claim.timestamp}</span>
                </div>
                <div className="stat-row stack-offset">
                  <span className={claim.status === "Claimed" ? "status-chip" : "status-chip warn"}>
                    <span className="chip-dot" aria-hidden="true" />
                    {claim.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="proof-boundary-grid">
            <div className="boundary-row">
              <span>Public root</span>
              <strong>{deployment.publicRoot}</strong>
            </div>
            <div className="boundary-row">
              <span>Public nullifier</span>
              <strong>{deployment.publicNullifier}</strong>
            </div>
            <div className="boundary-row">
              <span>Operator decision</span>
              <strong>Release aid only after proof verification and one-time nullifier consumption</strong>
            </div>
          </div>

          <div className="contract-panel stack-offset">
            <div className="panel-heading">
              <h3>Claim gate</h3>
              <span className="status-pill">
                <span className="status-dot" aria-hidden="true" />
                Testnet
              </span>
            </div>
            <p className="contract-id">{deployment.claimGateContractId}</p>
            <a
              href={deployment.claimGateExplorer}
              target="_blank"
              rel="noreferrer"
              className="contract-link"
            >
              Open claim gate in Stellar Lab
            </a>
          </div>

          <div className="contract-panel stack-offset">
            <div className="panel-heading">
              <h3>ZK verifier</h3>
              <span className="status-pill">
                <span className="status-dot" aria-hidden="true" />
                Proof verified
              </span>
            </div>
            <p className="contract-id">{deployment.verifierContractId}</p>
            <a
              href={deployment.verifierExplorer}
              target="_blank"
              rel="noreferrer"
              className="contract-link"
            >
              Open verifier in Stellar Lab
            </a>
            <a
              href={deployment.verifierDeployTx}
              target="_blank"
              rel="noreferrer"
              className="contract-link"
            >
              View verifier deployment transaction
            </a>
            <a
              href={deployment.proofVerificationTx}
              target="_blank"
              rel="noreferrer"
              className="contract-link"
            >
              View proof verification transaction
            </a>
          </div>
        </article>
      </section>

      <section className="route-callout">
        <strong>Demo takeaway</strong>
        <p>
          AidShield is not a wallet demo. It is a privacy-preserving control
          plane for real-world aid programs: prove eligibility privately, verify
          on Stellar, and prevent duplicate distribution with a nullifier.
        </p>
      </section>
    </main>
  );
}
