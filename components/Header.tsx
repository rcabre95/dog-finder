import { Dispatch, SetStateAction } from "react"
import LogoutBtn from "./shared-ui/LogoutBtn"

export default function Header({ showFilters, setShowFilters }: { showFilters: boolean, setShowFilters: Dispatch<SetStateAction<boolean>> }) {

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
            <LogoutBtn />
        </div>
    </header>
  )
}
