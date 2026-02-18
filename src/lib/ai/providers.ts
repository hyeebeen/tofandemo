import { createDeepSeek } from "@ai-sdk/deepseek";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import type { LanguageModel } from "ai";

// DeepSeek (优先级最高)
const deepseek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY,
});

// Kimi (Moonshot)
const kimi = createOpenAICompatible({
  name: "kimi",
  baseURL: "https://api.moonshot.cn/v1",
  apiKey: process.env.KIMI_API_KEY,
});

// Qwen (通义千问)
const qwen = createOpenAICompatible({
  name: "qwen",
  baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
  apiKey: process.env.QWEN_API_KEY,
});

// MiniMax
const minimax = createOpenAICompatible({
  name: "minimax",
  baseURL: "https://api.minimax.chat/v1",
  apiKey: process.env.MINIMAX_API_KEY,
});

interface ProviderConfig {
  envKey: string;
  getModel: () => LanguageModel;
}

const providers: ProviderConfig[] = [
  {
    envKey: "DEEPSEEK_API_KEY",
    getModel: () => deepseek("deepseek-chat"),
  },
  {
    envKey: "KIMI_API_KEY",
    getModel: () => kimi("moonshot-v1-auto"),
  },
  {
    envKey: "QWEN_API_KEY",
    getModel: () => qwen("qwen-plus"),
  },
  {
    envKey: "MINIMAX_API_KEY",
    getModel: () => minimax("abab6.5s-chat"),
  },
];

export function getModel(): LanguageModel {
  for (const provider of providers) {
    if (process.env[provider.envKey]) {
      return provider.getModel();
    }
  }
  throw new Error(
    "No AI provider configured. Set at least one API key: DEEPSEEK_API_KEY, KIMI_API_KEY, QWEN_API_KEY, or MINIMAX_API_KEY"
  );
}
