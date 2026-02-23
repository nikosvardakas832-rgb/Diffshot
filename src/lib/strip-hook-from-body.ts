/**
 * Strips the hook text from the beginning of the body if it's duplicated.
 * The AI sometimes repeats the hook as the first line of the body.
 */
export function stripHookFromBody(hook: string, body: string): string {
  const trimmedHook = hook.trim();
  const trimmedBody = body.trim();

  if (!trimmedHook || !trimmedBody) return trimmedBody;

  // Check if body starts with the hook text (exact or near match)
  if (trimmedBody.startsWith(trimmedHook)) {
    const rest = trimmedBody.slice(trimmedHook.length).replace(/^\s*\n*/, "");
    return rest;
  }

  // Also check first line specifically
  const firstLineEnd = trimmedBody.indexOf("\n");
  if (firstLineEnd !== -1) {
    const firstLine = trimmedBody.slice(0, firstLineEnd).trim();
    if (firstLine === trimmedHook) {
      return trimmedBody.slice(firstLineEnd + 1).trim();
    }
  }

  return trimmedBody;
}
