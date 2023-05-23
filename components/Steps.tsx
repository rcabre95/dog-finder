import { forwardRef, ForwardedRef } from "react"
import Image from "next/image"

export const Steps = forwardRef(({}, ref: ForwardedRef<HTMLElement>) =>  {

  return (
    <section ref={ref}
    className={`h-fit py-8 w-full flex flex-col items-center`}>
      <ol className='w-5/6 md:w-4/6  h-fit'>
        <li className={`mb-8 md:mb-16 flex flex-col h-fit`}>
          <div className={`flex flex-col md:flex-row`}>
            <div className={`md:order-2 md:w-2/3 md:pl-4 md:flex md:flex-col md:justify-center`}>
              <h3 className={`text-sm font-bold md:text-lg`}>Step One</h3>
              <p className={`text-4xl font-extralight md:text-6xl md:mb-8`}>Log in</p>
              <p className={`text-lg hidden md:block text-left`}>Simply enter your name and email below to start the matching process!</p>
            </div>
            <div className={`h-52 md:h-96 md:w-1/3 w-80 relative rounded-md overflow-hidden mb-2 md:order-1`}>
              <Image fill src={`https://media.tenor.com/-p-p8MvwM3AAAAAC/dog-funny.gif`} alt={`dog computer funny gif`}  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            </div>
          </div>
          <p className={`text-sm block md:hidden`}>Simply enter you name and email below to start the matching process!</p>
        </li>
        <li className={`mb-8 md:mb-16 flex flex-col h-fit w-full`}>
          <div className={`flex flex-col md:flex-row`}>
            <div className={`md:order-1 md: md:pl-4 md:flex md:flex-col md:justify-center md:w-2/3`}>
              <h3 className={`text-sm font-bold md:text-lg`}>Step Two</h3>
              <p className={`text-4xl font-extralight md:text-6xl md:mb-8`}>Pick out some dogs</p>
              <p className={`text-lg hidden md:block `}>Once you get to the selection page, you need to select 10 of your favorite dogs to be automatically matched with your future furry friend! You can also use the filters to get very specific about what kind of dog you want.</p>
            </div>
            <div
            className={`h-52 md:h-96 md:w-1/3 w-80 relative rounded-md overflow-hidden mb-2 md:order-2`}>
              <Image fill src={`https://media.tenor.com/pIthFxQEgIEAAAAd/pick-a-cup-i-choose-you.gif`} alt={`dog choosing cup funny gif`}  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            </div>
          </div>
          <p className={`text-sm block md:hidden`}>Once you get to the selection page, you need to select 10 of your favorite dogs to be automatically matched with your future furry friend! You can also use the filters to get very specific about what kind of dog you want.</p>
        </li>
        <li className={`mb-8 md:mb-16 flex flex-col h-fit w-full`}>
          <div className={`flex flex-col md:flex-row`}>
            <div className={`md:order-2 md: md:pl-4 md:flex md:flex-col md:justify-center md:w-2/3`}>
              <h3 className={`text-sm font-bold md:text-lg`}>Step Three</h3>
              <p className={`text-4xl font-extralight md:text-6xl md:mb-8`}>Get matched!</p>
              <p className={`text-lg hidden md:flex`}>Once you&apos;ve selected you favorites, you will be automatically shown your match, and will be provided with contact details on request.</p>
            </div>
            <div className={`h-52 md:h-96 md:w-1/3 min-w- w-80 relative rounded-md overflow-hidden mb-2 md:order-1`}>
              <Image fill src={`https://media.tenor.com/9d_np0GQ1lgAAAAC/dog-shake-paw.gif`} alt={`dog match gif`}  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            </div>
          </div>
          <p className={`text-sm block md:hidden`}>Once you&apos;ve selected you favorites, you will be automatically shown your match, and will be provided with contact details on request.</p>
        </li>
      </ol>
      <div>
        <p>Ready to get started?</p>
      </div>
    </section>
  )
})
Steps.displayName = "Steps"