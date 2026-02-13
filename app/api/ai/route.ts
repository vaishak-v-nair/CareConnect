import { NextResponse } from "next/server";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET() {
  await addDoc(collection(db, "test_collection"), {
    message: "Connected successfully",
    createdAt: new Date(),
  });

  return NextResponse.json({ success: true });
}