import Image from "next/image"
import { Dispatch, SetStateAction } from "react"

export default function Close({ setShow }: { setShow: Dispatch<SetStateAction<boolean>> }) {

    return (
        <div className={`w-full h-5 flex justify-start`}>
            <button type="button" onClick={() => { setShow(false) }} className="relative h-full w-5 rounded-full hover:bg-slate-300 transition-colors duration-200">
                <Image fill src={`/svgs/x-close.svg`} alt={`close svg`} />
            </button>
        </div>
    )
}