import FetchSVG from "./FetchSVG"
import Image from 'next/image'
import Link from "next/link"

export default function IntroBanner({ stepsRef }: {  stepsRef: any }) { 
  // setting stepsRef to any gets rid of 'is possibly null' error.
  // normally this should be typed as ForwardedRef<HTMLElement>

  const scrollToSteps = () => {
    stepsRef.current.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className={`h-screen w-fit flex flex-col justify-center items-center`}>
      <div className={`w-fit h-5/6 flex flex-col justify-center`}>
        <p className={`text-xs md:text-sm w-full flex justify-start items-center h-6`}>Welcome to</p>
        <h1 className={`text-center text-4xl md:text-9xl font-light w-full text-myPurple`}>Furry Friend Finder</h1>
        <p className={`flex justify-end items-center text-xs md:text-sm w-full h-6`}>powered by <span className={`ml-2`}>
          <Link href={`https://fetch.com/`} target="_blank">
            <FetchSVG />
          </Link>
          </span>
        </p>
      </div>
      <div className={`h-1/6 flex flex-col justify-center items-center`}>
        <p className={`font-bold text-sm md:text-md text-center mb-4`}>Find your furry &#40;canine&#41; friend in <span className={`text-myPurple`}>three</span> easy steps!</p>
        <button className={`w-10 h-10 rounded-full border-2 border-myPurple relative`} onClick={scrollToSteps}>
          <Image fill src={`/svgs/down-arrow.svg`} alt={`down arrow svg`} />
        </button>
      </div>
    </section>
  )
}