import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Basic health check
    const healthStatus: {
      status: string;
      timestamp: string;
      service: string;
      version: string;
      environment: string;
      uptime: number;
      memory: NodeJS.MemoryUsage;
      warnings?: string;
    } = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'Wojat Platform',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
    };

    // Check if required environment variables are present
    const requiredEnvVars = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    ];

    const missingEnvVars = requiredEnvVars.filter(
      (envVar) => !process.env[envVar]
    );

    if (missingEnvVars.length > 0) {
      healthStatus.status = 'degraded';
      healthStatus.warnings = `Missing environment variables: ${missingEnvVars.join(', ')}`;
    }

    return NextResponse.json(healthStatus, {
      status: healthStatus.status === 'healthy' ? 200 : 206,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
