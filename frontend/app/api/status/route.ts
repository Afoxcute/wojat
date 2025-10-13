import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    service: 'wojat-frontend',
    version: '1.0.0',
    status: 'running',
    endpoints: [
      'GET /api/health',
      'GET /api/status',
      'GET /',
      'GET /dashboard',
      'GET /trending-coins',
      'GET /ai-chat',
      'GET /portfolio'
    ],
    features: [
      'Real-time memecoin tracking',
      'AI-powered chat interface',
      'Portfolio management',
      'Social media integration',
      'Voice interaction'
    ]
  });
}
