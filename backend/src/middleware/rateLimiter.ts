import rateLimit from "express-rate-limit";

const json = {
  standardHeaders: true,
  legacyHeaders: false,
};

/** Login is the credential-stuffing target; keep this tight. */
export const loginLimiter = rateLimit({
  ...json,
  windowMs: 15 * 60_000,
  limit: 10,
  skipSuccessfulRequests: true,
  message: { success: false, message: "Too many login attempts. Try again later." },
});

/** The public enquiry form is unauthenticated, so it is the spam surface. */
export const publicSubmitLimiter = rateLimit({
  ...json,
  windowMs: 60 * 60_000,
  limit: 20,
  message: {
    success: false,
    message: "Too many submissions from this address. Please try again later.",
  },
});

/** Broad backstop for everything else. */
export const generalLimiter = rateLimit({
  ...json,
  windowMs: 15 * 60_000,
  limit: 600,
  message: { success: false, message: "Too many requests. Please slow down." },
});
