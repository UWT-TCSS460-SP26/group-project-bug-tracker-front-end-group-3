export const DEFAULT_ISSUE_STATUS = "OPEN" as const;

export const ISSUE_STATUSES = [
  "OPEN",
  "IN_PROGRESS",
  "RESOLVED",
  "CLOSED",
] as const;

export type IssueStatus = (typeof ISSUE_STATUSES)[number];

export type IssueCreateRequest = {
  issueStatus: IssueStatus;
  issueDesc: string;
};

export type Issue = {
  issueID: number;
  issueStatus: IssueStatus;
  issueDesc: string;
  issueReportDate: string;
};

export type ErrorMessage = {
  error: string;
};
