"use client"

import { SurahCard } from "@/components/surahs/surah-card";
import { Input } from "@/components/ui/input";
import { Surah } from "@/entities/surah";
import React, { useMemo } from "react";
import { useDebounce } from "use-debounce";

export function SurahList({surahs}: {surahs: Surah[]}) {
    const [searchQuery, setSearchQuery] = React.useState('');

    // debounce the search input
    const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

    const filteredSurahs = useMemo(() => {
        if (!debouncedSearchQuery) return surahs;
        return surahs.filter(surah =>
            surah.name_simple.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            surah.translated_name.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            surah.id.toString() === debouncedSearchQuery
        );

    }, [surahs, debouncedSearchQuery]);

    return (
        <div className="w-full h-full">
            {/* Filtering and searching inputs */}
            <div className="flex justify-center items-center my-5">
                <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full md:max-w-[50%] text-center rounded-full border-muted border-2" placeholder="Search by page number or surah name"/>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full h-full gap-5">
                {filteredSurahs.map((surah) => (
                    <SurahCard key={surah.id} data={surah} isSelected={surah.id === 1}/>
                ))}
            </div>
        </div>
    )
}