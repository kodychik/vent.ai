import { NextRequest, NextResponse } from 'next/server';
import PipelineSingleton from './pipeline';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const text = request.nextUrl.searchParams.get('text');

  if (!text) {
    return NextResponse.json({ error: 'Missing text parameter' }, { status: 400 });
  }

  try {
    const classifier = await PipelineSingleton.getInstance();
    const result = await classifier(text);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error during inference:', error);
    return NextResponse.json({ error: 'Inference failed' }, { status: 500 });
  }
}
