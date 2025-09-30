'use client'

import clientApi from "@/lib/api/client-api";
import { GetChaptersParams, GetChaptersResponse } from "@/lib/dto/surah.dto";
import { useQuery } from "@tanstack/react-query";

export function useSurahs(params?: GetChaptersParams) {
    return useQuery({
        queryKey: ['surahs', params],
        queryFn: async () => {
            const response = await clientApi.get<GetChaptersResponse>('/surah', { params });

            return response.data.chapters;
        },
        staleTime: Infinity,
        retry: 0,
    });
} 