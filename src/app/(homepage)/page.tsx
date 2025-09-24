import { SurahList } from "@/components/Surahs/SurahList";

export default async function HomePage() {

    return (
        <div className="bg-secondary-backgrond">
            <div className="flex flex-col items-center">
                <div className="flex h-full lg:w-[55%]">
                    <SurahList />
                </div>
            </div>
        </div>
    )
}