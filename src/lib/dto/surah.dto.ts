import { Surah } from "@/entities/surah";

export type GetChaptersParams = {
    language?: string;
}

export type GetChaptersResponse = {
    chapters: Surah[];
}