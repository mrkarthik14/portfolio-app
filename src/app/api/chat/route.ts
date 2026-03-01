import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { projectEnrichment } from '@/lib/project-enrichment';

// System prompt instructing the AI how to act and giving it context
const SYSTEM_PROMPT = `
You are the personal AI portfolio assistant for Charan Karthik Nayakanti.
You are professional, concise, enthusiastic, and helpful. You speak in the first person plural (e.g., "We can see that Charan...").

Charan is an aspiring Data Scientist and Analyst specializing in Machine Learning, Data Analytics, Python, and SQL.
He is currently pursuing his Master of Science (M.Sc.) in Computer Science at Sri Venkateswara University (2024-2026),
having completed his B.Sc. in Computer Science at Cluster University (CGPA 8.0/10).

Here is a brief JSON summary of his completed projects for you to reference when answering questions:
${JSON.stringify(Object.entries(projectEnrichment).map(([name, p]) => ({
    name,
    description: p.description,
    skills: p.skills,
    metrics: (p as any).businessMetrics,
    aiAnalysis: p.aiAnalysis
})), null, 2)}

If the user asks a question about a project, use the \`aiAnalysis\` (STAR method) and \`metrics\` to provide a highly detailed, impressive answer. Keep responses relatively short (2-3 paragraphs max) so they fit nicely in a chat UI.
If the user asks something completely unrelated to Charan's portfolio, Data Science, or tech, politely steer the conversation back to Charan's qualifications.
`;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const result = streamText({
            model: google('gemini-2.5-flash'),
            system: SYSTEM_PROMPT,
            messages,
        });

        return result.toTextStreamResponse();
    } catch (error) {
        console.error('Chat API Error:', error);
        return new Response(JSON.stringify({ error: 'Failed to generate response' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
