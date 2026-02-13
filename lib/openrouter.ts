export const getAISummary = async (description: string) => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "CareConnect",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
You are a healthcare triage assistant for an NGO.

Your job:
1. Summarize the patient request in 2 short sentences.
2. Classify urgency strictly as: LOW, MEDIUM, HIGH.
3. Classify category strictly as:
   GENERAL, EMERGENCY, MENTAL_HEALTH, ELDERLY, CHILDCARE.

Return ONLY valid JSON.
Format:
{
  "summary": "",
  "urgency": "",
  "category": ""
}
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

    const text = data.choices?.[0]?.message?.content;

    try {
      return JSON.parse(text);
    } catch {
      return {
        summary: "AI parsing failed",
        urgency: "UNKNOWN",
        category: "GENERAL",
      };
    }
  } catch (error) {
    console.error("OpenRouter error:", error);

    return {
      summary: null,
      urgency: null,
      category: null,
    };
  }
};
