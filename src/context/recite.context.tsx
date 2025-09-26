"use client"

import { SurahAudio } from "@/types/recite.type";
import React from "react";

interface ReciteState {
    reciteMode: "verse" | "word";
    reciteAudioTime: number | null; // in milliseconds
    surahTimeStamps: SurahAudio | null;
}

interface ReciteContextValue {
    state: ReciteState;
    setReciteMode: (mode: ReciteState['reciteMode']) => void;
    setReciteAudioTime: (time: ReciteState['reciteAudioTime']) => void;
    setSurahTimeStamps: (timestamps: ReciteState['surahTimeStamps']) => void;
}

const ReciteContext = React.createContext<ReciteContextValue | undefined>(undefined);

export function ReciteProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = React.useState<ReciteState>({
        reciteMode: "verse",
        reciteAudioTime: null,
        surahTimeStamps: null,
    });
    const setReciteMode = (mode: ReciteState['reciteMode']) => {
        setState(prev => ({
            ...prev,
            reciteMode: mode,
        }));
    }
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
    return (
        <ReciteContext.Provider value={{ state, setReciteMode, setReciteAudioTime, setSurahTimeStamps }}>
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
