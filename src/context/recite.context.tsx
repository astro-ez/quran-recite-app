"use client"

import { SurahAudio } from "@/types/recite.type";
import React from "react";

interface ReciteState {
    reciteAudioTime: number | null; // in milliseconds
    surahTimeStamps: SurahAudio | null;
    rangeAudioTime?: { start: number; end: number } | null; // in milliseconds
}

interface ReciteContextValue {
    state: ReciteState;
    setReciteAudioTime: (time: ReciteState['reciteAudioTime']) => void;
    setSurahTimeStamps: (timestamps: ReciteState['surahTimeStamps']) => void;
    setStartEndAudioTime: (range: ReciteState['rangeAudioTime']) => void;
}

const ReciteContext = React.createContext<ReciteContextValue | undefined>(undefined);

export function ReciteProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = React.useState<ReciteState>({
        reciteAudioTime: null,
        surahTimeStamps: null,
    });
    const setReciteAudioTime = (time: ReciteState['reciteAudioTime']) => {
        setState(prev => ({
            ...prev,
            reciteAudioTime: time,
        }));
    }
    const setSurahTimeStamps = (timestamps: ReciteState['surahTimeStamps']) => {
        setState(prev => ({
            ...prev,
            surahTimeStamps: timestamps,
        }));
    }

    const setStartEndAudioTime = (range: ReciteState['rangeAudioTime']) => {
        setState(prev => ({
            ...prev,
            rangeAudioTime: range,
        }));
    }


    return (
        <ReciteContext.Provider value={{ state, setReciteAudioTime, setSurahTimeStamps, setStartEndAudioTime }}>
            {children}
        </ReciteContext.Provider>
    );
}

export function useReciteContext() {
    const context = React.useContext(ReciteContext);
    if (!context) {
        throw new Error("useReciteContext must be used within a ReciteProvider");
    }
    return context;
}
