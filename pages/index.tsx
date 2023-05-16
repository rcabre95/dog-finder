import { Inter } from 'next/font/google'
import FetchSVG from '@/components/FetchSVG'
import LoginForm from '@/components/LoginForm'
import Footer from '@/components/shared-ui/Footer'
import Image from 'next/image'
import { useRef, forwardRef, ForwardedRef } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const stepsRef: ForwardedRef<HTMLElement> = useRef<HTMLElement>(null);

  const scrollToSteps = () => {
    stepsRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <main
        className={`h-fit w-screen flex flex-col items-center justify-center bg-slate-200 ${inter.className}`}>
        <section className={`h-screen w-5/6 flex flex-col justify-center`}>
          <p className={`text-xs md:text-sm`}>Welcome to</p>
          <h1 className={`text-center text-4xl md:text-9xl font-light`}>Furry Friend Finder</h1>
          <p className={`flex justify-end items-center text-xs md:text-sm bg-green-400`}>powered by <span className={``}>
            Fetch
            </span>
          </p>
          <p className={`font-bold text-sm md:text-md text-center`}>Find your furry 	&#40;canine&#41; friend in <span className={`text-blue-500`}>three</span> easy steps!</p>
          <button onClick={scrollToSteps}>Continue</button>
        </section>
        <Steps ref={stepsRef} />
      </main>
      <Footer />
    </>
  )
}

const Steps = forwardRef(({}, ref: ForwardedRef<HTMLElement>) =>  {

  return (
    <section ref={ref}
    className={`h-fit py-8 w-full flex flex-col items-center`}>
      <ol className='w-5/6'>
        <li>
          <h3>One</h3>
          <p>Log in</p>
          <div className={`h-52 w-full relative rounded-md overflow-hidden`}>
            <Image fill src={`https://media.tenor.com/-p-p8MvwM3AAAAAC/dog-funny.gif`} alt={`dog computer funny gif`} />
          </div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, reiciendis assumenda ea mollitia eos facilis sequi modi enim perferendis atque culpa non. Fuga praesentium nulla obcaecati, exercitationem aperiam illo voluptatum.</p>
        </li>
        <li>
          <h3>Two</h3>
          <p>Pick out some dogs.</p>
          <div className={`h-52 w-full relative rounded-md overflow-hidden`}>
            <Image fill src={`https://media.tenor.com/pIthFxQEgIEAAAAd/pick-a-cup-i-choose-you.gif`} alt={`dog choosing cup funny gif`} />
          </div>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt ea architecto quos assumenda nisi cumque, neque sequi perspiciatis odit nam officia in fugiat omnis non et delectus aut optio ipsam?</p>
        </li>
        <li>
          <h3>Three</h3>
          <p>Get matched!</p>
          <div className={`h-52 w-full relative rounded-md overflow-hidden`}>
            <Image fill src={`https://media.tenor.com/9d_np0GQ1lgAAAAC/dog-shake-paw.gif`} alt={`dog match gif`} />
          </div>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id assumenda quasi amet quae maxime suscipit ex iste placeat, minus aperiam nihil! Quam totam quos rem nostrum labore porro reiciendis atque?</p>
        </li>
      </ol>
    </section>
  )
})
Steps.displayName = "Steps"