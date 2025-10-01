import { getChapters } from "@/actions/surahs.actions";
import { SurahList } from "@/components/surahs/surah-list";

export default async function HomePage() {

    const {chapters: surahs} = await getChapters();

    return (
        <div className="bg-secondary-background w-full min-h-screen">
            <div className="flex flex-col items-center">
                <div className="flex lg:w-[55%] my-8">
                    <SurahList surahs={surahs}/>
                </div>
            </div>
        </div>
    )
}