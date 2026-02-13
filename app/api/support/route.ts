import { NextResponse } from "next/server";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { supportSchema } from "@/lib/validators";
import { getAISummary } from "@/lib/openrouter";
import { ZodError } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = supportSchema.parse(body);

    let aiData = {
      summary: null,
      urgency: null,
      category: null,
    };

    try {
      const result = await getAISummary(parsed.description);
      aiData = result || aiData;
    } catch (aiError) {
      console.error("AI error:", aiError);
    }

    await addDoc(collection(db, "support_requests"), {
      ...parsed,
      selfUrgency: parsed.selfUrgency || null,
      ai_summary: aiData.summary || null,
      urgency: aiData.urgency || null,
      category: aiData.category || null,
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({ success: true });

  } catch (error: unknown) {
    console.error("Support API error:", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
