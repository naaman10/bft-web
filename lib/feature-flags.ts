/**
 * Feature flags (read `NEXT_PUBLIC_*` at build time in the client bundle).
 *
 * Subjects (`/subjects/*` + nav): default **on**. Set `NEXT_PUBLIC_FEATURE_SUBJECTS=false`
 * or `0` to hide subject pages and the Subjects nav item.
 */
export function isSubjectsFeatureEnabled(): boolean {
  const v = process.env.NEXT_PUBLIC_FEATURE_SUBJECTS?.trim().toLowerCase();
  if (v === "false" || v === "0") return false;
  return true;
}
