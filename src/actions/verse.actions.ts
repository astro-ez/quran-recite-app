import { api } from "@/lib/api/api";
import { endpoints } from "@/lib/api/endpoints";
import { GetVersesByChapterParamsDto, GetVersesByChapterResponseDto } from "@/lib/dto/verse.dto";

export async function getVersesByChapter(chapterId: number, params?: GetVersesByChapterParamsDto) {

    const response = await api.get<GetVersesByChapterResponseDto>(`${endpoints.verse.list}/${chapterId}`, {params});

    return response.data;
}