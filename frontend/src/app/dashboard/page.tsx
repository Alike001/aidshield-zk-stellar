import { beneficiaries } from "@/data/beneficiaries";
import { claims } from "@/data/claims";

export default function Dashboard() {
  const total = beneficiaries.length;

  const eligible = beneficiaries.filter(
    (b) => b.eligible
  ).length;

  const ineligible = total - eligible;

  return (
    <main className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        AidShield Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="border rounded-xl p-6">
          <h2 className="text-3xl font-bold">
            {total}
          </h2>
          <p>Registered Beneficiaries</p>
        </div>

        <div className="border rounded-xl p-6">
          <h2 className="text-3xl font-bold">
            {eligible}
          </h2>
          <p>Eligible Beneficiaries</p>
        </div>

        <div className="border rounded-xl p-6">
          <h2 className="text-3xl font-bold">
            {ineligible}
          </h2>
          <p>Not Eligible</p>
        </div>
      </div>

      <div className="border rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">
          Beneficiaries
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3">ID</th>
              <th className="text-left py-3">Name</th>
              <th className="text-left py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {beneficiaries.map((person) => (
              <tr
                key={person.id}
                className="border-b"
              >
                <td className="py-3">
                  {person.id}
                </td>

                <td className="py-3">
                  {person.name}
                </td>

                <td className="py-3">
                  {person.eligible
                    ? "Eligible"
                    : "Not Eligible"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
	
      <div className="border rounded-xl p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">
          Claim History
        </h2>

      <table className="w-full">
       <thead>
        <tr className="border-b">
         <th className="text-left py-3">
           Claim ID
         </th>

         <th className="text-left py-3">
           Beneficiary
         </th>

         <th className="text-left py-3">
           Status
         </th>
      </tr>
    </thead>

    <tbody>
      {claims.map((claim) => (
        <tr
          key={claim.id}
          className="border-b"
        >
          <td className="py-3">
            {claim.id}
          </td>

          <td className="py-3">
            {claim.beneficiary}
          </td>

          <td className="py-3">
            {claim.status}
          </td>
        </tr>
      ))}
    </tbody>
   </table>
   </div>
	
    </main>
  );
}
