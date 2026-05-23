import { redis } from "../core/redis/connection";

export const createSession = async (userId: string): Promise<string> => {
  const sessionID = crypto.randomUUID();
  await redis.set(`sessionID:${sessionID}`, userId, {
    EX: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  return sessionID;
};
