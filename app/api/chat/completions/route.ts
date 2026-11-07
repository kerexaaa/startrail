import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.MY_SECRET_TOKEN}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const openai = new OpenAI({
      baseURL: process.env.CHINESE_API_BASE_URL, 
      apiKey: process.env.CHINESE_API_KEY,       
    });

    const body = await req.json();

    const response = await openai.chat.completions.create({
      model: body.model || 'minimax-m3.1-flash',
      messages: body.messages,
      stream: body.stream,
      temperature: body.temperature ?? 0.7,
    });

    if (body.stream) {
      return new Response((response as any).toReadableStream(), {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    return NextResponse.json(response, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
