"use client"

import { useInfiniteQuery, UseInfiniteQueryOptions } from "@tanstack/react-query";
import { clientApi } from '@/lib/api/client-api';
import { 
  GetVersesByChapterResponseDto, 
  GetVersesByChapterParamsDto,
} from '@/lib/dto/verse.dto';

export const useVerses = (
  params: GetVersesByChapterParamsDto,
  options?: Omit<UseInfiniteQueryOptions<GetVersesByChapterResponseDto, Error>, 'queryKey' | 'queryFn'>
) => {
    
  const defaultParams: GetVersesByChapterParamsDto = {
    words: true,
    fields: "text_uthmani_tajweed",
    ...params,
  };

  const fetchVerses = async ({pageParam}: {pageParam: number}): Promise<GetVersesByChapterResponseDto> => {

    const response = await clientApi.get<GetVersesByChapterResponseDto>(
    `/verse`,
    {
        params: {
            ...defaultParams,
            page: pageParam
        }
    }
    );
    return response.data;
  };

  return useInfiniteQuery<GetVersesByChapterResponseDto, Error>({
    queryKey: ["verses", params.chapter_id, defaultParams],
    queryFn: ({pageParam}: {pageParam: number | unknown}) => fetchVerses({pageParam: pageParam as number || 1}),
    getNextPageParam: (lastPage) => {
        console.log(lastPage);
        return lastPage.pagination.next_page ? lastPage.pagination.next_page : undefined;
    },
    initialPageParam: 1,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};