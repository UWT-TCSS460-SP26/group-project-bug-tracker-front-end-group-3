import type { ErrorMessage, Issue, IssueCreateRequest } from "@/types/issue";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://group-project-backend-group-3-1.onrender.com";

const REQUEST_TIMEOUT_MS = 60_000;

export type CreateIssueResult =
  | { ok: true; issue: Issue }
  | { ok: false; kind: "bad_request" | "server"; message: string };

async function parseErrorMessage(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as Partial<ErrorMessage>;
    if (typeof body.error === "string" && body.error.trim()) {
      return body.error;
    }
  } catch {
    // Response body was not JSON.
  }

  return "Server unavailable. Try again later.";
}

export async function createIssue(
  payload: IssueCreateRequest,
): Promise<CreateIssueResult> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_BASE_URL}/issues`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (response.status === 201 || response.status === 200) {
      const issue = (await response.json()) as Issue;
      return { ok: true, issue };
    }

    if (response.status === 400) {
      return {
        ok: false,
        kind: "bad_request",
        message: await parseErrorMessage(response),
      };
    }

    return {
      ok: false,
      kind: "server",
      message: "Server unavailable. Try again later.",
    };
  } catch {
    return {
      ok: false,
      kind: "server",
      message: "Server unavailable. Try again later.",
    };
  } finally {
    clearTimeout(timeoutId);
  }
}
