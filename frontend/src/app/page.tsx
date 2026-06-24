export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="max-w-4xl text-center">
        <h1 className="text-6xl font-bold mb-6">
          AidShield
        </h1>

        <p className="text-xl mb-8">
          Privacy-Preserving Aid Distribution on Stellar
        </p>

        <p className="text-lg text-gray-600 mb-12">
          Verify beneficiary eligibility using Zero-Knowledge Proofs
          while preventing duplicate aid claims on the Stellar blockchain.
        </p>

        <div className="flex gap-4 justify-center">
          <a
            href="/verify"
            className="px-6 py-3 rounded-lg border"
          >
            Check Eligibility
          </a>

         <a
           href="/claim"
           className="px-6 py-3 rounded-lg border"
         >
           Claim Aid
         </a>

        <a
         href="/dashboard"
         className="px-6 py-3 rounded-lg border"
       >
         Dashboard
       </a>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="border rounded-xl p-6">
            <h2 className="font-bold mb-2">Zero Knowledge</h2>
            <p>
              Beneficiaries prove eligibility without exposing sensitive data.
            </p>
          </div>

          <div className="border rounded-xl p-6">
            <h2 className="font-bold mb-2">Stellar Smart Contracts</h2>
            <p>
              Claims are recorded and validated on Stellar Testnet.
            </p>
          </div>

          <div className="border rounded-xl p-6">
            <h2 className="font-bold mb-2">Fraud Prevention</h2>
            <p>
              Nullifiers prevent beneficiaries from claiming aid twice.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
