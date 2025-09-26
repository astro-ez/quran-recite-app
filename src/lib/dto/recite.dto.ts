import { Surah } from "@/entities/surah";
import { Recitation } from "@/types/recite.type";

export interface getRecitationsParams {
    language?: string;
}

export type RecitationResponse = {
    recitations: Recitation[];
}

export interface IGetReciterSurah {
    id: Recitation['id'];
    chapter_number: Surah['id'];
    segments: boolean;
}