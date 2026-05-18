"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { createIssue } from "@/lib/api";
import { DEFAULT_ISSUE_STATUS } from "@/types/issue";
import LoadingSpinner from "@/components/LoadingSpinner";

type FieldErrors = {
  issueDesc?: string;
};

export default function BugReportForm() {
  const issueDescRef = useRef<HTMLTextAreaElement>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formMessage, setFormMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (formMessage && messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
      messageRef.current.focus();
    }
  }, [formMessage]);

  function getIssueDesc(): string {
    return issueDescRef.current?.value ?? "";
  }

  function validate(): FieldErrors {
    const errors: FieldErrors = {};

    if (!getIssueDesc().trim()) {
      errors.issueDesc = "Please describe the bug you saw.";
    }

    return errors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormMessage(null);

    const errors = validate();
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const issueDesc = getIssueDesc().trim();
    setIsSubmitting(true);

    const result = await createIssue({
      issueStatus: DEFAULT_ISSUE_STATUS,
      issueDesc,
    });

    setIsSubmitting(false);

    if (result.ok) {
      if (issueDescRef.current) {
        issueDescRef.current.value = "";
      }
      setFieldErrors({});
      setFormMessage({
        type: "success",
        text: "Thank you! Your bug report was submitted.",
      });
      return;
    }

    setFormMessage({ type: "error", text: result.message });
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex w-full max-w-xl flex-col items-center gap-6"
    >
      <div className="futuristic-input-wrap flex w-full flex-col items-center gap-2">
        <textarea
          ref={issueDescRef}
          id="issueDesc"
          name="issueDesc"
          defaultValue=""
          rows={6}
          aria-label="Please include what you expected, what happened, and steps to reproduce if you can."
          aria-invalid={Boolean(fieldErrors.issueDesc)}
          aria-describedby={
            fieldErrors.issueDesc ? "issueDesc-error" : undefined
          }
          placeholder="Please include what you expected, what happened, and steps to reproduce if you can."
          disabled={isSubmitting}
          className="futuristic-input w-full resize-y rounded-sm px-4 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-60"
        />
        {fieldErrors.issueDesc ? (
          <p
            id="issueDesc-error"
            className="text-center text-base font-medium text-white"
          >
            {fieldErrors.issueDesc}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="futuristic-btn flex h-12 min-w-[220px] items-center justify-center gap-2 rounded-sm px-8 text-sm font-semibold"
      >
        {isSubmitting ? (
          <>
            <LoadingSpinner label="Submitting bug report" />
            Submitting...
          </>
        ) : (
          "Submit bug report"
        )}
      </button>

      {isSubmitting ? (
        <div
          role="status"
          aria-live="polite"
          className="form-status-submitting flex w-full items-center justify-center gap-3 rounded-sm border border-zinc-700/60 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-300"
        >
          <LoadingSpinner className="h-4 w-4" label="Processing submission" />
          <span>Submitting your bug report. Please wait...</span>
        </div>
      ) : null}

      {formMessage ? (
        <div
          ref={messageRef}
          tabIndex={-1}
          role="alert"
          aria-live="assertive"
          className={
            formMessage.type === "success"
              ? "form-message-success w-full rounded-sm border border-emerald-500/50 bg-emerald-950/50 px-4 py-4 text-center text-base font-medium text-emerald-200"
              : "form-message-error w-full rounded-sm border border-zinc-600/60 bg-zinc-950/80 px-4 py-4 text-center text-base font-medium text-zinc-300"
          }
        >
          {formMessage.text}
        </div>
      ) : null}
    </form>
  );
}
