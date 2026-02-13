type AISummary = {
  summary: string;
  urgency: string;
  category: string;
};

const FALLBACK_PARSE_FAILED: AISummary = {
  summary: "AI parsing failed",
  urgency: "LOW",
  category: "GENERAL",
};

const FALLBACK_UNAVAILABLE: AISummary = {
  summary: "AI service unavailable",
  urgency: "LOW",
  category: "GENERAL",
};

function extractJsonObject(text: string): string | null {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  const candidate = fenced?.[1] ?? text;

  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    return null;
  }

  return candidate.slice(start, end + 1);
}

export async function getAISummary(description: string) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error("Missing OPENROUTER_API_KEY");
    return FALLBACK_UNAVAILABLE;
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
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

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("OpenRouter HTTP error:", response.status, errorBody);
      return FALLBACK_UNAVAILABLE;
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content || "";
    const rawContent =
      typeof content === "string"
        ? content
        : Array.isArray(content)
          ? content
              .map((part: { text?: string }) => part?.text || "")
              .join("\n")
          : "";

    try {
      const jsonText = extractJsonObject(rawContent);
      if (!jsonText) {
        throw new Error("No JSON object found in model output");
      }

      const parsed = JSON.parse(jsonText);
      return {
        summary: parsed?.summary || FALLBACK_PARSE_FAILED.summary,
        urgency: parsed?.urgency || FALLBACK_PARSE_FAILED.urgency,
        category: parsed?.category || FALLBACK_PARSE_FAILED.category,
      };
    } catch {
      console.error("AI JSON parsing failed:", rawContent);
      return FALLBACK_PARSE_FAILED;
    }
  } catch (error) {
    console.error("OpenRouter error:", error);
    return FALLBACK_UNAVAILABLE;
  }
}
