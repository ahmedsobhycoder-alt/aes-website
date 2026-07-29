export const ADMIN_ROLES = ["super-admin", "editor", "viewer"] as const;
export type AdminRole = (typeof ADMIN_ROLES)[number];

export const PROJECT_STATUSES = ["draft", "published", "archived"] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

/** Lead taxonomy — mirrors the AES qualification enquiry form. */
export const LEAD_PROJECT_TYPES = [
  "signature-fnb",
  "high-end-commercial",
  "elite-private-residence",
  "monumental-architecture",
] as const;
export type LeadProjectType = (typeof LEAD_PROJECT_TYPES)[number];

export const LEAD_PROJECT_SCALES = ["under-5000", "5000-10000", "over-10000"] as const;
export type LeadProjectScale = (typeof LEAD_PROJECT_SCALES)[number];

export const LEAD_DESIGN_PHILOSOPHIES = [
  "experiential-bold",
  "haute-couture",
  "structural-sovereignty",
] as const;
export type LeadDesignPhilosophy = (typeof LEAD_DESIGN_PHILOSOPHIES)[number];

export const LEAD_TIMELINES = [
  "immediate-curation",
  "ongoing-development",
  "2027-legacy",
] as const;
export type LeadTimeline = (typeof LEAD_TIMELINES)[number];

export const LEAD_PROJECT_ZONES = [
  "Sheikh Zayed / West Cairo",
  "Golden Square / New Cairo",
  "North Coast / Marassi",
  "New Administrative Capital",
] as const;
export type LeadProjectZone = (typeof LEAD_PROJECT_ZONES)[number];

export const LEAD_STATUSES = [
  "new",
  "contacted",
  "qualified",
  "consultation-booked",
  "proposal-sent",
  "won",
  "rejected",
  "archived",
] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

/** Statuses that count as "qualified" on the dashboard. */
export const QUALIFIED_LEAD_STATUSES: readonly LeadStatus[] = [
  "qualified",
  "consultation-booked",
  "proposal-sent",
  "won",
];

export const AUDIT_ACTIONS = [
  "auth.login",
  "project.create",
  "project.update",
  "project.publish",
  "project.unpublish",
  "project.archive",
  "project.delete",
  "lead.status-update",
  "lead.update",
  "lead.archive",
  "settings.update",
  "settings.statistics-update",
  "admin.create",
  "admin.update",
  "admin.status-change",
] as const;
export type AuditAction = (typeof AUDIT_ACTIONS)[number];

export const AUDIT_ENTITY_TYPES = [
  "Admin",
  "Project",
  "Lead",
  "SiteSettings",
] as const;
export type AuditEntityType = (typeof AUDIT_ENTITY_TYPES)[number];
