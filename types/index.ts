export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Detection {
  id: string;
  type: string;
  confidence: number;
  timestamp: string;
  bbox?: BoundingBox;
}

export type EventSeverity = "info" | "warning" | "critical";

export interface AIEvent {
  id: string;
  type: string;
  severity: EventSeverity;
  confidence: number;
  timestamp: string;
  localInference: boolean;
  rawMediaStored: boolean;
  source: string;
}

export interface InferenceResult {
  detections: Detection[];
  events: AIEvent[];
  inferenceTimeMs: number;
  provider: "local-demo" | "qualcomm-ai-hub";
  peopleCount: number;
  objectCount: number;
  roomStatus: "NORMAL" | "WARNING" | "CRITICAL";
  currentEventDesc: string;
}

export interface LocalInferenceProvider {
  detect(frameData?: ImageData | null): Promise<InferenceResult>;
}

export interface RoomStats {
  eventsToday: number;
  rawVideoUploadedBytes: number;
  identitiesStored: number;
  localInferencePercentage: number;
  avgLatencyMs: number;
}
