export async function getAISummary(description: string) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `
You are a healthcare triage assistant.
Return ONLY valid JSON with this exact format:

{
  "summary": "short patient summary",
  "urgency": "LOW | MEDIUM | HIGH",
  "category": "GENERAL | EMERGENCY | PEDIATRIC | CARDIAC | OTHER"
}

No explanation. No text. Only JSON.
`,
        },
        {
          role: "user",
          content: description,
        },
      ],
      temperature: 0.2,
    }),
  });

  const data = await response.json();

  const raw = data.choices?.[0]?.message?.content;

  if (!raw) {
    throw new Error("No AI response");
  }

  try {
    const parsed = JSON.parse(raw);

    return {
      summary: parsed.summary || null,
      urgency: parsed.urgency || null,
      category: parsed.category || null,
    };
  } catch {
    console.error("AI returned invalid JSON:", raw);

    return {
      summary: "AI processing completed",
      urgency: null,
      category: null,
    };
  }
}
