export async function notifySlack(incident: any) {
    const severity = (incident.severity || "high").toUpperCase();
    const failureType = incident.failure_type || "Incident";
    const rootCause = incident.root_cause || "No root cause provided";

    const response = await fetch(process.env.SLACK_WEBHOOK_URL!, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            text: `🚨 *${severity}* — ${failureType} detected\n${rootCause}`,
        }),
    });

    if (!response.ok) {
        throw new Error(`Slack notification failed: ${response.status}`);
    }

    return { success: true };
}

export async function updateSlack(incident: any) {
    const status = incident.status ?? "Updated";
    const statusEmoji =
        status.toLowerCase() === "approved"
            ? "✅"
            : status.toLowerCase() === "rejected"
            ? "❌"
            : "🔔";
    const actionText =
        incident.action_note ||
        incident.resolution ||
        incident.suggested_fix ||
        "Human review decision recorded";

    const response = await fetch(process.env.SLACK_WEBHOOK_URL!, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            text: `${statusEmoji} *[${status.toUpperCase()}] Incident ${incident.incident_id ?? "N/A"}*\n*Status:* ${status}\n*Failure Type:* ${incident.failure_type ?? "N/A"}\n*Action / Note:* ${actionText}`,
        }),
    });

    if (!response.ok) {
        throw new Error(`Slack status update failed: ${response.status}`);
    }

    return { success: true };
}