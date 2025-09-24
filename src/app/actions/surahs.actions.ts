import { Surah } from "@/entities/surah";
import { api } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";

type GetChaptersResponse = {
    chapters: Surah[];
}

export async function getChapters(): Promise<Surah[]> {
    const response = await api.get<GetChaptersResponse>(endpoints.surahs.list);

    return response.data.chapters;
}