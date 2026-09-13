import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

export async function createGithubIssue(incident: any) {
    const owner = process.env.GITHUB_OWNER!;
    const repo = process.env.GITHUB_REPO!;

    const title =
        incident.proposed_github_issue_title ||
        `[Aegis Incident] ${incident.incident_id || incident.failure_type || "Failure Detected"}`;

    const body =
        incident.proposed_github_issue_body ||
        `### Aegis Incident Report\n\n- **Incident ID:** \`${incident.incident_id || "N/A"}\`\n- **Severity:** ${incident.severity || "N/A"}\n- **Failure Type:** ${incident.failure_type || "N/A"}\n- **Root Cause:** ${incident.root_cause || "N/A"}\n- **Suggested Fix:** ${incident.suggested_fix || "N/A"}`;

    const labels = [incident.severity, incident.failure_type].filter(Boolean);

    return octokit.issues.create({
        owner,
        repo,
        title,
        body,
        labels,
    });
}

export async function updateGithubIssue(incident: any) {
    const owner = process.env.GITHUB_OWNER!;
    const repo = process.env.GITHUB_REPO!;
    let issueNumber = incident.github_issue_number ?? incident.issue_number;

    // If issue number is not explicitly passed, attempt to find matching issue by incident_id or title
    if (!issueNumber && (incident.incident_id || incident.proposed_github_issue_title)) {
        try {
            const issues = await octokit.issues.listForRepo({
                owner,
                repo,
                state: "all",
                per_page: 30,
            });

            const match = issues.data.find((issue) => {
                const titleMatch =
                    (incident.proposed_github_issue_title &&
                        issue.title === incident.proposed_github_issue_title) ||
                    (incident.incident_id && issue.title.includes(incident.incident_id));
                const bodyMatch =
                    incident.incident_id && issue.body && issue.body.includes(incident.incident_id);
                return titleMatch || bodyMatch;
            });

            if (match) {
                issueNumber = match.number;
            }
        } catch (err) {
            console.error("Failed to search GitHub issues:", err);
        }
    }

    if (!issueNumber) {
        return { success: false, reason: "No matching GitHub issue found to update" };
    }

    const status = incident.status ?? "Updated";
    const commentBody = `### 🛡️ Aegis AI Incident Status Update\n\n- **Status:** **${status}**\n- **Incident ID:** \`${incident.incident_id ?? "N/A"}\`\n- **Notes / Resolution:** ${incident.action_note || incident.resolution || incident.suggested_fix || "Human decision recorded."}\n- **Updated At:** ${new Date().toISOString()}`;

    const commentResponse = await octokit.issues.createComment({
        owner,
        repo,
        issue_number: issueNumber,
        body: commentBody,
    });

    // Optionally close issue if resolved or rejected
    if (["closed", "resolved", "rejected"].includes(status.toLowerCase())) {
        try {
            await octokit.issues.update({
                owner,
                repo,
                issue_number: issueNumber,
                state: "closed",
                state_reason: status.toLowerCase() === "rejected" ? "not_planned" : "completed",
            });
        } catch (err) {
            console.error("Failed to close GitHub issue state:", err);
        }
    }

    return commentResponse;
}