export async function getAISummary(description: string) {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
You are a medical triage assistant.
Respond ONLY in strict JSON format.

Return:
{
  "summary": "short medical summary",
  "urgency": "LOW | MEDIUM | HIGH",
  "category": "GENERAL | RESPIRATORY | CARDIAC | TRAUMA | OTHER"
}

No explanations.
No extra text.
Only valid JSON.
`,
          },
          {
            role: "user",
            content: description,
          },
        ],
        temperature: 0.3,
      }),
    });

    const data = await response.json();

    const content =
      data?.choices?.[0]?.message?.content || "";

    try {
      const parsed = JSON.parse(content);
      return parsed;
    } catch {
      console.error("AI JSON parsing failed:", content);
      return {
        summary: "AI parsing failed",
        urgency: "LOW",
        category: "GENERAL",
      };
    }
  } catch (error) {
    console.error("OpenRouter error:", error);
    return {
      summary: "AI service unavailable",
      urgency: "LOW",
      category: "GENERAL",
    };
  }
}