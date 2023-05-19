import { Dispatch, SetStateAction } from "react"
import LogoutBtn from "./shared-ui/LogoutBtn"
import { useState } from "react";
import { IBreed } from "@/pages/dogs";


export default function Header({ breeds, needsConf, showFilters, setShowFilters, setShowConf }: 
    { breeds: Array<IBreed>, needsConf: boolean, showFilters: boolean, setShowFilters: Dispatch<SetStateAction<boolean>>, setShowConf: Dispatch<SetStateAction<boolean>> }) {


    const toggleFilters = () => {
        setShowFilters(!showFilters)
    }

    const disabled = () => {
        return breeds.length < 1
    }

    
    return (
        <header className={`w-full h-16 bg-purple-300 flex items-center justify-between fixed z-40`}>
            <h3 className={`pl-2 text-xl`}>Furry Friend Finder</h3>
            <div className={` w-36 flex justify-between mr-2`}>
                <button className={`border rounded-sm shadow-sm bg-white disabled:bg-slate-400 w-16 h-8`} disabled={disabled()} onClick={toggleFilters} >Filters</button>
                <LogoutBtn needsConf={needsConf} setShowConf={setShowConf} />
            </div>
        </header>
    )
}
