"use client";

import { useState } from "react";

const CONTRACT_ID =
  "CDB7NHCG27T3SB7KTGUALZHIAAVQ4NAVGMPBWBJ55FQWJTQLQRMQORKD";

export default function ClaimPage() {
  const [claimed, setClaimed] = useState(false);
  const [message, setMessage] = useState("");

  const handleClaim = () => {
    if (claimed) {
      setMessage("❌ Duplicate Claim Detected");
      return;
    }

    setClaimed(true);
    setMessage("✅ Aid Successfully Claimed");
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full border rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-4">
          Claim Aid
        </h1>

        <p className="mb-6">
          Stellar Contract:
        </p>

        <div className="border rounded p-3 text-sm break-all mb-6">
          {CONTRACT_ID}
        </div>

        <button
          onClick={handleClaim}
          className="border rounded px-6 py-3"
        >
          Claim Aid
        </button>

        {message && (
          <div className="mt-6 text-xl">
            {message}
          </div>
        )}
      </div>
    </main>
  );
}
