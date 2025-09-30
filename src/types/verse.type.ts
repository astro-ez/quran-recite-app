

export type Verse = {
    id: number;
    chapter_id: number;
    verse_number: number;
    verse_key: string;
    verse_index: number;
    text_uthmani_tajweed: string;
    text_uthmani: string;
    juz_number: number;
    words: Word[];
}

export type Word = {
    id: number;
    position: number;
    audio_url: string;
    char_type_name: string;
    text_uthmani_tajweed: string;
    text_uthmani: string;
    translation: {
        text: string;
        language_name: string;
    },
    transliteration: {
        text: string;
        language_name: string;
    }
}