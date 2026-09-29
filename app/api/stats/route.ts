import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    stats: {
      eventsToday: 14,
      rawVideoUploadedBytes: 0,
      identitiesStored: 0,
      localInferencePercentage: 94,
      avgLatencyMs: 14.2,
    },
  });
}
