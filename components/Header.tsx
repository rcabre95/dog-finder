import { Dispatch, SetStateAction } from "react"
import LogoutBtn from "./shared-ui/LogoutBtn"
import { useState } from "react";


export default function Header({ needsConf, showFilters, setShowFilters, setShowConf }: { needsConf: boolean, showFilters: boolean, setShowFilters: Dispatch<SetStateAction<boolean>>, setShowConf: Dispatch<SetStateAction<boolean>> }) {


    const toggleFilters = () => {
        setShowFilters(!showFilters)
    }

    
  return (
    <header className={`w-full h-16 bg-purple-300 flex justify-between`}>
        <div>
            <h3>Furry Friend Finder</h3>
        </div>
        <div>
            <button onClick={toggleFilters} >Filters</button>
            <LogoutBtn needsConf={needsConf} setShowConf={setShowConf} />
        </div>
    </header>
  )
}
