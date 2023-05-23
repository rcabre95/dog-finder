export default function PageNavigation({ page, prevPage, nextPage }: { page: number, prevPage: () => void, nextPage: () => void }) {

    return (
        <div className={`flex bg-green-400 w-full px-10 justify-around h-14 items-center `}>
                <button disabled={page < 2} onClick={prevPage} className={`rounded-sm bg-cyan-300`}>Prev</button>
                <div className={`font-bold text-gray-700 rounded-full bg-white flex items-center justify-center h-7 w-7 p-2`}>{page}</div>
                <button onClick={nextPage} className={`rounded-sm bg-cyan-300`}>Next</button>
            </div>
    )
}