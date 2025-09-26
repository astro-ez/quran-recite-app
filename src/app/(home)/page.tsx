import { SurahList } from "@/components/surahs/surah-list";
import { redirect } from "next/navigation";

export default async function HomePage() {
    redirect('/recite');

    return (
        <div className="bg-secondary-background">
            <div className="flex flex-col items-center">
                <div className="flex lg:w-[55%]">
                    <SurahList />
                </div>
            </div>
        </div>
    )
}