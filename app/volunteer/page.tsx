"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import SuccessAnimation from "@/components/SuccessAnimation";

export default function VolunteerPage() {
  const [form, setForm] = useState({
    name: "",
    skills: "",
    availability: "",
    location: "",
    contact: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

    if (form.skills.trim().length < 2)
      newErrors.skills = "Please mention your skills";

    if (form.availability.trim().length < 2)
      newErrors.availability = "Select availability";

    if (form.location.trim().length < 2)
      newErrors.location = "Location is required";

    if (form.contact.trim().length < 5)
      newErrors.contact = "Enter valid contact number";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSuccess(true);

        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });

        setForm({
          name: "",
          skills: "",
          availability: "",
          location: "",
          contact: "",
        });
      }
    } catch {
      console.error("Submission failed");
    }

    setLoading(false);
  };

  return (
    <main className="flex items-center justify-center min-h-screen px-6 py-24">
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-gray-200 dark:border-slate-700 p-10 rounded-2xl shadow-xl w-full max-w-lg">

        {!success ? (
          <>
            <h2 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-6">
              Volunteer Registration
            </h2>

            <form onSubmit={handleSubmit}>
              <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full mb-3 p-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mb-3">{errors.name}</p>
              )}

              <input
                name="skills"
                placeholder="Skills"
                value={form.skills}
                onChange={handleChange}
                className="w-full mb-3 p-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
              />
              {errors.skills && (
                <p className="text-red-500 text-xs mb-3">{errors.skills}</p>
              )}

              <select
                name="availability"
                value={form.availability}
                onChange={handleChange}
                className="w-full mb-3 p-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
              >
                <option value="">Select Availability</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Weekends">Weekends</option>
              </select>
              {errors.availability && (
                <p className="text-red-500 text-xs mb-3">
                  {errors.availability}
                </p>
              )}

              <input
                name="location"
                placeholder="Location"
                value={form.location}
                onChange={handleChange}
                className="w-full mb-3 p-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
              />
              {errors.location && (
                <p className="text-red-500 text-xs mb-3">
                  {errors.location}
                </p>
              )}

              <input
                name="contact"
                placeholder="Contact Number"
                value={form.contact}
                onChange={handleChange}
                className="w-full mb-6 p-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
              />
              {errors.contact && (
                <p className="text-red-500 text-xs mb-3">
                  {errors.contact}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-xl font-semibold disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Register as Volunteer"}
              </button>
            </form>
          </>
        ) : (
          <SuccessAnimation message="Volunteer registered successfully!" />
        )}
      </div>
    </main>
  );
}
