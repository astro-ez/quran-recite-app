"use client"

import { Surah } from '@/entities/surah';
import { Verse } from '@/types/verse.type';
import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

// Types for the Quran reading state
interface QuranReadingState {
  selectedSurahId: Surah['id'] | null;
  selectedVerseNumber: Verse['id'] | null;
  isAutoScroll: boolean;
  scrollToVerseId: number | null;
  jumpToVerseId: number | null;
}

interface QuranReadingContextValue {
  // Current state
  state: QuranReadingState;

  // Actions
  setSelectedSurah: (surahId: Surah['id']) => void;
  setSelectedVerse: (verseNumber: number) => void;
  jumpToVerse: (surahId: Surah['id'], verseNumber: number) => void;
  clearSelectedVerse: () => void;
  setAutoScroll: (enabled: boolean) => void;
  smoothScrollToVerse: (verseNumber: number) => void;
  
  // Utility functions
  getVerseKey: (verseNumber: number) => string;
  isVerseSelected: (verseNumber: number) => boolean;
  
  // Ref functions
  registerVerseRef: (verseNumber: number, element: HTMLElement | null) => void;
}

const QuranReadingContext = createContext<QuranReadingContextValue | undefined>(undefined);

export function QuranReadingProvider({ 
  children,
  defaultSurahId
}: { 
  children: React.ReactNode;
  defaultSurahId?: number;
}) {
  const [state, setState] = useState<QuranReadingState>({
    selectedSurahId: defaultSurahId || null,
    selectedVerseNumber: null,
    isAutoScroll: false,
    scrollToVerseId: null,
    jumpToVerseId: null,
  });

  // Refs to store verse elements for smooth scrolling
  const verseRefs = useRef<Map<number, HTMLElement>>(new Map());

  // Function to register verse element refs
  const registerVerseRef = useCallback((verseNumber: number, element: HTMLElement | null) => {
    if (element) {
      verseRefs.current.set(verseNumber, element);
    } else {
      verseRefs.current.delete(verseNumber);
    }
  }, [state]);

  // Function to smooth scroll to a specific verse
  const smoothScrollToVerse = useCallback((verseNumber: number) => {
    setSelectedVerse(verseNumber);
    const verseElement = verseRefs.current.get(verseNumber);
    if (verseElement) {
      verseElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'nearest'
      });
    }
  }, [state]);

  // Action: Set selected surah
  const setSelectedSurah = useCallback((surahId: Surah['id']) => {
    setState(prev => ({
      ...prev,
      selectedSurahId: surahId,
      selectedVerseNumber: null, // Reset verse when changing surah
      scrollToVerseId: null,
      jumpToVerseId: null,
    }));
    // Clear verse refs when changing surah
    verseRefs.current.clear();
  }, [state]);

  // Action: Set selected verse within current surah
  const setSelectedVerse = useCallback((verseNumber: number) => {
    setState(prev => ({
      ...prev,
      selectedVerseNumber: verseNumber,
    }));
  }, [state]);

  // Action: Jump to specific verse (can change both surah and verse)
  const jumpToVerse = useCallback((surahId: Surah['id'], verseNumber: number) => {
    setState(prev => ({
      ...prev,
      selectedSurahId: surahId,
      selectedVerseNumber: verseNumber,
      scrollToVerseId: verseNumber, // Trigger scroll
      jumpToVerseId: verseNumber,  // Trigger data refresh if needed
    }));
  }, [state]);

  // Action: Clear selected verse
  const clearSelectedVerse = useCallback(() => {
    setState(prev => ({
      ...prev,
      selectedVerseNumber: null,
      scrollToVerseId: null,
      jumpToVerseId: null,
    }));
  }, [state]);

  // Action: Enable/disable auto-scroll
  const setAutoScroll = useCallback((enabled: boolean) => {
    setState(prev => ({
      ...prev,
      isAutoScroll: enabled,
    }));
  }, [state]);

  // Utility: Get verse key (e.g., "1:1", "2:255")
  const getVerseKey = useCallback((verseNumber: number) => {
    return `${state.selectedSurahId}:${verseNumber}`;
  }, [state.selectedSurahId]);

  // Utility: Check if verse is currently selected
  const isVerseSelected = useCallback((verseNumber: number) => {
    return state.selectedVerseNumber === verseNumber;
  }, [state.selectedVerseNumber]);

  const contextValue: QuranReadingContextValue = {
    // Current state
    state,
    
    // Actions
    setSelectedSurah,
    setSelectedVerse,
    jumpToVerse,
    clearSelectedVerse,
    setAutoScroll,
    smoothScrollToVerse,
    
    // Utilities
    getVerseKey,
    isVerseSelected,
    
    // Ref functions
    registerVerseRef,
  };

  return (
    <QuranReadingContext.Provider value={contextValue}>
      {children}
    </QuranReadingContext.Provider>
  );
}

// Hook to use the Quran reading context
export function useQuranReading() {
  const context = useContext(QuranReadingContext);

  if (!context) {
    throw new Error('useQuranReading must be used within a QuranReadingProvider');
  }
  
  return context;
}
