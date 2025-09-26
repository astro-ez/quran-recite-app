"use client"

import { Surah } from '@/entities/surah';
import { Verse } from '@/types/verse.type';
import React, { createContext } from 'react';

interface RecitationState {
    surah: Surah['id'];
    verseNumber: Verse['id'];
}

interface RecitationContextValue {
    state: RecitationState;
    setSurah: (surahId: Surah['id']) => void;
    setVerseNumber: (verseNumber: Verse['id']) => void;
}

const RecitationContext = createContext<RecitationContextValue | undefined>(undefined);

export function RecitationProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = React.useState<RecitationState>({
        surah: 1,
        verseNumber: 1,
    });

    const setSurah = (surahId: Surah['id']) => {
        setState(prev => ({
            ...prev,
            surah: surahId,
        }));
    };


    const setVerseNumber = (verseNumber: Verse['id']) => {
        setState(prev => ({
            ...prev,
            verseNumber,
        }));
    };

    return (
        <RecitationContext.Provider value={{ state, setSurah, setVerseNumber }}>
            {children}
        </RecitationContext.Provider>
    );
}

export function useRecitationContext() {
    const context = React.useContext(RecitationContext);

    if (!context) {
        throw new Error('useRecitation must be used within a RecitationProvider');
    }

    return context;
}