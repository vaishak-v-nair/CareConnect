"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AdminPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"patients" | "volunteers">("patients");

  useEffect(() => {
    const q1 = query(
      collection(db, "support_requests"),
      orderBy("createdAt", "desc")
    );

    const unsub1 = onSnapshot(q1, (snapshot) => {
      setRequests(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    const q2 = query(
      collection(db, "volunteers"),
      orderBy("createdAt", "desc")
    );

    const unsub2 = onSnapshot(q2, (snapshot) => {
      setVolunteers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => {
      unsub1();
      unsub2();
    };
  }, []);

  const highUrgency = requests.filter(
    (r) => r.urgency === "HIGH"
  ).length;

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-blue-600 mb-10">
          Admin Dashboard
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
            <p className="text-gray-500">Total Requests</p>
            <p className="text-3xl font-bold">{requests.length}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
            <p className="text-gray-500">High Urgency</p>
            <p className="text-3xl font-bold text-red-600">{highUrgency}</p>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("patients")}
            className={`px-5 py-2 rounded-xl ${
              activeTab === "patients"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            Patients
          </button>

          <button
            onClick={() => setActiveTab("volunteers")}
            className={`px-5 py-2 rounded-xl ${
              activeTab === "volunteers"
                ? "bg-green-600 text-white"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            Volunteers
          </button>
        </div>

        {activeTab === "patients" && (
          <div className="grid md:grid-cols-2 gap-6">
            {requests.map((req) => (
              <div
                key={req.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md"
              >
                <h3 className="font-semibold text-lg">
                  {req.name} ({req.age})
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  {req.location} | {req.contact}
                </p>
                <p className="text-sm">{req.description}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "volunteers" && (
          <div className="grid md:grid-cols-2 gap-6">
            {volunteers.map((vol) => (
              <div
                key={vol.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md"
              >
                <h3 className="font-semibold text-lg">
                  {vol.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {vol.location} | {vol.contact}
                </p>
                <p className="text-sm mt-2">
                  Skills: {vol.skills}
                </p>
                <p className="text-sm">
                  Availability: {vol.availability}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
