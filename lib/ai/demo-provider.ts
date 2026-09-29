import { LocalInferenceProvider, InferenceResult, AIEvent, Detection } from "@/types";

export class DemoInferenceProvider implements LocalInferenceProvider {
  private step = 0;
  private sequence = [
    { status: "NORMAL", event: "None", count: 1, severity: "info", conf: 0.95 },
    { status: "NORMAL", event: "Person entered", count: 2, severity: "info", conf: 0.96 },
    { status: "NORMAL", event: "Normal activity", count: 2, severity: "info", conf: 0.91 },
    { status: "WARNING", event: "Unusual inactivity", count: 1, severity: "warning", conf: 0.84 },
    { status: "CRITICAL", event: "Fall-like posture detected", count: 1, severity: "critical", conf: 0.88 },
    { status: "CRITICAL", event: "Alert generated", count: 1, severity: "critical", conf: 0.99 },
  ];

  async detect(frameData?: ImageData | null): Promise<InferenceResult> {
    const current = this.sequence[this.step % this.sequence.length];
    this.step++;

    const now = new Date().toLocaleTimeString();
    const mockDetections: Detection[] = Array.from({ length: current.count }).map((_, i) => ({
      id: `det-${Date.now()}-${i}`,
      type: "person",
      confidence: current.conf,
      timestamp: now,
      bbox: { x: 50 + i * 120, y: 100, width: 80, height: 180 },
    }));

    const mockEvents: AIEvent[] = current.event !== "None" ? [{
      id: `evt-${Date.now()}`,
      type: current.event,
      severity: current.severity as any,
      confidence: current.conf,
      timestamp: now,
      localInference: true,
      rawMediaStored: false,
      source: "Snapdragon NPU Simulation"
    }] : [];

    return {
      detections: mockDetections,
      events: mockEvents,
      inferenceTimeMs: Math.floor(Math.random() * 8) + 12, // 12-20ms typical NPU latency
      provider: "local-demo",
      peopleCount: current.count,
      objectCount: current.count + 2,
      roomStatus: current.status as any,
      currentEventDesc: current.event,
    };
  }
}
