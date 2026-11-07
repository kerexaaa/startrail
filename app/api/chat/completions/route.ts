import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.MY_SECRET_TOKEN}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    const aiResponse = await fetch(`${process.env.CHINESE_API_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CHINESE_API_KEY}`
      },
      body: JSON.stringify({
        model: body.model || 'minimax-m3.1-flash',
        messages: body.messages,
        stream: body.stream,
        temperature: body.temperature ?? 0.7,
      })
    });

    return new Response(aiResponse.body, {
      status: aiResponse.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': aiResponse.headers.get('Content-Type') || 'application/json',
      }
    });

  } catch (error) {
    console.error('Ошибка API:', error);
    return NextResponse.json({ error: 'Internal Proxy Error' }, { status: 500 });
  }
}
