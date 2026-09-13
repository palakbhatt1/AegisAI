export type IncidentSeverity = "low" | "medium" | "high" | "critical";

export type IncidentStatus =
    | "Open"
    | "Approved"
    | "Rejected"
    | "Resolved"
    | "Mitigated"
    | "Closed"
    | string;

export interface Incident {
    incident_id: string;
    timestamp?: string;
    severity: IncidentSeverity | string;
    failure_type: string;
    root_cause: string;
    evidence?: any;
    suggested_fix?: string;
    status?: IncidentStatus;
    proposed_github_issue_title?: string;
    proposed_github_issue_body?: string;
    github_issue_number?: number;
    github_issue_url?: string;
    action_note?: string;
    resolution?: string;
}

export interface DispatchResult {
    slack: "success" | "failed";
    github: "success" | "failed";
    sheets: "success" | "failed";
    details?: {
        slack?: any;
        github?: any;
        sheets?: any;
    };
}
