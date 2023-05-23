import { TSortDir } from "@/pages/dogs"

export default function ResultsBanner({ total, favorites, sortDirection, reSort }: { total: number | null | undefined, favorites: Array<string>, sortDirection: TSortDir, reSort: () => void }) {

    return (
        <section className="flex flex-col justify-center items-center mb-4 md:mb-2 ">
            <div className={`w-full mb-2`}>
            {total ? <h5 className={`text-2xl font-bold text-myBrown-dark`}>Search yielded <span className={`text-burnt`}>{total}</span> results</h5>: null}
            <p className={`text-sm text-myBrown-light`}>
                You have 
                <span className={`text-red-500 ml-1 mr-1`}>
                    {10 - favorites.length} 
                </span>
                hearts left before being matched
            </p>
            </div>
            {sortDirection ?
            <button onClick={reSort} className={`w-52 h-8 border rounded-md shadow-sm bg-cream border-myBrown-dark text-burnt hover:scale-110 transition-all duration-300`}>Sort: Breeds {sortDirection === "asc" ? "A-Z" : "Z-A" }</button>
            : null}
        </section>
    )
}