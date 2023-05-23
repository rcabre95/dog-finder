export default function PageNavigation({ page, prevPage, nextPage }: { page: number, prevPage: () => void, nextPage: () => void }) {

    return (
    <nav className={`flex bg-white border w-1/2 md:w-1/6 max-w-lg min-w-fit justify-between h-10  items-center shadow-sm rounded-md overflow-hidden`}>
        <button onClick={prevPage} className={`w-1/4 h-full bg-white border-r-2 flex justify-center items-center transition-all hover:w-1/3 duration-300`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
            // @ts-ignore
            stroke="#8899a4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="arcs"><path d="M15 18l-6-6 6-6"></path></svg>
        </button>
        <div className={`font-bold text-gray-700 rounded-full bg-white flex items-center justify-center h-7 w-7 p-2`}>
            {page}
        </div>
        <button onClick={nextPage} className={`w-1/4 hover:w-1/3 transition-all border-l-2 h-full text-cream flex justify-center items-center duration-300`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
            // @ts-ignore
            stroke="#8899a4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="arcs"><path d="M9 18l6-6-6-6"></path></svg>
        </button>
    </nav>
    )
}