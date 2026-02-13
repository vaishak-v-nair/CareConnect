import { NextResponse } from "next/server";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { volunteerSchema } from "@/lib/validators";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate input
    const parsed = volunteerSchema.parse(body);

    // Save to Firestore
    await addDoc(collection(db, "volunteers"), {
      name: parsed.name,
      skills: parsed.skills,
      availability: parsed.availability,
      location: parsed.location,
      contact: parsed.contact,
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("Volunteer API error:", error);

    return NextResponse.json(
      { error: error?.message || "Submission failed." },
      { status: 400 }
    );
  }
}
