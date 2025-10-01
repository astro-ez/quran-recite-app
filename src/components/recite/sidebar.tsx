"use client"

import { ReciterAudio } from "@/components/recite/reciter-audio";
import { SurahCardListMode } from "@/components/surahs/surah-card";
import { Button } from "@/components/ui/button";
import { useQuranReading } from "@/context/quran-reading.context";
import { Surah } from "@/entities/surah";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

export function ReciteSidebar({ chapters: data } : { chapters: Surah[]}) {

    const { 
        state: { selectedSurahId },
        setSelectedSurah,
        smoothScrollToVerse,
        isVerseSelected 
    } = useQuranReading();

    const selectedChapter = useMemo(() => {
        return data.find(surah => surah.id === selectedSurahId);
    }, [data, selectedSurahId]);

    const verseNumbers = useMemo(() => {
        return Array.from({ length: selectedChapter?.verses_count || 0 }, (_, i) => i + 1);
    }, [selectedChapter]);

    return (
        <aside 
            className="relative flex flex-col bg-secondary-background max-h-[600px] rounded-xl p-4 justify-between w-full overflow-hidden"
            role="complementary"
            aria-label="Recitation navigation sidebar"
        >
            <div className="flex flex-col lg:flex-row gap-4 w-full h-full">
                <section className="flex-1 flex flex-col min-w-0">
                    <header className="mb-3">
                        <h2 className="text-xs font-semibold text-foreground uppercase tracking-wide">
                            Select Surah
                        </h2>
                    </header>
                    
                    <div className="flex-1 overflow-y-auto no-scrollbar space-y-1 pr-1 max-h-48 lg:max-h-none">
                        {data?.length ? (
                            data.map((surah) => (
                                <SurahCardListMode 
                                    isSelected={selectedSurahId === surah.id}
                                    key={surah.id} 
                                    data={surah}
                                    onClick={() => setSelectedSurah(surah.id)}
                                    aria-label={`Select ${surah.name_simple}`}
                                />
                            ))
                        ) : (
                            <div className="text-sm text-muted-foreground italic py-4">
                                No surahs available
                            </div>
                        )}
                    </div>
                </section>

                <section className="flex flex-col min-w-0">
                    <header className="mb-3">
                        <h2 className="text-xs font-semibold text-foreground uppercase tracking-wide">
                            Select Verse
                        </h2>
                    </header>
                    
                    <div className="flex-1 overflow-y-auto no-scrollbar max-h-48 lg:max-h-none">
                        <div className="gap-1 flex flex-col">
                            {verseNumbers.map((verse) => (
                                <Button 
                                    key={verse}
                                    variant="ghost"
                                    size="sm"
                                    className={cn(
                                        "text-muted-foreground bg-transparent hover:bg-muted hover:text-foreground transition-colors duration-200 h-8 min-w-[2.5rem] text-sm font-medium",
                                        isVerseSelected(verse) && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                                    )}
                                    onClick={() => smoothScrollToVerse(verse)}
                                    aria-label={`Jump to verse ${verse}`}
                                >
                                    {verse}
                                </Button>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
            <div className="mt-4 lg:mt-0">
                <ReciterAudio />
            </div>
        </aside>
    );
}

// Sidebar Skeleton Loading Component
export function ReciteSidebarSkeleton() {
    return (
        <aside 
            className="relative flex flex-col bg-secondary-background max-h-[80vh] rounded-xl p-4 justify-between w-full lg:w-[35%] overflow-hidden animate-pulse"
            role="complementary"
            aria-label="Loading recitation navigation"
        >
            <div className="flex flex-col lg:flex-row gap-4 w-full h-full">
                <section className="flex-1 flex flex-col min-w-0">
                    <header className="mb-3">
                        <div className="h-4 bg-muted rounded w-20"></div>
                    </header>
                    
                    <div className="flex-1 space-y-2 max-h-48 lg:max-h-none">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div key={index} className="h-12 bg-muted rounded"></div>
                        ))}
                    </div>
                </section>

                <section className="flex flex-col min-w-0">
                    <header className="mb-3">
                        <div className="h-4 bg-muted rounded w-16"></div>
                    </header>
                    
                    <div className="flex-1 max-h-48 lg:max-h-none">
                        <div className="grid grid-cols-4 gap-1">
                            {Array.from({ length: 20 }).map((_, index) => (
                                <div key={index} className="h-8 bg-muted rounded"></div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
            <div className="mt-4 lg:mt-0">
                <div className="h-12 bg-muted rounded"></div>
            </div>
        </aside>
    );
}