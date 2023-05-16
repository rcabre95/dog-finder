import { forwardRef, ForwardedRef } from "react"
import Image from "next/image"

export const Steps = forwardRef(({}, ref: ForwardedRef<HTMLElement>) =>  {

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
      <div>
        <p>Ready to get started?</p>
      </div>
    </section>
  )
})
Steps.displayName = "Steps"