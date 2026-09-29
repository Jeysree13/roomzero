import { NextResponse } from "next/server";
import { AIEvent } from "@/types";

// Lightweight in-memory persistence store for hackathon demo
let eventStore: AIEvent[] = [
  {
    id: "evt-001",
    type: "Person entered",
    severity: "info",
    confidence: 0.96,
    timestamp: "19:02:11",
    localInference: true,
    rawMediaStored: false,
    source: "Snapdragon NPU",
  },
  {
    id: "evt-002",
    type: "Normal activity",
    severity: "info",
    confidence: 0.91,
    timestamp: "19:17:42",
    localInference: true,
    rawMediaStored: false,
    source: "Snapdragon NPU",
  },
  {
    id: "evt-003",
    type: "Fall-like posture detected",
    severity: "critical",
    confidence: 0.88,
    timestamp: "19:21:03",
    localInference: true,
    rawMediaStored: false,
    source: "Snapdragon NPU",
  },
];

export async function GET() {
  return NextResponse.json({ success: true, events: eventStore });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newEvent: AIEvent = {
      id: `evt-${Date.now()}`,
      type: body.type || "Unknown Event",
      severity: body.severity || "info",
      confidence: body.confidence || 0.9,
      timestamp: new Date().toLocaleTimeString(),
      localInference: true,
      rawMediaStored: false,
      source: "Snapdragon NPU",
    };

    eventStore.unshift(newEvent);
    if (eventStore.length > 50) eventStore.pop();

    return NextResponse.json({ success: true, event: newEvent });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid payload" }, { status: 400 });
  }
}
