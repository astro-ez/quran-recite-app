'use client'

import clientApi from "@/lib/api/client-api";
import { getRecitationsParams, RecitationResponse } from "@/lib/dto/recite.dto";
import { Recitation } from "@/types/recite.type";
import { useQuery } from "@tanstack/react-query";

export function useRecitations() {
    return useQuery({
        queryKey: ['recitations'],
        queryFn: async () => {
            const response = await clientApi.get<RecitationResponse>('/recite', {params: {language: "ar"} as getRecitationsParams});

            return response.data;
        },
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        retry: 1,
    });
}