import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  const { email, tone } = await req.json();

  const prompt = `Write a ${tone} reply to the following email:\n\n"${email}"`;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

    // ✅ Use the latest supported model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Gemini fetch error:", error);
    return NextResponse.json({ reply: "Error: Could not connect to Gemini API." });
  }
}
