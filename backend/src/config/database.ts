import mongoose from "mongoose";
import { env, isProduction } from "./env";

export async function connectDatabase(): 
Promise<void> {
    console.log(env.MONGODB_URI);
   console.log("connecting");
  mongoose.set("strictQuery", true);
  // Leaking full documents into logs would expose password hashes.
  mongoose.set("debug", false);
 
  await mongoose.connect(env.MONGODB_URI, {

    serverSelectionTimeoutMS: 10_000,
  });

  if (!isProduction) {
    console.log("[db] connected");
  }else{
    console.log("[db] is not connected");
  }
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.connection.close();
}
