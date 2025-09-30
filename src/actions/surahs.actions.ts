import { api } from "@/lib/api/api";
import { endpoints } from "@/lib/api/endpoints";
import { GetChaptersParams, GetChaptersResponse } from "@/lib/dto/surah.dto";


export async function getChapters(params?: GetChaptersParams) {
    const response = await api.get<GetChaptersResponse>(endpoints.surahs.list, { params });

    return response.data;
}