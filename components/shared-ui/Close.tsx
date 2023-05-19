import Image from "next/image"
import { Dispatch, SetStateAction } from "react"

export default function Close({ setShowFilters }: { setShowFilters: Dispatch<SetStateAction<boolean>> }) {

    return (
        <div className={`w-full h-5 flex justify-start`}>
            <button onClick={() => { setShowFilters(false) }} className="relative h-full w-5">
                <Image fill src={`/gifs/x-close.svg`} alt={`close svg`} />
            </button>
        </div>
    )
}