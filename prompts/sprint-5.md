# Sprint 5 — Bug Tracker Form (Next.js)

## Goal

Build a single-page Next.js app that allows users to submit bug reports directly to the backend API.

---

## UI Requirements

Create one page:

### `/`

A simple bug report form with:

- Dropdown: issueStatus
  - OPEN
  - IN_PROGRESS
  - RESOLVED
  - CLOSED

- Textarea: issueDesc

- Submit button

---

## Behavior

### On submit:

Call:

POST https://group-project-backend-group-3-1.onrender.com/issues

Payload must match OpenAPI schema in `bugtracker.md`.

---

## Validation Rules (frontend)

- issueStatus is required
- issueDesc is required
- issueDesc must not be empty or whitespace

---

## UX Requirements

### Success:

- Show success message: "Bug report submitted successfully"

### Failure cases:

- Validation error → show inline messages
- API 400 → show returned error message
- API 500 or network error → show: "Server unavailable. Try again later."

---

## Constraints

- No authentication required
- Must follow OpenAPI spec exactly
- Must handle offline/API-down gracefully
