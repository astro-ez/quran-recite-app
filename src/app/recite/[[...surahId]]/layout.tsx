import { getChapters } from "@/actions/surahs.actions";
import { ReciteSidebar } from "@/components/recite/sidebar";
import { QuranReadingProvider } from "@/context/quran-reading.context";
import { ReciteProvider } from "@/context/recite.context";

export default async function ReciteQuranLayout({ children, params}: {children: React.ReactNode, params: Promise<{surahId?: string[]}>}) {

    const { surahId } = await params;

    const resolvedSurahId = surahId ? (surahId.length === 1 ? surahId[0] : null) : null;

    const { chapters } = await getChapters();

    return (
        <ReciteProvider> 
            <QuranReadingProvider defaultSurahId={resolvedSurahId ? parseInt(resolvedSurahId): chapters?.[0]?.id}>
                <div className="bg-secondary w-full h-full p-3 md:p-5">
                    <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-3 md:gap-5 mx-auto h-full">
                        <div className="w-fit">
                            <ReciteSidebar chapters={chapters} />
                        </div>
                        <div className="w-full flex-1">
                            {children}
                        </div>
                    </div>
                </div>
            </QuranReadingProvider>
        </ReciteProvider>
    )
}

// this page is forced dynamic to build the docker image without backing the env variables 
export const dynamic = 'force-dynamic';