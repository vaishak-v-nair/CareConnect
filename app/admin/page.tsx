import { adminDb } from "@/lib/firebaseAdmin";
import AdminTabs from "./AdminTabs";

type Patient = {
  id: string;
  name: string;
  age: number;
  location: string;
  contact: string;
  description: string;
  ai_summary?: string | null;
  urgency?: string | null;
  category?: string | null;
  selfUrgency?: string | null;
  createdAt: string | null;
};

type Volunteer = {
  id: string;
  name: string;
  skills: string;
  availability: string;
  location: string;
  contact: string;
  createdAt: string | null;
};

/* ============================= */
/* FETCH PATIENTS (SAFE VERSION) */
/* ============================= */

async function getPatients(): Promise<Patient[]> {
  const snapshot = await adminDb.collection("support_requests").get();

  const patients = snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      name: data.name || "",
      age: data.age || 0,
      location: data.location || "",
      contact: data.contact || "",
      description: data.description || "",
      ai_summary: data.ai_summary || null,
      urgency: data.urgency || null,
      category: data.category || null,
      selfUrgency: data.selfUrgency || null,
      createdAt: data.createdAt?.toDate?.().toISOString() || null,
    };
  });

  // Sort safely in Node (not Firestore)
  return patients.sort((a, b) => {
    if (!a.createdAt || !b.createdAt) return 0;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

/* ============================= */
/* FETCH VOLUNTEERS (SAFE VERSION) */
/* ============================= */

async function getVolunteers(): Promise<Volunteer[]> {
  const snapshot = await adminDb.collection("volunteers").get();

  const volunteers = snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      name: data.name || "",
      skills: data.skills || "",
      availability: data.availability || "",
      location: data.location || "",
      contact: data.contact || "",
      createdAt: data.createdAt?.toDate?.().toISOString() || null,
    };
  });

  // Safe Node sorting
  return volunteers.sort((a, b) => {
    if (!a.createdAt || !b.createdAt) return 0;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

/* ============================= */
/* PAGE COMPONENT */
/* ============================= */

export default async function AdminPage() {
  const patients = await getPatients();
  const volunteers = await getVolunteers();

  const highUrgencyCount = patients.filter(
    (r) => r.urgency === "HIGH"
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
            Monitor patient requests and volunteer registrations.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          <StatCard label="Total Requests" value={patients.length} />
          <StatCard
            label="High Urgency"
            value={highUrgencyCount}
            danger
          />
          <StatCard label="Volunteers" value={volunteers.length} />
        </div>

        {/* Tabs Section */}
        <AdminTabs patients={patients} volunteers={volunteers} />
      </div>
    </main>
  );
}

/* ============================= */
/* SMALL COMPONENT */
/* ============================= */

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
    <div
      className="bg-white dark:bg-slate-900
                 border border-gray-200 dark:border-slate-700
                 rounded-2xl p-6 shadow-md"
    >
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {label}
      </p>

      <p
        className={`text-3xl font-bold mt-2 ${
          danger
            ? "text-red-500"
            : "text-gray-900 dark:text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
