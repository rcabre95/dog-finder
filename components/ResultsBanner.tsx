import { TSortDir } from "@/pages/dogs"

export default function ResultsBanner({ total, favorites, sortDirection, reSort }: { total: number | null | undefined, favorites: Array<string>, sortDirection: TSortDir, reSort: () => void }) {

    return (
        <div className="flex flex-col justify-center items-center">
            <div className={`w-full mb-2`}>
            {total ? <h5 className={`text-2xl font-bold`}>Search yielded <span className={`text-slate-400`}>{total}</span> results</h5>: null}
            <p className={`text-sm`}>You have <span className={`text-red-500`}>{10 - favorites.length}</span> hearts left before being matched</p>
            </div>
            {sortDirection ?
            <button onClick={reSort} className={`w-52 h-8 border rounded-md shadow-sm`}>Sort: Breeds {sortDirection === "asc" ? "A-Z" : "Z-A" }</button>
            : null}
        </div>
    )
}