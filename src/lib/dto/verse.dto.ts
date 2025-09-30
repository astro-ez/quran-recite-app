// DTOs for verse API endpoints
import { Verse } from '@/types/verse.type';

export interface GetVersesByChapterParamsDto {
  chapter_id: number;
  words?: boolean;
  word_fields?: string;
  fields?: string;
  per_page?: number;
  page?: number;
}

export interface PaginationDto {
  per_page: number;
  current_page: number;
  next_page: number | null;
  total_pages: number;
  total_records: number;
}

export interface WordDto {
  id: number;
  position: number;
  audio_url: string;
  char_type_name: string;
  translation: {
    text: string;
    language_name: string;
  };
  transliteration: {
    text: string;
    language_name: string;
  };
}

export interface GetVersesByChapterResponseDto {
  verses: Verse[];
  pagination: PaginationDto;
}

// API Error Response DTO
export interface ApiErrorDto {
  error: string;
  message: string;
  status: number;
}