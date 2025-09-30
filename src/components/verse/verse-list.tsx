"use client"

import { VerseCard, VerseCardSkeleton } from "@/components/verse/verse-card";
import { useVerses } from "@/hooks/useVerses";
import { useVerseHighlighting } from "@/hooks/useVerseHighlighting";
import { useInView } from 'react-intersection-observer';
import React, { useCallback, useEffect } from "react";
import { useQuranReading } from "@/context/quran-reading.context";
import { useReciteContext } from "@/context/recite.context";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export function VerseList() {
  const { 
    state: { selectedSurahId, selectedVerseNumber },
    registerVerseRef,
    smoothScrollToVerse,
  } = useQuranReading();

  const { state: { surahTimeStamps, reciteAudioTime }, setStartEndAudioTime } = useReciteContext();
  const { ref: refBottom, inView: inViewBottom } = useInView();

  const { 
    data, 
    isLoading, 
    isError, 
    hasNextPage, 
    fetchNextPage, 
    isFetchingNextPage 
  } = useVerses({ 
    chapter_id: selectedSurahId!,
  });

  const { versesWithHighlighting } = useVerseHighlighting({
    data,
    surahTimeStamps,
    reciteAudioTime,
    isLoading
  });

  const handlePlayVerseSegment = useCallback((verse_number: number) => {

    const verseKey = versesWithHighlighting.flat().find(v => v.verse_number === verse_number)?.verse_key;

    if (!verseKey || !surahTimeStamps) return;

    const verseTimestamps = surahTimeStamps?.timestamps.find(v => v.verse_key === verseKey);

    setStartEndAudioTime(verseTimestamps ? { start: verseTimestamps.timestamp_from , end: verseTimestamps.timestamp_to } : null);
    smoothScrollToVerse(verse_number);

  }, [surahTimeStamps, setStartEndAudioTime, versesWithHighlighting]);

  useEffect(() => {
    if (inViewBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inViewBottom, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <VerseListSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] px-4">
        <div className="text-center space-y-2">
          <div className="text-lg font-semibold text-destructive">Error loading verses</div>
          <p className="text-muted-foreground">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-none">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {versesWithHighlighting.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {page?.map((verse, verseIndex) => (
                <React.Fragment key={verse.id}>
                    <VerseCard 
                      ref={el => registerVerseRef(verse.verse_number, el)}
                      verse={verse}
                      isSelected={selectedVerseNumber === verse.verse_number}
                      onPlay={() => {
                        handlePlayVerseSegment(verse.verse_number);
                      }}
                      className={cn(
                        "w-full transition-all duration-200",
                      )}
                    />
                    {(pageIndex < (data?.pages?.length ?? 0) - 1 || verseIndex < page.length - 1) && (
                      <Separator className="bg-border mt-4" />
                    )}

                </React.Fragment>
              ))}
              
              <div className="relative flex justify-center pb-3">
                <Separator className="bg-border mt-4" />
                <div className="absolute bg-muted px-3 py-1 rounded-full">
                  <span className="text-xs font-medium text-muted-foreground">
                    Page {pageIndex + 1}
                    {data?.pages[pageIndex]?.pagination?.total_pages && 
                      ` of ${data.pages[pageIndex].pagination.total_pages}`
                    }
                  </span>
                </div>
              </div>
            </React.Fragment>
          ))}
          
          {/* Loading indicator */}
          {isFetchingNextPage && (
            <div className="space-y-4">
              <VerseCardSkeleton />
            </div>
          )}
          
          {/* Infinite scroll trigger */}
          <div ref={refBottom} className="h-4" />
          
          {/* End of content indicator */}
          {data && !hasNextPage && (
            <div className="flex justify-center pb-8">
              <div className="text-sm text-muted-foreground">
                End of Surah
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Skeleton loading for the entire verse list
export function VerseListSkeleton() {
  return (
    <div className="w-full max-w-none">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <React.Fragment key={index}>
              <VerseCardSkeleton />
              <Separator className="my-4 bg-border/50" />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}