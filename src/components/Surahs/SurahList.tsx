import { getChapters } from "@/app/actions/surahs.actions";
import { SurahCard } from "@/components/Surahs/SurahCard";

export async function SurahList() {
    const data = await getChapters();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 w-full h-full overflow-y-auto gap-6">
            {data.map((surah) => (
                <SurahCard key={surah.id} data={surah} isSelected={surah.id === 1}/>
            ))}
            {data.map((surah) => (
                <SurahCard key={surah.id} data={surah}/>
            ))}
        </div>
    )
}