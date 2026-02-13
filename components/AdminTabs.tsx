"use client";

import { useState } from "react";

export default function AdminTabs({
  requests,
  volunteers,
}: {
  requests: any[];
  volunteers: any[];
}) {
  const [activeTab, setActiveTab] = useState<"patients" | "volunteers">(
    "patients"
  );

  const tabStyle = (tab: string) =>
    `px-5 py-2 rounded-xl font-medium transition ${
      activeTab === tab
        ? "bg-blue-600 text-white"
        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
    }`;

  return (
    <>
      {/* Tabs */}
      <div className="flex gap-4 mb-10">
        <button
          className={tabStyle("patients")}
          onClick={() => setActiveTab("patients")}
        >
          Patients
        </button>

        <button
          className={tabStyle("volunteers")}
          onClick={() => setActiveTab("volunteers")}
        >
          Volunteers
        </button>
      </div>

      {/* Patients Section */}
      {activeTab === "patients" && (
        <div className="grid md:grid-cols-2 gap-6">
          {requests.length === 0 && (
            <p className="text-gray-500">No patient requests yet.</p>
          )}

          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <h3 className="font-semibold text-lg mb-2">
                {req.name} ({req.age})
              </h3>

              <p className="text-sm text-gray-500 mb-3">
                {req.location} | {req.contact}
              </p>

              <div className="flex gap-3 mb-3">
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${
                    req.selfUrgency === "HIGH"
                      ? "bg-red-100 text-red-600"
                      : req.selfUrgency === "MEDIUM"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  Self: {req.selfUrgency}
                </span>

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
                  AI: {req.urgency || "N/A"}
                </span>
              </div>

              {req.selfUrgency &&
                req.urgency &&
                req.selfUrgency !== req.urgency && (
                  <div className="bg-yellow-50 text-yellow-700 text-xs p-2 rounded-lg mb-3">
                    ⚠ Urgency mismatch detected.
                  </div>
                )}

              <p className="text-gray-700 mb-2">
                <span className="font-medium">Description:</span>{" "}
                {req.description}
              </p>

              <div className="bg-blue-50 p-3 rounded-xl mt-2">
                <p className="text-sm text-blue-700">
                  {req.ai_summary || "AI summary not available."}
                </p>
              </div>

              <p className="text-sm text-gray-600 mt-3">
                <span className="font-medium">Category:</span>{" "}
                {req.category || "N/A"}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Volunteers Section */}
      {activeTab === "volunteers" && (
        <div className="grid md:grid-cols-2 gap-6">
          {volunteers.length === 0 && (
            <p className="text-gray-500">No volunteers registered yet.</p>
          )}

          {volunteers.map((vol) => (
            <div
              key={vol.id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <h3 className="font-semibold text-lg mb-2">
                {vol.name}
              </h3>

              <p className="text-sm text-gray-500 mb-2">
                {vol.location} | {vol.contact}
              </p>

              <p className="text-gray-700 mb-2">
                <span className="font-medium">Skills:</span>{" "}
                {vol.skills}
              </p>

              <p className="text-gray-700">
                <span className="font-medium">Availability:</span>{" "}
                {vol.availability}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
