export function getErrorMessage(
  error: unknown,
  fallback = "Internal server error",
): string {
  return error instanceof Error && error.message.trim()
    ? error.message
    : fallback;
}
