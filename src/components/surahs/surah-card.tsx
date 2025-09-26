import { Card, CardContent } from "@/components/ui/card";
import { Surah } from "@/entities/surah";

export function SurahCard({ data, isSelected = false }: { data: Surah, isSelected?: boolean }) {

    const bgColorSelected = isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted';

    return (
        <CardContent className={`bg-card flex p-2 w-full h-full justify-between gap-3 rounded-md hover:shadow-md hover:cursor-pointer ${isSelected ? 'border-2 border-muted-foreground/40' : ''}`}>
            <div className={`h-full w-[3.5rem] ${bgColorSelected} rounded-md flex items-center justify-center`}>
                {data.id}
            </div>
            <div className="flex flex-col justify-center flex-1">
                <p className="text-md font-semibold">{data.name_simple}</p>
                <p className="text-sm text-muted-foreground">{data.translated_name.name}</p>
            </div>
            <div className={`h-full w-[2.5rem] ${bgColorSelected} rounded-md flex flex-col items-center justify-center`}>
                <span className="text-[.725rem]">Ayat</span>
                <span>{data.verses_count}</span>
                <span className="text-[.625rem]">{data.revelation_place}</span>
            </div>
        </CardContent>
    )
}

export function SurahCardListMode({data, isSelected = false, onClick}: {data: Surah, isSelected?: boolean, onClick: () => void}) {
    return (
        <div className={`flex gap-2 w-full hover:bg-muted hover:text-primary-foreground rounded-lg p-2 text-muted-foreground ${isSelected && 'bg-muted text-muted-foreground font-semibold text-primary-foreground'}`} onClick={onClick}>
            <span className="text-sm w-5">{data.revelation_order}</span>
            <span className="text-sm flex-1">{data.name_simple}</span>
            <span className="text-sm">{data.name_arabic}</span>
        </div>
    )
}