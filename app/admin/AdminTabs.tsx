"use client";

import { useState } from "react";

export default function AdminTabs({
  patients,
  volunteers,
}: any) {
  const [active, setActive] = useState<"patients" | "volunteers">("patients");

  return (
    <div>

      {/* Toggle Buttons */}
      <div className="flex gap-4 mb-10">
        <button
          onClick={() => setActive("patients")}
          className={`px-5 py-2 rounded-full text-sm font-medium transition ${
            active === "patients"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-300"
          }`}
        >
          Patients
        </button>

        <button
          onClick={() => setActive("volunteers")}
          className={`px-5 py-2 rounded-full text-sm font-medium transition ${
            active === "volunteers"
              ? "bg-green-600 text-white"
              : "bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-300"
          }`}
        >
          Volunteers
        </button>
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-2 gap-6">
        {active === "patients" &&
          patients.map((req: any) => (
            <PatientCard key={req.id} req={req} />
          ))}

        {active === "volunteers" &&
          volunteers.map((v: any) => (
            <VolunteerCard key={v.id} volunteer={v} />
          ))}
      </div>
    </div>
  );
}

/* ---------- Patient Card ---------- */

function PatientCard({ req }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 
                    border border-gray-200 dark:border-slate-700
                    p-6 rounded-2xl shadow-md hover:shadow-xl transition">

      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold text-lg dark:text-white">
          {req.name} ({req.age})
        </h2>

        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${
            req.urgency === "HIGH"
              ? "bg-red-100 text-red-600"
              : req.urgency === "MEDIUM"
              ? "bg-yellow-100 text-yellow-700"
              : req.urgency === "LOW"
              ? "bg-green-100 text-green-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {req.urgency || "N/A"}
        </span>
      </div>

      <p className="text-sm text-gray-500 mb-2">
        {req.location} | {req.contact}
      </p>

      <p className="text-gray-700 dark:text-gray-300 mb-2">
        <strong>Description:</strong> {req.description}
      </p>

      <p className="text-gray-700 dark:text-gray-300 mb-2">
        <strong>AI Summary:</strong>{" "}
        {req.ai_summary || "Not processed"}
      </p>

      <p className="text-sm text-gray-600 dark:text-gray-400">
        <strong>Category:</strong> {req.category || "N/A"}
      </p>
    </div>
  );
}

/* ---------- Volunteer Card ---------- */

function VolunteerCard({ volunteer }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 
                    border border-gray-200 dark:border-slate-700
                    p-6 rounded-2xl shadow-md hover:shadow-xl transition">

      <h2 className="font-semibold text-lg mb-2 dark:text-white">
        {volunteer.name}
      </h2>

      <p className="text-sm text-gray-500 mb-2">
        {volunteer.location} | {volunteer.contact}
      </p>

      <p className="text-gray-700 dark:text-gray-300 mb-1">
        <strong>Skills:</strong> {volunteer.skills}
      </p>

      <p className="text-gray-700 dark:text-gray-300">
        <strong>Availability:</strong> {volunteer.availability}
      </p>
    </div>
  );
}
