"use client";

import { useState } from "react";

export default function AdminTabs({
  patients,
  volunteers,
}: {
  patients: any[];
  volunteers: any[];
}) {
  const [active, setActive] = useState<"patients" | "volunteers">("patients");

  const activeData = active === "patients" ? patients : volunteers;

  return (
    <div>
      {/* Toggle Buttons */}
      <div className="flex gap-4 mb-10">
        <button
          onClick={() => setActive("patients")}
          className={`px-6 py-2 rounded-full font-medium transition ${
            active === "patients"
              ? "bg-blue-600 text-white"
              : "bg-slate-800 text-gray-300 hover:bg-slate-700"
          }`}
        >
          Patients
        </button>

        <button
          onClick={() => setActive("volunteers")}
          className={`px-6 py-2 rounded-full font-medium transition ${
            active === "volunteers"
              ? "bg-green-600 text-white"
              : "bg-slate-800 text-gray-300 hover:bg-slate-700"
          }`}
        >
          Volunteers
        </button>
      </div>

      {/* No Data State */}
      {activeData.length === 0 && (
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-10 text-center">
          <p className="text-gray-400 text-sm">
            No {active} found.
          </p>
        </div>
      )}

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        {active === "patients" &&
          patients
            .filter((p) => p.name) // 🔥 prevent dummy object
            .map((p) => (
              <div
                key={p.id}
                className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-lg"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-white">
                    {p.name} ({p.age})
                  </h3>

                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      p.urgency === "HIGH"
                        ? "bg-red-500/20 text-red-400"
                        : p.urgency === "MEDIUM"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {p.urgency}
                  </span>
                </div>

                <p className="text-gray-400 text-sm mb-2">
                  {p.location} | {p.contact}
                </p>

                <p className="text-gray-300 mb-2">
                  <strong>Description:</strong> {p.description}
                </p>

                <p className="text-gray-300 mb-1">
                  <strong>AI Summary:</strong>{" "}
                  {p.ai_summary || "Processing..."}
                </p>

                <p className="text-gray-400 text-sm">
                  <strong>Category:</strong> {p.category || "N/A"}
                </p>
              </div>
            ))}

        {active === "volunteers" &&
          volunteers
            .filter((v) => v.name) // 🔥 prevent dummy object
            .map((v) => (
              <div
                key={v.id}
                className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-semibold text-white mb-3">
                  {v.name}
                </h3>

                <p className="text-gray-300 mb-2">
                  <strong>Skills:</strong> {v.skills || "N/A"}
                </p>

                <p className="text-gray-300">
                  <strong>Availability:</strong>{" "}
                  {v.availability || "N/A"}
                </p>
              </div>
            ))}
      </div>
    </div>
  );
}
