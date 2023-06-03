import { Dispatch, SetStateAction } from "react"
import LogoutBtn from "./shared-ui/LogoutBtn"
import { IBreed } from "@/pages/dogs";


export default function Header({ breeds, needsConf, showFilters, setShowFilters, setShowConf }: 
    { breeds: Array<IBreed>, needsConf: boolean, showFilters: boolean, setShowFilters: Dispatch<SetStateAction<boolean>>, setShowConf: Dispatch<SetStateAction<boolean>> }) {


    const toggleFilters = () => {
        setShowFilters(!showFilters)
    }

    // ensures user cannot select breeds before they are available
    const disabled = () => {
        return breeds.length < 1
    }

    
    return (
        <header className={`w-full h-16 bg-cream flex items-center justify-between fixed z-20`}>
            <h3 className={`pl-2 text-lg md:text-2xl font-bold italic text-myBrown-dark`}>Furry Friend Finder</h3>
            <div className={` w-fit px-4 flex justify-between mr-2`}>
                <button className={`border-0 rounded-md mr-2 shadow-sm bg-burnt text-cream disabled:bg-slate-400 w-16 h-8 hover:border hover:text-burnt hover:bg-cream hover:border-burnt transition-colors duration-300`} disabled={disabled()} onClick={toggleFilters} type="button" >Filters</button>
                <LogoutBtn needsConf={needsConf} setShowConf={setShowConf} />
            </div>
        </header>
    )
}
