import bcrypt from "bcryptjs";
import { Schema, model, type Document, type Model, type Types } from "mongoose";
import { ADMIN_ROLES, type AdminRole } from "../utils/constants";

export interface AdminDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: AdminRole;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

const adminSchema = new Schema<AdminDocument>(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    // `select: false` keeps the hash out of every query result by default, so a
    // forgotten `.select()` cannot leak it through an API response.
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ADMIN_ROLES, default: "viewer", required: true },
    isActive: { type: Boolean, default: true },
    lastLoginAt: { type: Date },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        delete (ret as Record<string, unknown>).password;
        delete (ret as Record<string, unknown>).__v;
        return ret;
      },
    },
  },
);

adminSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

adminSchema.methods.comparePassword = function comparePassword(
  candidate: string,
): Promise<boolean> {
  return bcrypt.compare(candidate, this.password);
};

export const Admin: Model<AdminDocument> = model<AdminDocument>("Admin", adminSchema);
