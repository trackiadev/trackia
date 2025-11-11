import { NextResponse } from 'next/server';
import { sendTestEmail } from '@/lib/email';

export async function POST() {
  try {
    const response = await sendTestEmail('trackia.dev@gmail.com'); // ton email
    return NextResponse.json({ success: true, data: response });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
