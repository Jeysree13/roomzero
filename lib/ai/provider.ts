import { LocalInferenceProvider, InferenceResult } from "@/types";

export abstract class BaseInferenceProvider implements LocalInferenceProvider {
  abstract detect(frameData?: ImageData | null): Promise<InferenceResult>;
}
