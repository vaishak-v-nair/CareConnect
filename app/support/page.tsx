"use client";

import { useState } from "react";

export default function SupportPage() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    location: "",
    contact: "",
    description: "",
    selfUrgency: "LOW",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<any>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    const newErrors: any = {};

    if (form.name.trim().length < 2)
      newErrors.name = "Name must be at least 2 characters";

    if (!form.age || Number(form.age) < 1)
      newErrors.age = "Enter valid age";

    if (form.location.trim().length < 2)
      newErrors.location = "Location is required";

    if (form.contact.trim().length < 5)
      newErrors.contact = "Enter valid contact number";

    if (form.description.trim().length < 10)
      newErrors.description = "Minimum 10 characters";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          age: Number(form.age),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Request submitted successfully.");
        setForm({
          name: "",
          age: "",
          location: "",
          contact: "",
          description: "",
          selfUrgency: "LOW",
        });
      } else {
        setMessage(data.error || "Submission failed.");
      }
    } catch {
      setMessage("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <main className="px-6 pt-32 pb-20 min-h-screen">
      <div className="max-w-lg mx-auto">

        <div
          className="bg-white/80 dark:bg-slate-900/80 
                     backdrop-blur-xl 
                     border border-gray-200 dark:border-slate-700
                     p-10 rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            Patient Support Request
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Provide accurate information so our team can prioritize your request effectively.
          </p>

          <form onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full mb-3 p-3 border border-gray-300 dark:border-slate-600 
                         bg-white dark:bg-slate-800
                         text-gray-800 dark:text-gray-100
                         rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mb-3">{errors.name}</p>
            )}

            <div className="grid grid-cols-2 gap-4 mb-3">
              <input
                name="age"
                type="number"
                placeholder="Age"
                value={form.age}
                onChange={handleChange}
                className="p-3 border border-gray-300 dark:border-slate-600 
                           bg-white dark:bg-slate-800
                           text-gray-800 dark:text-gray-100
                           rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <input
                name="location"
                placeholder="Location"
                value={form.location}
                onChange={handleChange}
                className="p-3 border border-gray-300 dark:border-slate-600 
                           bg-white dark:bg-slate-800
                           text-gray-800 dark:text-gray-100
                           rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {errors.age && (
              <p className="text-red-500 text-xs mb-2">{errors.age}</p>
            )}
            {errors.location && (
              <p className="text-red-500 text-xs mb-3">{errors.location}</p>
            )}

            <input
              name="contact"
              placeholder="Contact Number"
              value={form.contact}
              onChange={handleChange}
              className="w-full mb-3 p-3 border border-gray-300 dark:border-slate-600 
                         bg-white dark:bg-slate-800
                         text-gray-800 dark:text-gray-100
                         rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.contact && (
              <p className="text-red-500 text-xs mb-3">{errors.contact}</p>
            )}

            <select
              name="selfUrgency"
              value={form.selfUrgency}
              onChange={handleChange}
              className="w-full mb-4 p-3 border border-gray-300 dark:border-slate-600 
                         bg-white dark:bg-slate-800
                         text-gray-800 dark:text-gray-100
                         rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>

            <textarea
              name="description"
              placeholder="Describe your medical need"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full mb-3 p-3 border border-gray-300 dark:border-slate-600 
                         bg-white dark:bg-slate-800
                         text-gray-800 dark:text-gray-100
                         rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.description && (
              <p className="text-red-500 text-xs mb-3">
                {errors.description}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 
                         transition text-white p-3 rounded-xl 
                         font-semibold disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>

            {message && (
              <p
                className={`mt-4 text-sm text-center font-medium ${
                  message.toLowerCase().includes("success")
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>

      </div>
    </main>
  );
}
