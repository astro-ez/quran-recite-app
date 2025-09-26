import { NextRequest, NextResponse } from "next/server";
import { api } from "@/lib/api/api";
import { endpoints } from "@/lib/api/endpoints";
import { 
  GetVersesByChapterParamsDto, 
  GetVersesByChapterResponseDto,
  ApiErrorDto 
} from "@/lib/dto/verse.dto";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const chapterId = searchParams.get('chapter_id');
    
    if (!chapterId) {
      const errorResponse: ApiErrorDto = {
        error: "Bad Request",
        message: "Chapter ID is required",
        status: 400
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Parse chapter ID
    const chapterIdNum = parseInt(chapterId);
    if (isNaN(chapterIdNum)) {
      const errorResponse: ApiErrorDto = {
        error: "Bad Request",
        message: "Invalid chapter ID. Must be a number",
        status: 400
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const params: GetVersesByChapterParamsDto = {
      chapter_id: chapterIdNum,
      words: searchParams.get('words') === 'true',
      fields: searchParams.get('fields') || undefined,
      per_page: searchParams.get('per_page') ? parseInt(searchParams.get('per_page')!) : undefined,
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : undefined,
    };

    Object.keys(params).forEach(key => {
      if (params[key as keyof GetVersesByChapterParamsDto] === undefined) {
        delete params[key as keyof GetVersesByChapterParamsDto];
      }
    });

    const response = await api.get<GetVersesByChapterResponseDto>(
      `${endpoints.verse.list}/${chapterIdNum}`,
      { params }
    );

    return NextResponse.json(response.data, { status: 200 });

  } catch (error: any) {
    console.error("Error fetching verses:", error);
    
    // if (error.response) {
    //   const errorResponse: ApiErrorDto = {
    //     error: error.response.statusText || "External API Error",
    //     message: error.response.data?.message || "Failed to fetch verses from external API",
    //     status: error.response.status || 500
    //   };
    //   return NextResponse.json(errorResponse, { status: error.response.status || 500 });
    // }
    
    // // Handle network errors
    // const errorResponse: ApiErrorDto = {
    //   error: "Internal Server Error",
    //   message: "Failed to fetch verses",
    //   status: 500
    // };
    // return NextResponse.json(errorResponse, { status: 500 });
  }
}