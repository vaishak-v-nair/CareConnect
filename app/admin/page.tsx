import { adminDb } from "@/lib/firebaseAdmin";
import AdminTabs from "./AdminTabs";

async function getPatients() {
  const snapshot = await adminDb
    .collection("support_requests")
    .orderBy("createdAt", "desc")
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate?.().toISOString() || null,
    };
  });
}

async function getVolunteers() {
  const snapshot = await adminDb
    .collection("volunteers")
    .orderBy("createdAt", "desc")
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate?.().toISOString() || null,
    };
  });
}

export default async function AdminPage() {
  const patients = await getPatients();
  const volunteers = await getVolunteers();

  const highUrgencyCount = patients.filter(
    (r: any) => r.urgency === "HIGH"
  ).length;

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Monitor patient requests and volunteer registrations in real-time.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          <StatCard
            label="Total Requests"
            value={patients.length}
          />
          <StatCard
            label="High Urgency"
            value={highUrgencyCount}
            danger
          />
          <StatCard
            label="Volunteers"
            value={volunteers.length}
          />
        </div>

        {/* Tabs Section */}
        <AdminTabs patients={patients} volunteers={volunteers} />
      </div>
    </main>
  );
}

/* ---------- Small Components ---------- */

function StatCard({
  label,
  value,
  danger = false,
}: {
  label: string;
  value: number;
  danger?: boolean;
}) {
  return (
    <div className="bg-white dark:bg-slate-900 
                    border border-gray-200 dark:border-slate-700
                    rounded-2xl p-6 shadow-md">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {label}
      </p>
      <p
        className={`text-3xl font-bold mt-2 ${
          danger ? "text-red-500" : "text-gray-900 dark:text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}