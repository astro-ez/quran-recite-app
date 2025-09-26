"use client"

import AudioTracker from "@/components/audio-player";
import { Select, SelectItem, SelectContent, SelectGroup, SelectTrigger } from "@/components/ui/select";
import { useReciteContext } from "@/context/recite.context";
import { useRecitations } from "@/hooks/useRecitations";
import { useSurahReciteAudio } from "@/hooks/useSurahReciteAudio";
import { useEffect } from "react";

export function ReciterAudio () {
    const { setSurahTimeStamps, setReciteAudioTime } = useReciteContext();

    const {data, isLoading, isError} = useRecitations();

    const { data: surahAudio, isPending: isPendingAudio, isError: isErrorAudio, mutate: mutateAudio } = useSurahReciteAudio();

    useEffect(() => {
        if (!isLoading && data?.recitations?.length) {
            mutateAudio({ chapterId: 1, reciterId: data.recitations[0].id });
        };
    }, [data, isLoading]);

    useEffect(() => {
        if (!isPendingAudio && surahAudio?.audio_file) {
            setSurahTimeStamps(surahAudio.audio_file);
        }
    }, [isPendingAudio, surahAudio]);

    return (
        <div className="absolute inset-x-0 bottom-0 h-[10rem] bg-secondary-background rounded-lg flex flex-col items-center justify-center border-muted border-1 p-4 shadow-md">
            {/* Select Surah select box */}

            {/* Select Reciter select box */}
            <Select>
                <SelectTrigger>
                    <span>{data?.recitations[0]?.reciter_name || "Select Reciter"}</span>
                </SelectTrigger>
                <SelectContent>
                    {isLoading && <div>Loading...</div>}
                    {isError && <div>Error loading recitations.</div>}
                    <SelectGroup>
                    {data?.recitations.map((recitation) => (
                        <SelectItem key={recitation.id} value={recitation.id.toString()}>
                            {recitation.reciter_name}
                        </SelectItem>
                    ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

            {/* Audio Player */}
            {!isPendingAudio && surahAudio?.audio_file && (
                <AudioTracker url={surahAudio.audio_file.audio_url} onTimeUpdate={(time) => setReciteAudioTime(time)} />
            )}

        </div>
    )
}