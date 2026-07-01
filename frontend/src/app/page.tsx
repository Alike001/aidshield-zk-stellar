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

const proofSignals = [
  {
    label: "Proof verified",
    value: "Stellar testnet",
  },
  {
    label: "Public inputs",
    value: "Root + nullifier",
  },
  {
    label: "Private witness",
    value: "Leaf + path",
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

          <div className="hero-proof-strip" aria-label="Demo proof summary">
            {proofSignals.map((signal) => (
              <div className="proof-signal" key={signal.label}>
                <span>{signal.label}</span>
                <strong>{signal.value}</strong>
              </div>
            ))}
          </div>

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

        <aside className="hero-surface evidence-panel hero-console">
          <div className="panel-heading">
            <h2>Operator proof console</h2>
            <span className="info-chip">
              <span className="chip-dot" aria-hidden="true" />
              Testnet
            </span>
          </div>

          <div className="console-status">
            <div>
              <span>Current workflow</span>
              <strong>Verify proof before aid release</strong>
            </div>
            <span className="status-chip">
              <span className="chip-dot" aria-hidden="true" />
              Online
            </span>
          </div>

          <div className="console-flow" aria-label="AidShield proof workflow">
            <div className="console-step active">
              <span>01</span>
              <strong>Private witness</strong>
              <p>Beneficiary data stays off the public ledger.</p>
            </div>
            <div className="console-step active">
              <span>02</span>
              <strong>Soroban verifier</strong>
              <p>Noir proof accepted against public inputs.</p>
            </div>
            <div className="console-step">
              <span>03</span>
              <strong>Claim gate</strong>
              <p>Nullifier prevents duplicate distribution.</p>
            </div>
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
            <h3>Proof boundary</h3>
            <span className="info-chip">Noir</span>
          </div>
          <div className="proof-boundary-grid">
            <div className="boundary-row">
              <span>Public</span>
              <strong>Registry root, nullifier, verifier transaction</strong>
            </div>
            <div className="boundary-row">
              <span>Private</span>
              <strong>Beneficiary leaf, path siblings, direction bits, nullifier secret</strong>
            </div>
            <div className="boundary-row">
              <span>Operator result</span>
              <strong>Claim can proceed once, then duplicate attempts are blocked</strong>
            </div>
          </div>
        </article>
      </section>

      <section className="route-callout">
        <strong>Implementation boundary</strong>
        <p>
          The verifier proof is live on Stellar testnet. The next product
          hardening step is connecting verifier success directly to claim-gate
          submission instead of treating it as a separate preflight.
        </p>
      </section>
    </main>
  );
}
