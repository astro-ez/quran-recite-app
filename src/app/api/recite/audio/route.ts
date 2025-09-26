import { getSurahReciteAudio, getSurahReciteAudioParams } from "@/actions/recite.action";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        
        const params = await req.json() as (getSurahReciteAudioParams & { reciter_id: number; chapter_id: number });

        const response = await getSurahReciteAudio(params.reciter_id, params.chapter_id, { segments: params.segments ?? true });

        return response ? NextResponse.json(response, { status: 200 }) : NextResponse.json({ error: "Surah audio not found" }, { status: 404 });

    } catch(error) {
        return NextResponse.json({ error: "Failed to fetch surah audio" }, { status: 500 });
    }
}