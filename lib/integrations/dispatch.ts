import { notifySlack, updateSlack } from "./slack";
import { createGithubIssue, updateGithubIssue } from "./github";
import { logToSheets, updateIncidentInSheets } from "./sheets";

export interface IntegrationResults {
    slack: "success" | "failed";
    github: "success" | "failed";
    sheets: "success" | "failed";
    details?: {
        slack?: any;
        github?: any;
        sheets?: any;
    };
}

/**
 * Dispatch initial notification across all channels: Slack, GitHub, and Google Sheets.
 * Uses Promise.allSettled so one failure does not halt other integrations.
 */
export async function notify_all(incident: any): Promise<IntegrationResults> {
    const results = await Promise.allSettled([
        notifySlack(incident),
        createGithubIssue(incident),
        logToSheets(incident),
    ]);

    if (results[0].status === "rejected") {
        console.error("Slack notification error:", results[0].reason);
    }
    if (results[1].status === "rejected") {
        console.error("GitHub issue creation error:", results[1].reason);
    }
    if (results[2].status === "rejected") {
        console.error("Google Sheets logging error:", results[2].reason);
    }

    return {
        slack: results[0].status === "fulfilled" ? "success" : "failed",
        github: results[1].status === "fulfilled" ? "success" : "failed",
        sheets: results[2].status === "fulfilled" ? "success" : "failed",
    };
}

/**
 * Dispatch status update across all channels (Slack, GitHub, and Google Sheets)
 * after human approval / rejection / resolution.
 * Uses Promise.allSettled for safe fault isolation.
 */
export async function update_notify(incident: any): Promise<IntegrationResults> {
    const results = await Promise.allSettled([
        updateSlack(incident),
        updateGithubIssue(incident),
        updateIncidentInSheets(incident),
    ]);

    if (results[0].status === "rejected") {
        console.error("Slack status update error:", results[0].reason);
    }
    if (results[1].status === "rejected") {
        console.error("GitHub status update error:", results[1].reason);
    }
    if (results[2].status === "rejected") {
        console.error("Google Sheets status update error:", results[2].reason);
    }

    return {
        slack: results[0].status === "fulfilled" ? "success" : "failed",
        github: results[1].status === "fulfilled" ? "success" : "failed",
        sheets: results[2].status === "fulfilled" ? "success" : "failed",
    };
}

// Backwards compatibility alias for existing callers
export const dispatchIncident = notify_all;
export const updateDispatch = update_notify;