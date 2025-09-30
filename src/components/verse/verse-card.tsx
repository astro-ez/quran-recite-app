"use client"

import { Button } from "@/components/ui/button"
import { Bookmark, Play, MoreHorizontal, Book } from "lucide-react"
import { cn } from "@/lib/utils"
import { Verse, Word } from "@/types/verse.type"
import React from "react"

interface VerseSentenceProps {
  sentence: string;
  className?: string;
}

type WordHighlight = Word & { isHighlighted?: boolean };

function VerseSentence({ sentence, className = "" }: VerseSentenceProps) {
  return (
    <div 
      className={cn(
        "text-right font-arabic text-3xl leading-relaxed mb-4 line-height-loose",
        "direction-rtl tajweed-text tajweed",
        className
      )}
      dir="rtl"
      lang="ar"
      dangerouslySetInnerHTML={{ __html: sentence }}
    />
  );
}

function VerseWord({ word, variant }: { word: WordHighlight, variant: "arabic_main" | "translation" }) {
  const variantClasses = {
    "arabic_main": "font-arabic",
    "translation": "text-base leading-relaxed text-foreground font-medium"
  }[variant];

  const text = variant === "arabic_main" ? word.text_uthmani : word.translation.text;

  return (
    <span className={cn(variantClasses, word.isHighlighted && "bg-yellow-200")}>
      {text}
    </span>
  );
}

interface VerseRecitation extends Verse {
  isHighlighted?: boolean;
  words: WordHighlight[]
}

export interface VerseCardProps {
  verse: VerseRecitation;
  mode?: "translation" | "reading"
  isSelected?: boolean
  className?: string
  onPlay?: () => void
  onBookmark?: () => void
  isBookmarked?: boolean,
  ref: React.Ref<HTMLDivElement>
}

export function VerseCard({
  verse,
  mode = "translation",
  className,
  onPlay,
  onBookmark,
  isBookmarked = false,
  ref
}: VerseCardProps) {
  return (
    <div ref={ref} className={cn("w-full p-5", verse.isHighlighted && "ring-1 ring-foreground rounded-lg", className)}>
        {/* Main Content Row */}
        <div className="flex gap-4">
          {/* Left sidebar - Action buttons */}
          <div className="flex flex-col gap-2 pt-1">

            <div className="p-1 text-sm font-medium text-muted-foreground">
              {verse.verse_key}
            </div>

            <Button 
              variant="default" 
              size="sm" 
              className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
              aria-label="More options"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="default" 
              size="sm" 
              className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground" 
              onClick={onPlay}
              aria-label="Play verse audio"
            >
              <Play className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="default" 
              size="sm" 
              className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
              aria-label="View in book"
            >
              <Book className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="default" 
              size="sm" 
              className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground" 
              onClick={onBookmark}
              aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
            >
              <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-current text-primary")} />
            </Button>
          </div>

          {/* Main content area */}
          <div className="flex-1 min-w-0 flex flex-col justify-center ">

            {/* Arabic Text */}
            {/* <VerseSentence sentence={verse.text_uthmani} /> */}
            <div
              className="text-right direction-rtl leading-relaxed mb-4 line-height-loose tajweed-text tajeweed font-arabic text-3xl"
            >
            {verse.words.map((word, index) => (
              <React.Fragment key={word.id}>
              <VerseWord 
                word={word} 
                variant="arabic_main" 
              />
              {index < verse.words.length - 1 ? " " : ""}
              </React.Fragment>
            ))}
            </div>

            {/* Translation Text (in translation mode) */}
            {mode === "translation" && verse.words && (
              <div className="mb-3">
                <p className="text-base leading-relaxed text-foreground font-medium">
                  {verse.words.map((word, index) => (
                    <span key={word.id} className={cn(word.isHighlighted && "bg-yellow-200")}>
                      {word.translation.text}
                      {index < verse.words.length - 1 ? " " : ""}
                    </span>
                  ))}
                </p>
              </div>
            )}

            {/* Attribution */}
            <div className="text-sm text-muted-foreground">
              — English
            </div>

          </div>
        </div>
      </div>
  )
}

// Skeleton Loading Component
export function VerseCardSkeleton() {
  return (
    <div className="w-full p-5 animate-pulse">
      <div className="flex gap-4">
        {/* Left sidebar skeleton */}
        <div className="flex flex-col gap-2 pt-1">
          <div className="h-4 w-8 bg-muted rounded"></div>
          <div className="h-6 w-6 bg-muted rounded"></div>
          <div className="h-6 w-6 bg-muted rounded"></div>
          <div className="h-6 w-6 bg-muted rounded"></div>
          <div className="h-6 w-6 bg-muted rounded"></div>
        </div>

        {/* Main content skeleton */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          {/* Arabic text skeleton */}
          <div className="mb-4 space-y-2">
            <div className="h-8 bg-muted rounded w-full"></div>
            <div className="h-8 bg-muted rounded w-3/4 ml-auto"></div>
            <div className="h-8 bg-muted rounded w-5/6 ml-auto"></div>
          </div>
          
          {/* Translation skeleton */}
          <div className="mb-3 space-y-2">
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-4/5"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
          </div>

          {/* Attribution skeleton */}
          <div className="h-3 bg-muted rounded w-16"></div>
        </div>
      </div>
    </div>
  );
}
