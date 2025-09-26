import { VerseList } from "@/components/verse/verse-list";

export default async function RecitePage() {

    return (
        <div className="bg-secondary-background rounded-xl w-full h-full overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto">
                <VerseList />
            </div>
        </div>
    )
}