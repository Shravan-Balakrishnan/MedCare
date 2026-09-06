import { NextRequest, NextResponse } from 'next/server';

// ─────────────────────────────────────────────────────────────────────────────
// Mukundan Unni — the dramatic Kerala advocate AI persona
// ─────────────────────────────────────────────────────────────────────────────

const MUKUNDAN_SYSTEM_PROMPT = `You are Advocate Mukundan Unni Associates, a flamboyant, brilliant, and theatrical Kerala High Court advocate. You are talking to your client Dashamoolam Dhamu — a lovable, confused, ordinary man from Kerala who has medical-legal questions.

Your personality:
- You are dramatic, passionate, and deeply knowledgeable about Indian medical law
- You speak in a mix of English and Malayalam (use Malayalam words naturally sprinkled in)
- You call Dhamu by name regularly ("Dhamu etta", "Dhamu saare", "enthada Dhamu")
- You are both stern about legal consequences AND supportive when the patient is in the right
- You cite actual Indian laws: Consumer Protection Act 2019, Clinical Establishments Act, MCI regulations, IPC sections, Indian Medical Council Act, RTI Act, Patient Rights Charter etc.
- You explain both RISKS (what can go wrong legally) and RIGHTS (what the patient is entitled to)
- You are theatrical — use phrases like "Ee court il...", "Niyamam parayunnu...", "Kanikkatte Dhamu..."
- You give practical, actionable advice
- Keep responses under 200 words but make them punchy and memorable
- Always end with one clear action item or legal tip for Dhamu

Context: Dhamu is asking about medico-legal rights — things like medical negligence, hospital bills, consent forms, medical records access, second opinions, insurance claims, discharge against medical advice, etc.

Start responses directly without lengthy intros. Be dramatic but genuinely helpful.`;

async function callGroq(userMessage: string): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey || apiKey === 'your_groq_api_key_here') {
    throw new Error('GROQ_API_KEY not configured');
  }

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || 'llama3-70b-8192',
      messages: [
        { role: 'system', content: MUKUNDAN_SYSTEM_PROMPT },
        { role: 'user', content: userMessage },
      ],
      max_tokens: 400,
      temperature: 0.85,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Groq error: ${err}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content ?? 'Kshaminikku Dhamu, oru samayam varatte...';
}

async function callModelScope(userMessage: string): Promise<string> {
  const apiKey = process.env.MODEL_API_KEY;
  if (!apiKey || apiKey === 'your_modelscope_token_here') {
    throw new Error('MODEL_API_KEY not configured');
  }

  const response = await fetch(`${process.env.MODEL_API_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.MODEL_NAME || 'Qwen/Qwen2.5-72B-Instruct',
      messages: [
        { role: 'system', content: MUKUNDAN_SYSTEM_PROMPT },
        { role: 'user', content: userMessage },
      ],
      max_tokens: 400,
      temperature: 0.85,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`ModelScope error: ${err}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content ?? 'Kshaminikku Dhamu...';
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    let reply: string;

    // Try Groq first, fall back to ModelScope
    try {
      reply = await callGroq(message);
    } catch (groqErr) {
      console.warn('Groq failed, trying ModelScope:', groqErr);
      try {
        reply = await callModelScope(message);
      } catch (msErr) {
        console.error('Both providers failed:', msErr);
        // Fallback mock response for demo
        reply = `Dhamu saare! Ningalude chodyam valare nallathanu! 

Indian Medical law parayunnu: Consumer Protection Act 2019 anusaricchu, oru rogi ennum hospital-il proper treatment receive cheyyaan right undu. Medical negligence ullappol, district consumer forum-il complaint file cheyyan kazhiyum — court fees illa! 

⚖️ Legal Action: Innu thanne ningalude doctor-ude full treatment records RTI vazhi request cheyyuka. Ee oru step thanne valare important aanu Dhamu!`;
      }
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error('Medico-legal API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
