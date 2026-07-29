import { Schema, model, type Document, type Model, type Types } from "mongoose";
import {
  AUDIT_ACTIONS,
  AUDIT_ENTITY_TYPES,
  type AuditAction,
  type AuditEntityType,
} from "../utils/constants";

export interface AuditLogDocument extends Document {
  _id: Types.ObjectId;
  adminId: Types.ObjectId;
  action: AuditAction;
  entityType: AuditEntityType;
  entityId?: Types.ObjectId;
  metadata: Record<string, unknown>;
  ipAddress?: string;
  createdAt: Date;
}

const auditLogSchema = new Schema<AuditLogDocument>(
  {
    adminId: { type: Schema.Types.ObjectId, ref: "Admin", required: true, index: true },
    action: { type: String, enum: AUDIT_ACTIONS, required: true, index: true },
    entityType: { type: String, enum: AUDIT_ENTITY_TYPES, required: true },
    entityId: { type: Schema.Types.ObjectId },
    metadata: { type: Schema.Types.Mixed, default: {} },
    ipAddress: { type: String },
  },
  // Audit entries are append-only; an updatedAt would imply they can be edited.
  { timestamps: { createdAt: true, updatedAt: false } },
);

auditLogSchema.index({ createdAt: -1 });

export const AuditLog: Model<AuditLogDocument> = model<AuditLogDocument>(
  "AuditLog",
  auditLogSchema,
);
