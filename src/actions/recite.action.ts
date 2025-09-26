import { Surah } from "@/entities/surah";
import { api } from "@/lib/api/api";
import { endpoints } from "@/lib/api/endpoints";
import { getRecitationsParams, RecitationResponse } from "@/lib/dto/recite.dto";
import { Recitation, SurahAudio } from "@/types/recite.type";

export async function getRecitations(params: getRecitationsParams) {
    const response = await api.get<RecitationResponse>(endpoints.recite.list, {params});

    return response.data;
}

export type getSurahReciteAudioParams = {
    segments?: boolean;
}

export type getSurahReciteAudioResponse = {
    audio_file: SurahAudio;
}

export async function getSurahReciteAudio(reciter_id: Recitation['id'], chapter_id: Surah['id'], params?: getSurahReciteAudioParams) {
    const response = await api.get<getSurahReciteAudioResponse>(`${endpoints.recite.audio}/${reciter_id}/${chapter_id}`, {
        params
    });

    return response.data;
}
