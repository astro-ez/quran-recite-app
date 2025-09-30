"use client"

import AudioTracker from "@/components/audio-player";
import { Select, SelectItem, SelectContent, SelectGroup, SelectTrigger } from "@/components/ui/select";
import { useQuranReading } from "@/context/quran-reading.context";
import { useReciteContext } from "@/context/recite.context";
import { useRecitations } from "@/hooks/useRecitations";
import { useSurahReciteAudio } from "@/hooks/useSurahReciteAudio";
import { useSurahs } from "@/hooks/useSurahs";
import { SelectValue } from "@radix-ui/react-select";
import { useEffect, useState } from "react";

export function ReciterAudio () {
    const { setSurahTimeStamps, setReciteAudioTime, state: {rangeAudioTime} } = useReciteContext();

    const { state: { selectedSurahId }, setSelectedSurah } = useQuranReading();

    const {data, isLoading, isError} = useRecitations();

    const [selectedReciterId, setSelectedReciterId] = useState<number | undefined>(undefined);

    const {data: surahsData, isLoading: isSurahsLoading, isError: isSurahsError} = useSurahs();

    useEffect(() => {
        if (data)
            setSelectedReciterId(data.recitations[0]?.id || undefined );
    }, [data]);

    const { data: surahAudio, isPending: isPendingAudio, isError: isErrorAudio, mutate: mutateAudio } = useSurahReciteAudio();

    const handleOnSubmit = () => {
        if (selectedSurahId)
            mutateAudio({ chapterId: selectedSurahId, reciterId: selectedReciterId! });
    }

    useEffect(() => {
        if (selectedReciterId && selectedSurahId && !isPendingAudio) {
            handleOnSubmit();
        }
    }, [selectedReciterId, selectedSurahId]);

    useEffect(() => {
        if (!isPendingAudio && surahAudio?.audio_file) {
            setSurahTimeStamps(surahAudio.audio_file);
        }
    }, [isPendingAudio, surahAudio]);

    return (
        <div className="absolute inset-x-0 bottom-0 bg-secondary-background rounded-lg border border-gray-200 p-4 space-y-4 shadow-[0_-4px_20px_-1px_rgba(0,0,0,0.1)] z-10">
            {/* Select Surah Label */}
            <div className="text-xs text-gray-600 font-medium m-0">
                Select Surah
            </div>
            
            {/* Select Surah select box */}
            <Select value={selectedSurahId?.toString()} onValueChange={(value) => setSelectedSurah(parseInt(value))} disabled={isLoading || isError || !data?.recitations.length}>
                <SelectTrigger className="w-full">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-secondary-background">
                    {isLoading && <div>Loading...</div>}
                    {isError && <div>Error loading surahs.</div>}
                    <SelectGroup>
                    {surahsData?.map((surah) => (
                        <SelectItem  key={surah.id} value={surah.id.toString()} className="data-[highlighted]:bg-muted data-[highlighted]:text-foreground" >
                            {String(surah.id).padStart(2, '0')} {surah.name_simple}
                        </SelectItem>
                    ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

            {/* Reciter Label */}
            <div className="text-xs text-gray-600 font-medium m-0">
                Reciter
            </div>

            {/* Select Reciter select box */}
            <Select value={selectedReciterId?.toString()} onValueChange={(value) => setSelectedReciterId(parseInt(value))} disabled={isLoading || isError || !data?.recitations.length}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Reciter" />
                </SelectTrigger>
                <SelectContent className="bg-secondary-background">
                    {isLoading && <div>Loading...</div>}
                    {isError && <div>Error loading recitations.</div>}
                    <SelectGroup>
                    {data?.recitations.map((recitation) => (
                        <SelectItem key={recitation.id} value={recitation.id.toString()} className="data-[highlighted]:bg-muted data-[highlighted]:text-foreground">
                            {recitation.reciter_name}
                        </SelectItem>
                    ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

            {/* Audio Player */}
            {!isPendingAudio && surahAudio?.audio_file && (
                <div className="pt-2">
                    <AudioTracker className="w-full max-h-10" url={surahAudio.audio_file.audio_url} onTimeUpdate={(time) => setReciteAudioTime(time)} startTimestamp={rangeAudioTime?.start} endTimestamp={rangeAudioTime?.end} />
                </div>
            )}

        </div>
    )
}