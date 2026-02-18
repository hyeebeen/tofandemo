import { streamText, generateText } from "ai";
import { getModel } from "./providers";

export { getModel } from "./providers";
export { getCachedResponse, setCachedResponse } from "./cache";
export { checkRateLimit, incrementUsage } from "./rate-limit";

export async function generateAIText(prompt: string, system?: string) {
  const model = getModel();
  return generateText({
    model,
    prompt,
    ...(system && { system }),
  });
}

export function streamAIText(prompt: string, system?: string) {
  const model = getModel();
  return streamText({
    model,
    prompt,
    ...(system && { system }),
  });
}
