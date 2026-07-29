import { Schema, model, type Document, type Model, type Types } from "mongoose";

export interface SiteSettingsDocument extends Document {
  _id: Types.ObjectId;
  statistics: {
    projectsExecuted: number;
    industriesExecuted: number;
    yearsOfExperience: number;
    awards: number;
    countries: number;
  };
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
  };
  socialLinks: {
    instagram: string;
    linkedin: string;
    facebook: string;
  };
  updatedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const siteSettingsSchema = new Schema<SiteSettingsDocument>(
  {
    statistics: {
      projectsExecuted: { type: Number, default: 80, min: 0 },
      industriesExecuted: { type: Number, default: 10, min: 0 },
      yearsOfExperience: { type: Number, default: 0, min: 0 },
      awards: { type: Number, default: 0, min: 0 },
      countries: { type: Number, default: 0, min: 0 },
    },
    contact: {
      email: { type: String, default: "", trim: true },
      phone: { type: String, default: "", trim: true },
      whatsapp: { type: String, default: "", trim: true },
    },
    socialLinks: {
      instagram: { type: String, default: "", trim: true },
      linkedin: { type: String, default: "", trim: true },
      facebook: { type: String, default: "", trim: true },
    },
    updatedBy: { type: Schema.Types.ObjectId, ref: "Admin" },
  },
  { timestamps: true },
);

export const SiteSettings: Model<SiteSettingsDocument> = model<SiteSettingsDocument>(
  "SiteSettings",
  siteSettingsSchema,
);

/**
 * Settings are a singleton. Read paths must never 404 just because nobody has
 * saved the form yet, so the first read creates the defaults.
 */
export async function getOrCreateSettings(): Promise<SiteSettingsDocument> {
  const existing = await SiteSettings.findOne();
  if (existing) return existing;
  return SiteSettings.create({});
}
