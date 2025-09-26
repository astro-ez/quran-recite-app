import { getChapters } from "@/actions/surahs.actions";
import { SurahCard } from "@/components/surahs/surah-card";

export async function SurahList() {
    const { chapters: data } = await getChapters();

    return (
        <div className="w-full h-full">
            <div className="grid grid-cols-1 md:grid-cols-3 w-full h-full gap-5">
                {data.map((surah) => (
                    <SurahCard key={surah.id} data={surah} isSelected={surah.id === 1}/>
                ))}
            </div>
        </div>
    )
}