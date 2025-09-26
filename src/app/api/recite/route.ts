import { getRecitations } from "@/actions/recite.action";
import { getRecitationsParams } from "@/lib/dto/recite.dto";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const response  = await getRecitations(searchParams as getRecitationsParams);

        return new Response(JSON.stringify(response), { status: 200, headers: { 'Content-Type': 'application/json' } });

    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch recitations" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}