import FetchSVG from "./FetchSVG"

export default function IntroBanner({ stepsRef }: {  stepsRef: any }) { 
  // setting stepsRef to any gets rid of 'is possibly null' error.
  // normally this should be typed as ForwardedRef<HTMLElement>

  const scrollToSteps = () => {
    stepsRef.current.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className={`h-screen w-5/6 flex flex-col justify-center`}>
      <p className={`text-xs md:text-sm`}>Welcome to</p>
      <h1 className={`text-center text-4xl md:text-9xl font-light`}>Furry Friend Finder</h1>
      <p className={`flex justify-end items-center text-xs md:text-sm bg-green-400`}>powered by <span className={``}>
        Fetch
        </span>
      </p>
      <p className={`font-bold text-sm md:text-md text-center`}>Find your furry &#40;canine&#41; friend in <span className={`text-blue-500`}>three</span> easy steps!</p>
      <button onClick={scrollToSteps}>Continue</button>
    </section>
  )
}