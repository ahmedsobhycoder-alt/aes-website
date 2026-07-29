import { createApp } from "./app";
import { connectDatabase, disconnectDatabase } from "./config/database";
import { env } from "./config/env";

async function bootstrap() {
  try {
    console.log("[boot] connecting to MongoDB");
    await connectDatabase();
  } catch (error) {
    console.error("[boot] could not connect to MongoDB:", error);
    process.exit(1);
  }

  const server = createApp().listen(env.PORT, () => {
    console.log(`[boot] AES admin API listening on http://localhost:${env.PORT}`);
    console.log(`[boot] CORS origin: ${env.FRONTEND_URL}`);
  });

  const shutdown = async (signal: string) => {
    console.log(`\n[shutdown] ${signal} received`);
    server.close(async () => {
      await disconnectDatabase();
      process.exit(0);
    });
  };

  process.on("SIGINT", () => void shutdown("SIGINT"));
  process.on("SIGTERM", () => void shutdown("SIGTERM"));
}

void bootstrap();
