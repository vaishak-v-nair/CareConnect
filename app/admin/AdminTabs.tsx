"use client";

import { useState } from "react";

export default function AdminTabs({
  patients,
  volunteers,
}: {
  patients: any[];
  volunteers: any[];
}) {
  const [activeTab, setActiveTab] = useState<"patients" | "volunteers">(
    "patients"
  );

  return (
    <div>
      {/* Tab Buttons */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab("patients")}
          className={`px-6 py-2 rounded-full font-medium transition ${
            activeTab === "patients"
              ? "bg-blue-600 text-white"
              : "bg-slate-800 text-gray-300"
          }`}
        >
          Patients
        </button>

        <button
          onClick={() => setActiveTab("volunteers")}
          className={`px-6 py-2 rounded-full font-medium transition ${
            activeTab === "volunteers"
              ? "bg-green-600 text-white"
              : "bg-slate-800 text-gray-300"
          }`}
        >
          Volunteers
        </button>
      </div>

      {/* Patients */}
      {activeTab === "patients" &&
        patients.map((p) => (
          <div
            key={p.id}
            className="bg-slate-900 text-white p-6 rounded-2xl shadow-md mb-6"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">
                {p.name || "Unknown"} ({p.age || "N/A"})
              </h2>

              <span className="text-xs px-3 py-1 rounded-full bg-gray-700">
                {p.urgency || "N/A"}
              </span>
            </div>

            <p className="text-sm text-gray-400 mb-2">
              {p.location || "Unknown"} | {p.contact || "N/A"}
            </p>

            <p className="mb-2">
              <strong>Description:</strong>{" "}
              {p.description || "N/A"}
            </p>

            <p className="mb-2">
              <strong>AI Summary:</strong>{" "}
              {p.ai_summary || "Not processed"}
            </p>

            <p>
              <strong>Category:</strong>{" "}
              {p.category || "N/A"}
            </p>
          </div>
        ))}

      {/* Volunteers */}
      {activeTab === "volunteers" &&
        volunteers.map((v) => (
          <div
            key={v.id}
            className="bg-slate-900 text-white p-6 rounded-2xl shadow-md mb-6"
          >
            <h2 className="text-lg font-semibold mb-2">
              {v.name || "Unknown"}
            </h2>

            <p className="mb-1">
              <strong>Skills:</strong>{" "}
              {v.skills || "N/A"}
            </p>

            <p className="mb-1">
              <strong>Availability:</strong>{" "}
              {v.availability || "N/A"}
            </p>

            <p className="text-sm text-gray-400">
              {v.location || "Unknown"} | {v.contact || "N/A"}
            </p>
          </div>
        ))}
    </div>
  );
}
