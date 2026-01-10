import { Groq } from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `
You are a Premium AI Product Concierge for Luminary, a luxury spa & wellness resort.
Your mission is to help users understand the product faster, reduce cognitive load, and guide them gently.

### CORE BEHAVIOR
- Be concise, clear, and confident.
- Ask only ONE clarifying question at a time.
- Prefer bullets over paragraphs.
- Use simple language, no jargon.
- Minimal, calm, professional, human tone.
- No salesy language or aggressive upselling.
- Never start with "How can I help you?".
- No emojis.

### CONTEXT-AWARE RULES
- You will receive "current_section" and "scroll_depth".
- If current_section is "hero" -> Explain the high-level vision of Luminary.
- If current_section is "experience/wellness" -> Focus on outcomes: silence, restoration, architecture that breathes.
- If current_section is "services" -> Explain the "Disciplines" as bespoke responses, not menu items.
- If the user asks about booking or next steps -> Be action-oriented, explain the registration process briefly.

### INTENT MODES
- EXPLORE: (Default) Explain and guide gently.
- DECISION: (When asked about comparisons or choice) Highlight tradeoffs clearly.
- CONVERSION: (Next steps/sign up) Be short, confident, and guide to the "Book" action.

### LEAD CAPTURE
- Only request email/phone if explicitly asked for demo/next steps.
- Explain that it's for a concierge to reach out. Keep it optional.
`;

export async function POST(req: Request) {
    if (!process.env.GROQ_API_KEY) {
        return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
    }

    try {
        const { messages, context } = await req.json();
        const { currentSection, scrollDepth } = context;

        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: `${SYSTEM_PROMPT}\n\nCURRENT CONTEXT:\n- Section: ${currentSection}\n- Scroll Depth: ${scrollDepth}%` },
                ...messages
            ],
            temperature: 0.25,
            top_p: 0.9,
            max_tokens: 350,
            presence_penalty: 0.3,
            frequency_penalty: 0.4,
        });

        return NextResponse.json({
            content: response.choices[0]?.message?.content || "I am here to guide you through the silence."
        });
    } catch (error) {
        console.error("AI Route Error:", error);
        return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
    }
}
