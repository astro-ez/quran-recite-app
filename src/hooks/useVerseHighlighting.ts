"use client"

import { useMemo, useEffect } from "react";
import { GetVersesByChapterResponseDto } from "@/lib/dto/verse.dto";
import { Word, Verse } from "@/types/verse.type";
import { useQuranReading } from "@/context/quran-reading.context";

interface VerseWithHighlight extends Verse {
  isHighlighted: boolean;
  words: (Word & { isHighlighted: boolean })[];
}

interface UseVerseHighlightingProps {
  data: { pages: GetVersesByChapterResponseDto[] } | undefined;
  surahTimeStamps: any;
  reciteAudioTime: number | null;
  isLoading: boolean;
}

export function useVerseHighlighting({
  data,
  surahTimeStamps,
  reciteAudioTime,
  isLoading
}: UseVerseHighlightingProps) {

   const  { smoothScrollToVerse } = useQuranReading();
  
  // Create a memoized copy of verses with highlighting properties
  const versesWithHighlighting = useMemo(() => {
    if (!data) return [];
    
    return data.pages.map(page => 
      page.verses.map(verse => ({
        ...verse,
        isHighlighted: false,
        words: verse.words.map(word => ({
          ...word,
          isHighlighted: false
        }))
      }))
    );
  }, [data]);

  // Apply highlighting based on audio time
  useEffect(() => {
    if (!surahTimeStamps || reciteAudioTime === null || isLoading || !data) {
      return;
    }

    const perPage = data.pages[0]?.pagination.per_page;
    
    // Reset all highlights
    versesWithHighlighting.forEach(page => {
      page.forEach(verse => {
        verse.isHighlighted = false;
        verse.words.forEach(word => word.isHighlighted = false);
      });
    });

    // Find current verse based on audio time
    const currentVerseIndex = surahTimeStamps.timestamps.findIndex(
      (verse: any) => reciteAudioTime >= verse.timestamp_from && reciteAudioTime <= verse.timestamp_to
    );

    if (currentVerseIndex === -1 || !perPage) return;

    // Calculate which page and verse position
    const pageIndex = Math.floor(currentVerseIndex / perPage);
    const versePositionInPage = currentVerseIndex % perPage;
    
    if (versesWithHighlighting[pageIndex] && versesWithHighlighting[pageIndex][versePositionInPage]) {
      const selectedVerse = versesWithHighlighting[pageIndex][versePositionInPage];
      selectedVerse.isHighlighted = true;

      // Highlight current word
      const words = surahTimeStamps.timestamps[currentVerseIndex].segments;
      const currentWord = words.find((w: any) => 
        reciteAudioTime >= w[1] && reciteAudioTime <= w[2]
      );

      if (currentWord) {
        const wordIndex = currentWord[0] - 1;
        if (wordIndex >= 0 && selectedVerse.words[wordIndex]) {
          selectedVerse.words[wordIndex].isHighlighted = true;
        }
      }

      // scroll to highlighted verse
      smoothScrollToVerse(selectedVerse.verse_number);
    }
  }, [versesWithHighlighting, surahTimeStamps, reciteAudioTime, isLoading, data]);

  return {
    versesWithHighlighting,
    currentHighlightedVerse: versesWithHighlighting
      .flat()
      .find(verse => verse.isHighlighted)
  };
}