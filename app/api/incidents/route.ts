import {
    getIncidentsFromSheets,
    updateIncidentInSheets,
} from "../../../lib/integrations/sheets";

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

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const { incident, ...rest } = body;
        const targetIncident = incident || rest;

        const result = await updateIncidentInSheets(targetIncident);

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
