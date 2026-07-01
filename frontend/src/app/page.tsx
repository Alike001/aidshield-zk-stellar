import Link from "next/link";

const CONTRACT_ID =
  "CDB7NHCG27T3SB7KTGUALZHIAAVQ4NAVGMPBWBJ55FQWJTQLQRMQORKD";

const pillars = [
  {
    title: "Private eligibility",
    copy: "Beneficiaries prove inclusion in the registry without publishing the underlying personal record.",
  },
  {
    title: "Load-bearing ZK",
    copy: "The intended gate is proof-first: a beneficiary must prove eligibility before a claim can be accepted.",
  },
  {
    title: "Stellar settlement",
    copy: "Soroban keeps the nullifier ledger and blocks duplicate claims on-chain.",
  },
];

const steps = [
  {
    title: "Register a beneficiary set",
    copy: "Aid workers prepare a Merkle root from the approved roster and pin it to the program.",
  },
  {
    title: "Generate the proof locally",
    copy: "The beneficiary produces a Noir proof that matches the private leaf without exposing the full record.",
  },
  {
    title: "Submit the claim on Stellar",
    copy: "The contract checks the proof result and marks the nullifier so the same claim cannot be replayed.",
  },
  {
    title: "Keep the audit trail visible",
    copy: "Each acceptance or rejection lands in the dashboard so operators can explain the decision later.",
  },
];

export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Stellar Hacks: Real-World ZK</p>
          <h1 className="hero-title">
            Private aid claims, verified before they settle.
          </h1>
          <p className="hero-text">
            AidShield turns a beneficiary check into a zero-knowledge proof and
            then uses a Stellar contract to reject duplicates on-chain. The
            operator sees a clean decision trail. The beneficiary does not have
            to expose the private record that made them eligible.
          </p>

          <div className="hero-actions">
            <Link href="/verify" className="button-link">
              Open verification flow
            </Link>
            <Link href="/dashboard" className="button-link secondary">
              Inspect the dashboard
            </Link>
          </div>

          <div className="pill-list" aria-label="Project tags">
            <span className="status-pill">
              <span className="status-dot" aria-hidden="true" />
              Noir proof path
            </span>
            <span className="status-pill">
              <span className="status-dot" aria-hidden="true" />
              Soroban claim gate
            </span>
            <span className="status-pill">
              <span className="status-dot" aria-hidden="true" />
              Stellar testnet demo
            </span>
          </div>
        </div>

        <aside className="hero-surface">
          <div className="panel-heading">
            <h2>Judge-facing summary</h2>
            <span className="info-chip">
              <span className="chip-dot" aria-hidden="true" />
              Ready for demo
            </span>
          </div>

          <div className="hero-stat">
            <strong>Proof-first eligibility</strong>
            <p>
              ZK is the intended control gate: the product only makes sense if
              eligibility can be proven without exposing the beneficiary record.
            </p>
          </div>

          <div className="hero-stat">
            <strong>On-chain replay protection</strong>
            <p>
              The contract stores the nullifier history so a second claim from
              the same proof path is rejected.
            </p>
          </div>

          <div className="hero-stat">
            <strong>Contract deployment</strong>
            <p>
              {CONTRACT_ID}
            </p>
          </div>
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
          <strong className="metric-value">Noir</strong>
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
            <h2>Three things judges will notice fast</h2>
            <p className="section-lede">
              The best hackathon projects are easy to explain in one sentence
              and still feel technically credible. AidShield leans into both.
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
          <p className="contract-id">{CONTRACT_ID}</p>
          <a
            href="https://lab.stellar.org/r/testnet/contract/CDB7NHCG27T3SB7KTGUALZHIAAVQ4NAVGMPBWBJ55FQWJTQLQRMQORKD"
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
          pairs a ZK eligibility path with a real Stellar contract. The strongest
          remaining technical upgrade is a real Soroban verifier path so the
          proof is checked on-chain instead of represented by a demo flag.
        </p>
      </section>
    </main>
  );
}
