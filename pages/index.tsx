import LoginForm from '@/components/LoginForm'
import Footer from '@/components/shared-ui/Footer'
import { Steps } from '@/components/Steps'
import IntroBanner from '@/components/IntroBanner'
import { useRef, ForwardedRef } from 'react'
import { useState, useEffect } from "react"
import MetaTags from '@/components/shared-ui/MetaTags'
import MobileWarning from '@/components/shared-ui/MobileWarning'

export default function Home() {

  const stepsRef: ForwardedRef<HTMLElement> = useRef<HTMLElement>(null);
  const [showWarning, setShowWarning] = useState<boolean>(false);

  useEffect(() =>{
    const screenWidth = window.innerWidth;
    if (screenWidth < 769) {
      setShowWarning(true)
    }
  }, [])

  return (
    <div className={`flex flex-col h-fit relative`}>
      <MetaTags
        title="Furry Friend Finder"
        pageUrl={process.env.NEXT_PUBLIC_HOME_URL!}
        description={`Find your furry friend today!`}
        imgUrl="/images/logo.png"
        keywords="dog, dogs, pet, pet shop, near me, pet shop near me, buy dog, buy dog near me, animals"
      />
      <MobileWarning showWarning={showWarning} setShowWarning={setShowWarning} />
      <main className={`h-fit w-screen flex flex-col items-center justify-center bg-cream`}>
        <IntroBanner stepsRef={stepsRef} />
        <Steps ref={stepsRef} />
        <LoginForm />
      </main>
      <Footer />
    </div>
  )
}