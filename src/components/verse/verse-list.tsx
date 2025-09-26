"use client"

import { VerseCard, VerseCardSkeleton } from "@/components/verse/verse-card";
import { useVerses } from "@/hooks/useVerses";
import { useVerseHighlighting } from "@/hooks/useVerseHighlighting";
import { Separator } from "@radix-ui/react-separator";
import { useInView } from 'react-intersection-observer';
import React, { useEffect } from "react";
import { useQuranReading } from "@/context/quran-reading.context";
import { useReciteContext } from "@/context/recite.context";
import { cn } from "@/lib/utils";

export function VerseList() {
  const { 
    selectedSurahId, 
    selectedVerseNumber, 
    jumpToVerseId,
    registerVerseRef,
    smoothScrollToVerse,
  } = useQuranReading();

  const { state: { surahTimeStamps, reciteAudioTime } } = useReciteContext();
  const { ref: refBottom, inView: inViewBottom } = useInView();

  const { 
    data, 
    isLoading, 
    isError, 
    hasNextPage, 
    fetchNextPage, 
    isFetchingNextPage 
  } = useVerses({ 
    chapter_id: selectedSurahId,
  });

  const { versesWithHighlighting } = useVerseHighlighting({
    data,
    surahTimeStamps,
    reciteAudioTime,
    isLoading
  });

  useEffect(() => {
    if (inViewBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inViewBottom, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (jumpToVerseId) {
      // Small delay to ensure the element is rendered
      console.log(jumpToVerseId)
      const time = setTimeout(() => {
        smoothScrollToVerse(jumpToVerseId);
      }, 100);

      return () => clearTimeout(time);
    }
  }, [jumpToVerseId, smoothScrollToVerse]);

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
              {page?.map((verse) => (
                <React.Fragment key={verse.id}>
                  <div
                    ref={(el) => registerVerseRef(verse.verse_number, el)}
                    className={cn(
                      "transition-all duration-300 rounded-lg",
                      (selectedVerseNumber === verse.verse_number || verse.isHighlighted) && "bg-secondary/50 ring-2"
                    )}
                  >
                    <VerseCard 
                      verse={verse}
                      isSelected={selectedVerseNumber === verse.verse_number}
                      className={cn(
                        "w-full transition-all duration-200",
                        verse.isHighlighted && "border-primary/30"
                      )}
                    />
                  </div>
                  <Separator className="my-4 bg-border/50" />
                </React.Fragment>
              ))}
              
              <div className="flex justify-center py-3">
                <div className="bg-muted px-3 py-1 rounded-full">
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
              <VerseCardSkeleton />
            </div>
          )}
          
          {/* Infinite scroll trigger */}
          <div ref={refBottom} className="h-4" />
          
          {/* End of content indicator */}
          {data && !hasNextPage && (
            <div className="flex justify-center py-8">
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