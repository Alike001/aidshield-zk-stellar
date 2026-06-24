"use client";

import { useState } from "react";
import { beneficiaries } from "@/data/beneficiaries";

export default function VerifyPage() {
  const [selected, setSelected] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [eligible, setEligible] = useState(false);

  const verifyUser = () => {
    const user = beneficiaries.find(
      (b) => b.name === selected
    );

    if (!user) return;

    if (user.eligible) {
      setEligible(true);
      setResult("✅ Eligible for Aid");
    } else {
      setEligible(false);
      setResult("❌ Not Eligible");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-xl border rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6">
          Beneficiary Verification
        </h1>

        <select
          className="w-full border p-3 rounded mb-4"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="">
            Select Beneficiary
          </option>

          {beneficiaries.map((b) => (
            <option key={b.id} value={b.name}>
              {b.name}
            </option>
          ))}
        </select>

        <button
          onClick={verifyUser}
          className="border rounded px-6 py-3"
        >
          Generate Proof
        </button>

        {result && (
         <div className="mt-6">
          <div className="text-xl mb-4">
           {result}
         </div>

         {eligible && (
           <a
             href="/claim"
             className="border rounded px-6 py-3 inline-block"
           >
             Continue to Claim
           </a>
         )}
        </div>
       )}
      </div>
    </main>
  );
}
