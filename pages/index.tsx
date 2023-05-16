import { Inter } from 'next/font/google'
import LoginForm from '@/components/LoginForm'
import Footer from '@/components/shared-ui/Footer'
import { Steps } from '@/components/Steps'
import IntroBanner from '@/components/IntroBanner'
import { useRef, ForwardedRef } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const stepsRef: ForwardedRef<HTMLElement> = useRef<HTMLElement>(null);

  

  return (
    <>
      <main className={`h-fit w-screen flex flex-col items-center justify-center bg-slate-200 ${inter.className}`}>
        <IntroBanner stepsRef={stepsRef} />
        <Steps ref={stepsRef} />
        <LoginForm />
      </main>
      <Footer />
    </>
  )
}