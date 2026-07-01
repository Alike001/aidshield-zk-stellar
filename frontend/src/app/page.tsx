import Link from "next/link";
import { deployment } from "@/data/deployment";

const pillars = [
  {
    title: "Private eligibility proof",
    copy: "The public proof exposes only a registry root and nullifier. The beneficiary leaf and path stay private.",
  },
  {
    title: "Verifier evidence on Stellar",
    copy: "A Soroban verifier contract has accepted the upgraded Noir proof on Stellar testnet.",
  },
  {
    title: "Replay-resistant claims",
    copy: "The claim gate consumes nullifiers so a valid beneficiary path cannot be reused for duplicate aid.",
  },
];

const steps = [
  {
    title: "Register a beneficiary set",
    copy: "Aid workers prepare an approved roster and publish the registry commitment.",
  },
  {
    title: "Generate the proof locally",
    copy: "The beneficiary produces a Noir proof that matches the private leaf without exposing the full record.",
  },
  {
    title: "Verify the proof on Stellar",
    copy: "The verifier checks the Noir proof before the nullifier claim is allowed to proceed.",
  },
  {
    title: "Consume the nullifier once",
    copy: "The claim gate records the nullifier and gives operators a traceable duplicate-prevention decision.",
  },
];

export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero-panel hero-panel-ops">
        <div className="hero-copy">
          <p className="eyebrow">Stellar Hacks: Real-World ZK</p>
          <h1 className="hero-title">
            Private aid eligibility, verified on Stellar.
          </h1>
          <p className="hero-text">
            AidShield lets an aid operator verify eligibility with a Noir proof,
            inspect the Stellar verifier transaction, and then consume a
            nullifier so the same claim path cannot be replayed.
          </p>

          <div className="hero-actions">
            <Link href="/verify" className="button-link">
              Run verification
            </Link>
            <Link href="/dashboard" className="button-link secondary">
              View dashboard
            </Link>
          </div>

          <div className="pill-list" aria-label="Project tags">
            <span className="status-pill">
              <span className="status-dot" aria-hidden="true" />
              Poseidon2 Noir circuit
            </span>
            <span className="status-pill">
              <span className="status-dot" aria-hidden="true" />
              Soroban verifier
            </span>
            <span className="status-pill">
              <span className="status-dot" aria-hidden="true" />
              Nullifier replay lock
            </span>
          </div>
        </div>

        <aside className="hero-surface evidence-panel">
          <div className="panel-heading">
            <h2>Live evidence</h2>
            <span className="info-chip">
              <span className="chip-dot" aria-hidden="true" />
              Testnet
            </span>
          </div>

          <div className="evidence-row">
            <span>Verifier contract</span>
            <strong>{deployment.verifierContractId}</strong>
          </div>

          <div className="evidence-row">
            <span>Public root</span>
            <strong>{deployment.publicRoot}</strong>
          </div>

          <div className="evidence-row">
            <span>Public nullifier</span>
            <strong>{deployment.publicNullifier}</strong>
          </div>

          <a
            href={deployment.proofVerificationTx}
            target="_blank"
            rel="noreferrer"
            className="contract-link"
          >
            Open proof verification transaction
          </a>
        </aside>
      </section>

      <section className="metric-strip" aria-label="Project metrics">
        <div className="metric-card">
          <span className="metric-label">Network</span>
          <strong className="metric-value">Stellar Testnet</strong>
          <p className="metric-copy">
            Soroban is the settlement surface for the claim gate.
          </p>
        </div>
        <div className="metric-card">
          <span className="metric-label">Privacy layer</span>
          <strong className="metric-value">Noir + Poseidon2</strong>
          <p className="metric-copy">
            Eligibility is proven through a private witness instead of a plain
            identity disclosure.
          </p>
        </div>
        <div className="metric-card">
          <span className="metric-label">Fraud control</span>
          <strong className="metric-value">Nullifier lock</strong>
          <p className="metric-copy">
            Once a claim is accepted, the replay path is sealed.
          </p>
        </div>
      </section>

      <section className="page-grid">
        <div className="section-head">
          <div>
            <p className="eyebrow">Why it stands out</p>
            <h2>What should be obvious in the demo</h2>
            <p className="section-lede">
              AidShield should not feel like another wallet or dashboard. It is
              a proof-first control layer for aid distribution.
            </p>
          </div>
        </div>

        <div className="feature-grid">
          {pillars.map((pillar) => (
            <article className="feature-card" key={pillar.title}>
              <strong>{pillar.title}</strong>
              <p>{pillar.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-grid">
        <div className="section-head">
          <div>
            <p className="eyebrow">Flow</p>
            <h2>How the claim moves from private proof to on-chain decision</h2>
          </div>
        </div>

        <div className="timeline-grid">
          {steps.map((step, index) => (
            <article className="timeline-card" key={step.title}>
              <span className="timeline-index">{index + 1}</span>
              <strong>{step.title}</strong>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="split-layout">
        <article className="contract-panel">
          <div className="panel-heading">
            <h3>Stellar deployment</h3>
            <span className="status-pill">
              <span className="status-dot" aria-hidden="true" />
              Testnet live
            </span>
          </div>
          <p className="panel-note">
            Judges can inspect the contract directly from the testnet explorer.
            The contract is the guardrail, not a visual afterthought.
          </p>
          <p className="contract-id">{deployment.claimGateContractId}</p>
          <a
            href={deployment.claimGateExplorer}
            target="_blank"
            rel="noreferrer"
            className="contract-link"
          >
            Open the Stellar contract
          </a>
        </article>

        <article className="spotlight-panel">
          <div className="panel-heading">
            <h3>What to say in the demo</h3>
            <span className="info-chip">2 minute script</span>
          </div>
          <div className="workflow-grid">
            <div className="workflow-card">
              <strong>1. “This proof is the lock.”</strong>
              <p>
                Eligibility is not a form field. It is a private proof generated
                from the beneficiary registry.
              </p>
            </div>
            <div className="workflow-card">
              <strong>2. “This contract stops replay.”</strong>
              <p>
                The Stellar contract rejects reused nullifiers so a valid claim
                cannot be counted twice.
              </p>
            </div>
            <div className="workflow-card">
              <strong>3. “This dashboard explains the decision.”</strong>
              <p>
                Operators see the registry, the claim state, and the audit trail
                in one place instead of piecing together logs.
              </p>
            </div>
          </div>
        </article>
      </section>

      <section className="route-callout">
        <strong>Competition read</strong>
        <p>
          The current project is in the right hackathon category because it
          pairs a private eligibility proof with visible Stellar verification.
          The strongest remaining technical upgrade is connecting verifier
          success directly to claim-gate submission.
        </p>
      </section>
    </main>
  );
}
