import React from 'react'
import Footer from './shared-ui/Footer'
import LogoutBtn from './shared-ui/LogoutBtn'
import Image from 'next/image';
import SendMailForm from './SendMailForm';
import { Dog } from '@/lib/fetch_sdk';

export default function MatchMain({ dog }: { dog: Dog }) {
    const anAges: Array<number> = [8, 11, 18]
    
    return (
    <div className={`h-screen`}>
            <header className={`w-full h-16 bg-cream flex items-center justify-between px-4 fixed z-20`}>
                <h3 className={`pl-2 text-2xl font-bold italic text-myBrown-dark`}>Furry Friend Finder</h3>
                <LogoutBtn needsConf={false} />
                
            </header>
            <main className={`pt-16 h-full flex flex-col items-center bg-myBrown-light`}>
                <section className={`w-5/6 h-2/3 flex flex-col items-center justify-center text-white`}>
                    <h3>Congratulations! You&apos;ve matched with...</h3>
                <h4 className={`text-3xl text-cream`}>{dog.name}</h4>
                <div className={`relative h-2/3 w-1/3 min-h-[14rem] min-w-[24rem] rounded-sm border border-white overflow-hidden`}>
                    <Image fill src={dog.img} alt={dog.name} />
                </div>
                <p className={`w-72 text-center text-lg`}>{`${dog.name} is ${anAges.indexOf(dog.age) > -1 ? "an": "a"} ${dog.age} year old ${dog.breed} who lives in the ${dog.zip_code} area, and can't wait to meet you!`}</p>
                </section>
                <section className={`w-fit max-w-full rounded-sm p-4 mb-4 h-1/3 bg-white flex flex-col items-center`}>
                    <p className={`text-md text-center md:text-xl font-bold mb-4`}>Please enter your information below to get {dog.name}&apos;s contact information sent directly to your email!</p>
                    <SendMailForm dog={dog} />
                </section>
            </main>
            <Footer />
        </div> 
    )
}
