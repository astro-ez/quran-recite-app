import { getChapters } from "@/actions/surahs.actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const language = searchParams.get('language') ?? undefined;

    const res = await getChapters({ language });

    return NextResponse.json(res, { status: 200 });
}