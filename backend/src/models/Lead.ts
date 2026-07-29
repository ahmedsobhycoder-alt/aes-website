import { Schema, model, type Document, type Model, type Types } from "mongoose";
import {
  LEAD_DESIGN_PHILOSOPHIES,
  LEAD_PROJECT_SCALES,
  LEAD_PROJECT_TYPES,
  LEAD_PROJECT_ZONES,
  LEAD_STATUSES,
  LEAD_TIMELINES,
  type LeadDesignPhilosophy,
  type LeadProjectScale,
  type LeadProjectType,
  type LeadProjectZone,
  type LeadStatus,
  type LeadTimeline,
} from "../utils/constants";

export interface LeadDocument extends Document {
  _id: Types.ObjectId;
  // --- qualification answers (submitted publicly) ---
  projectType: LeadProjectType;
  projectScale: LeadProjectScale;
  designPhilosophy: LeadDesignPhilosophy;
  timeline: LeadTimeline;
  // --- contact ---
  name: string;
  title?: string;
  projectZone: LeadProjectZone;
  phone: string;
  // --- administrative (never exposed publicly) ---
  status: LeadStatus;
  internalNotes: string;
  assignedTo?: Types.ObjectId;
  sourceIp?: string;
  createdAt: Date;
  updatedAt: Date;
}

const leadSchema = new Schema<LeadDocument>(
  {
    projectType: { type: String, enum: LEAD_PROJECT_TYPES, required: true, index: true },
    projectScale: { type: String, enum: LEAD_PROJECT_SCALES, required: true },
    designPhilosophy: {
      type: String,
      enum: LEAD_DESIGN_PHILOSOPHIES,
      required: true,
    },
    timeline: { type: String, enum: LEAD_TIMELINES, required: true },

    name: { type: String, required: true, trim: true, maxlength: 160 },
    title: { type: String, trim: true, maxlength: 160 },
    projectZone: { type: String, enum: LEAD_PROJECT_ZONES, required: true, index: true },
    phone: { type: String, required: true, trim: true, maxlength: 40, index: true },

    status: { type: String, enum: LEAD_STATUSES, default: "new", index: true },
    internalNotes: { type: String, default: "", maxlength: 20_000 },
    assignedTo: { type: Schema.Types.ObjectId, ref: "Admin" },
    /** Recorded for abuse triage only; never returned by any public endpoint. */
    sourceIp: { type: String },
  },
  { timestamps: true },
);

leadSchema.index({ createdAt: -1 });
leadSchema.index({ status: 1, createdAt: -1 });
// Backs the admin free-text search over name / phone.
leadSchema.index({ name: "text", phone: "text" });

export const Lead: Model<LeadDocument> = model<LeadDocument>("Lead", leadSchema);
