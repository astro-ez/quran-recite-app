'use client'

import { getSurahReciteAudioResponse } from "@/actions/recite.action";
import clientApi from "@/lib/api/client-api";
import { useMutation } from "@tanstack/react-query";

export function useSurahReciteAudio() {
    return useMutation({
        mutationKey: ['surah-audio'],
        mutationFn: async (variables: { chapterId: number; reciterId: number }) => {
            const response = await clientApi.post<getSurahReciteAudioResponse>('/recite/audio', {
                chapter_id: variables.chapterId,
                reciter_id: variables.reciterId,
                segments: true,
            });

            return response.data;
        },
        retry: 0,
    })
}