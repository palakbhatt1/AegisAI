import { notify_all, update_notify } from "../../../lib/integrations/dispatch";
import { getIncidentsFromSheets } from "../../../lib/integrations/sheets";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { incident, action, ...rest } = body;
        const targetIncident = incident || rest;

        let result;
        if (action === "update" || targetIncident.action === "update") {
            result = await update_notify(targetIncident);
        } else {
            result = await notify_all(targetIncident);
        }

        return Response.json({
            success: true,
            result,
        });
    } catch (error: any) {
        return Response.json(
            {
                success: false,
                error: error.message,
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const incidents = await getIncidentsFromSheets();

        return Response.json({
            success: true,
            incidents,
        });
    } catch (error: any) {
        return Response.json(
            {
                success: false,
                error: error.message,
            },
            { status: 500 }
        );
    }
}