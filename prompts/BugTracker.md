# Bug Tracker — POST /issues

Documentation extracted from `openapi.yaml` for creating bug reports.

## API context

- **Title:** TCSS 460 — Group 3 API
- **Version:** 0.1.0

### Servers

| URL                                                    | Description               |
| ------------------------------------------------------ | ------------------------- |
| `https://group-project-backend-group-3-1.onrender.com` | Deployed server on Render |
| `http://localhost:3000`                                | Local development         |

### Tag: Issues

**Description:** Bug reporting endpoints

---

## POST /issues

**Summary:** Create a bug report

**Description:** Creates a new issue entry used for bug reporting.

**Authentication:** Not required (no `security` block is defined for this operation).

### Request body

**Required:** Yes  
**Content-Type:** `application/json`  
**Schema:** `IssueCreateRequest`

#### IssueCreateRequest

| Field         | Type   | Required | Description                                                                       |
| ------------- | ------ | -------- | --------------------------------------------------------------------------------- |
| `issueStatus` | string | Yes      | Current bug lifecycle status. One of: `OPEN`, `IN_PROGRESS`, `RESOLVED`, `CLOSED` |
| `issueDesc`   | string | Yes      | Human-readable bug description                                                    |

**Example request body:**

```json
{
  "issueStatus": "OPEN",
  "issueDesc": "Search endpoint throws 500 on empty query."
}
```

### Responses

#### 201 — Issue created successfully

**Content-Type:** `application/json`  
**Schema:** `Issue`

#### Issue (response)

| Field             | Type               | Required | Description                                            |
| ----------------- | ------------------ | -------- | ------------------------------------------------------ |
| `issueID`         | integer            | Yes      | Unique issue identifier                                |
| `issueStatus`     | string             | Yes      | One of: `OPEN`, `IN_PROGRESS`, `RESOLVED`, `CLOSED`    |
| `issueDesc`       | string             | Yes      | Bug description                                        |
| `issueReportDate` | string (date-time) | Yes      | Issue creation timestamp in UTC (ISO-8601; `Z` suffix) |

**Example response body:**

```json
{
  "issueID": 1,
  "issueStatus": "OPEN",
  "issueDesc": "Search endpoint throws 500 on empty query.",
  "issueReportDate": "2026-04-30T23:26:42.123Z"
}
```

#### 400 — Invalid issue payload

**Content-Type:** `application/json`  
**Schema:** `ErrorMessage`

| Example             | Error message                                                     |
| ------------------- | ----------------------------------------------------------------- |
| Invalid status      | `issueStatus must be one of: OPEN, IN_PROGRESS, RESOLVED, CLOSED` |
| Missing description | `issueDesc is required`                                           |

#### 500 — Server error

**Content-Type:** `application/json`  
**Schema:** `ErrorMessage`

### ErrorMessage schema

Used for `400` and `500` responses.

| Field   | Type   | Required | Description                                |
| ------- | ------ | -------- | ------------------------------------------ |
| `error` | string | Yes      | Human-readable error message from this API |

**Example:**

```json
{
  "error": "Something went wrong"
}
```
