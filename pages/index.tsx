import { Inter } from 'next/font/google'
import LoginForm from '@/components/LoginForm'
import Footer from '@/components/shared-ui/Footer'
import { Steps } from '@/components/Steps'
import IntroBanner from '@/components/IntroBanner'
import { useRef, ForwardedRef } from 'react'
import MetaTags from '@/components/shared-ui/MetaTags'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const stepsRef: ForwardedRef<HTMLElement> = useRef<HTMLElement>(null);

  

  return (
    <div className={`flex flex-col h-fit`}>
      <MetaTags
        title="Furry Friend Finder"
        pageUrl={process.env.NEXT_PUBLIC_HOME_URL!}
        description={`Find your furry friend today!`}
        imgUrl="/images/logo.png"
        keywords="dog, dogs, pet, pet shop, near me, pet shop near me, buy dog, buy dog near me, animals"
      />
      <main className={`h-fit w-screen flex flex-col items-center justify-center bg-whiie ${inter.className}`}>
        <IntroBanner stepsRef={stepsRef} />
        <Steps ref={stepsRef} />
        <LoginForm />
      </main>
      <Footer />
    </div>
  )
}