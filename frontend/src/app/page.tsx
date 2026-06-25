import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="inline-block border rounded-full px-4 py-2 mb-6">
          Built on Stellar + Zero-Knowledge Proofs
        </div>

        <h1 className="text-6xl font-bold mb-6">
          Privacy-Preserving Aid Distribution
        </h1>

        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          AidShield enables organizations to verify beneficiary eligibility
          without exposing personal information while preventing duplicate aid
          claims on the Stellar blockchain.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/verify"
            className="px-6 py-3 border rounded-lg"
          >
            Verify Beneficiary
          </Link>

          <Link
            href="/dashboard"
            className="px-6 py-3 border rounded-lg"
          >
            View Dashboard
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why AidShield?
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="border rounded-xl p-6">
            <h3 className="text-xl font-bold mb-3">
              Zero-Knowledge Privacy
            </h3>

            <p>
              Beneficiaries prove eligibility without revealing sensitive
              personal information.
            </p>
          </div>

          <div className="border rounded-xl p-6">
            <h3 className="text-xl font-bold mb-3">
              Fraud Prevention
            </h3>

            <p>
              Duplicate claims are blocked using proof validation and
              nullifier tracking.
            </p>
          </div>

          <div className="border rounded-xl p-6">
            <h3 className="text-xl font-bold mb-3">
              Stellar Powered
            </h3>

            <p>
              Smart contracts on Stellar provide transparent and efficient
              aid distribution.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">
          How It Works
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="border rounded-xl p-6 text-center">
            <div className="text-3xl font-bold mb-3">1</div>
            <p>Register beneficiaries</p>
          </div>

          <div className="border rounded-xl p-6 text-center">
            <div className="text-3xl font-bold mb-3">2</div>
            <p>Generate ZK proof</p>
          </div>

          <div className="border rounded-xl p-6 text-center">
            <div className="text-3xl font-bold mb-3">3</div>
            <p>Verify eligibility</p>
          </div>

          <div className="border rounded-xl p-6 text-center">
            <div className="text-3xl font-bold mb-3">4</div>
            <p>Claim aid on Stellar</p>
          </div>
        </div>
      </section>

      {/* Contract */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="border rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-4">
            Deployed Stellar Contract
          </h2>

          <p className="break-all text-sm">
            CDB7NHCG27T3SB7KTGUALZHIAAVQ4NAVGMPBWBJ55FQWJTQLQRMQORKD
          </p>
        </div>
      </section>
    </main>
  );
}
