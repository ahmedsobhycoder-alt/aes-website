import { Schema, model, type Document, type Model, type Types } from "mongoose";
import { PROJECT_STATUSES, type ProjectStatus } from "../utils/constants";

export interface GalleryImage {
  url: string;
  alt: string;
  order: number;
}

export interface ProjectDocument extends Document {
  _id: Types.ObjectId;
  title: string;
  slug: string;
  category: string;
  location?: string;
  year?: string;
  shortDescription?: string;
  description?: string;
  coverImage?: string;
  coverImageAlt?: string;
  gallery: GalleryImage[];
  featured: boolean;
  status: ProjectStatus;
  publishedAt?: Date;
  createdBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const gallerySchema = new Schema<GalleryImage>(
  {
    url: { type: String, required: true, trim: true },
    alt: { type: String, default: "", trim: true, maxlength: 300 },
    order: { type: Number, default: 0 },
  },
  { _id: false },
);

const projectSchema = new Schema<ProjectDocument>(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    category: { type: String, required: true, trim: true, maxlength: 120 },
    location: { type: String, trim: true, maxlength: 200 },
    year: { type: String, trim: true, maxlength: 20 },
    shortDescription: { type: String, trim: true, maxlength: 500 },
    description: { type: String, trim: true, maxlength: 20_000 },
    coverImage: { type: String, trim: true },
    coverImageAlt: { type: String, trim: true, maxlength: 300, default: "" },
    gallery: { type: [gallerySchema], default: [] },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: PROJECT_STATUSES, default: "draft", index: true },
    publishedAt: { type: Date },
    createdBy: { type: Schema.Types.ObjectId, ref: "Admin" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "Admin" },
  },
  { timestamps: true },
);

// Public listings always filter on status and sort by recency.
projectSchema.index({ status: 1, publishedAt: -1 });
projectSchema.index({ featured: 1, status: 1 });

export const Project: Model<ProjectDocument> = model<ProjectDocument>(
  "Project",
  projectSchema,
);
