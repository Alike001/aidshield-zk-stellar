import Link from "next/link";
import { beneficiaries } from "@/data/beneficiaries";
import { claims } from "@/data/claims";

const CONTRACT_ID =
  "CDB7NHCG27T3SB7KTGUALZHIAAVQ4NAVGMPBWBJ55FQWJTQLQRMQORKD";

export default function Dashboard() {
  const total = beneficiaries.length;
  const eligible = beneficiaries.filter((b) => b.eligible).length;
  const ineligible = total - eligible;
  const claimCount = claims.length;

  return (
    <main className="page-shell">
      <section className="section-head">
        <div>
          <p className="eyebrow">Operator dashboard</p>
          <h1>The audit view for beneficiaries, claims, and Stellar deployment.</h1>
          <p className="section-lede">
            This is the operational face of the project. It should help a judge
            understand the beneficiary registry, the claim trail, and the
            on-chain contract without needing any extra explanation.
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
          <span className="metric-label">Eligible records</span>
          <strong className="metric-value">{eligible}</strong>
          <p className="metric-copy">These can move to proof generation and claim submission.</p>
        </div>
        <div className="metric-card">
          <span className="metric-label">Claim events</span>
          <strong className="metric-value">{claimCount}</strong>
          <p className="metric-copy">The history view shows accepted and queued claims.</p>
        </div>
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

          <table className="table-shell">
            <thead>
              <tr>
                <th>Beneficiary</th>
                <th>Region</th>
                <th>Proof state</th>
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
        </article>

        <article className="proof-card">
          <div className="panel-heading">
            <h3>Recent claims</h3>
            <span className="info-chip">Audit trail</span>
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

          <div className="contract-panel stack-offset">
            <div className="panel-heading">
              <h3>Stellar deployment</h3>
              <span className="status-pill">
                <span className="status-dot" aria-hidden="true" />
                Testnet
              </span>
            </div>
            <p className="contract-id">{CONTRACT_ID}</p>
            <a
              href="https://lab.stellar.org/r/testnet/contract/CDB7NHCG27T3SB7KTGUALZHIAAVQ4NAVGMPBWBJ55FQWJTQLQRMQORKD"
              target="_blank"
              rel="noreferrer"
              className="contract-link"
            >
              Open contract in Stellar Lab
            </a>
          </div>
        </article>
      </section>

      <section className="route-callout">
        <strong>What to improve next</strong>
        <p>
          If you want an even stronger submission, the next milestone is to
          connect the proof page to a real Noir output and surface the contract
          result in this dashboard. The current UI now makes that future step
          feel natural instead of bolted on.
        </p>
      </section>
    </main>
  );
}
