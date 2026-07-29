import dotenv from "dotenv";
import mongoose from "mongoose";
import { z } from "zod";
import { Admin } from "../src/models/Admin";

dotenv.config();

/**
 * Creates the first super-admin from environment variables.
 * Values are never hardcoded and the script refuses to overwrite an existing account.
 */
const seedSchema = z.object({
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  ADMIN_NAME: z.string().min(2, "ADMIN_NAME must be at least 2 characters"),
  ADMIN_EMAIL: z.string().email("ADMIN_EMAIL must be a valid email address"),
  ADMIN_PASSWORD: z
    .string()
    .min(10, "ADMIN_PASSWORD must be at least 10 characters")
    .regex(/[a-z]/, "ADMIN_PASSWORD must contain a lowercase letter")
    .regex(/[A-Z]/, "ADMIN_PASSWORD must contain an uppercase letter")
    .regex(/\d/, "ADMIN_PASSWORD must contain a number"),
});

async function seed() {
  const parsed = seedSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("\n✗ Seed aborted — invalid configuration:\n");
    for (const issue of parsed.error.issues) {
      console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
    }
    console.error(
      "\nSet ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD in backend/.env, then re-run.\n",
    );
    process.exit(1);
  }

  const { MONGODB_URI, ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = parsed.data;

  await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 10_000 });

  const email = ADMIN_EMAIL.toLowerCase().trim();
  const existing = await Admin.findOne({ email });

  if (existing) {
    console.log(
      `\n! An administrator with ${email} already exists (role: ${existing.role}).\n` +
        "  No changes were made. Delete the account first if you need to reseed.\n",
    );
    await mongoose.connection.close();
    process.exit(0);
  }

  // The pre-save hook hashes the password; it is never stored or logged in clear.
  const admin = await Admin.create({
    name: ADMIN_NAME,
    email,
    password: ADMIN_PASSWORD,
    role: "super-admin",
    isActive: true,
  });

  console.log(
    `\n✓ Super-admin created\n  name:  ${admin.name}\n  email: ${admin.email}\n  role:  ${admin.role}\n\n` +
      "  Sign in at /admin/login. Remove ADMIN_PASSWORD from .env afterwards.\n",
  );

  await mongoose.connection.close();
  process.exit(0);
}

seed().catch(async (error) => {
  console.error("\n✗ Seed failed:", error instanceof Error ? error.message : error, "\n");
  await mongoose.connection.close().catch(() => undefined);
  process.exit(1);
});
