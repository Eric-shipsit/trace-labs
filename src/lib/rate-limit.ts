import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const openAiRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 m"), // 5 calls per minute
  analytics: true,
});