/** Best-effort Postgres / Neon error fields from drivers and wrappers. */
export function getPgErrorInfo(err: unknown): {
  code?: string;
  message: string;
  detail?: string;
} {
  if (!err || typeof err !== "object") {
    return { message: String(err) };
  }
  const e = err as Record<string, unknown>;
  const code = typeof e.code === "string" ? e.code : undefined;
  const message =
    typeof e.message === "string"
      ? e.message
      : err instanceof Error
        ? err.message
        : String(err);
  const detail = typeof e.detail === "string" ? e.detail : undefined;
  return { code, message, detail };
}
