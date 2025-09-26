import { Surah } from "@/entities/surah";
import { Verse } from "@/types/verse.type";

export interface Recitation {
    id: number;
    reciter_name: string;
    style: string;
    translated_name: {
        name: string;
        language_name: string;
    }
}

export interface SurahAudio {
    id: number;
    chapter_id: Surah['id'];
    format: string;
    audio_url: string;
    timestamps: VerseTimestamp[]
}

export interface VerseTimestamp {
    verse_key: Verse['verse_key'],
    timestamp_from: number;
    timestamp_to: number;
    duration: number;
    segments:  WordTimestamp[];
}

export type WordTimestamp = Array<number>;