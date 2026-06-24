export default function Dashboard() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">
        AidShield Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="border rounded-xl p-6">
          <h2 className="text-2xl font-bold">3</h2>
          <p>Registered Beneficiaries</p>
        </div>

        <div className="border rounded-xl p-6">
          <h2 className="text-2xl font-bold">2</h2>
          <p>Eligible Beneficiaries</p>
        </div>

        <div className="border rounded-xl p-6">
          <h2 className="text-2xl font-bold">1</h2>
          <p>Claims Processed</p>
        </div>
      </div>

      <div className="border rounded-xl p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">
          Stellar Contract
        </h2>

        <p className="break-all">
          CDB7NHCG27T3SB7KTGUALZHIAAVQ4NAVGMPBWBJ55FQWJTQLQRMQORKD
        </p>
      </div>

      <div className="border rounded-xl p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">
          Aid Distribution Workflow
        </h2>

        <ol className="space-y-2">
          <li>1. Register beneficiaries</li>
          <li>2. Generate zero-knowledge proof</li>
          <li>3. Verify eligibility</li>
          <li>4. Submit claim to Stellar</li>
          <li>5. Prevent duplicate claims</li>
        </ol>
      </div>
    </main>
  );
}
