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
            <header className={`w-full h-16 bg-purple-300 flex items-center justify-between fixed z-40`}>
                <h3 className={`pl-2 text-xl`}>Furry Friend Finder</h3>
                <div className={` w-36 flex justify-between mr-2`}>
                <LogoutBtn needsConf={false} />
            </div>
            </header>
            <main className={`pt-16 h-full flex flex-col items-center`}>
                <section className={`w-full h-2/3 flex flex-col items-center`}>
                    <h3>Congratulations! You've matched with...</h3>
                <h4 className={`text-3xl`}>{dog.name}</h4>
                <div className={`relative h-56 w-96`}>
                    <Image fill src={dog.img} alt={dog.name} />
                </div>
                <p className={`w-72 text-center text-lg`}>{`${dog.name} is ${anAges.indexOf(dog.age) > -1 ? "an": "a"} ${dog.age} year old ${dog.breed} who lives in the ${dog.zip_code} area, and can't wait to meet you!`}</p>
                </section>
                <section className={`w-full h-1/3 bg-cyan-200 flex flex-col items-center`}>
                    <p className={`text-xl font-bold mb-4`}>Please enter your information below to get {dog.name}'s contact information sent directly to your email!</p>
                    <SendMailForm dog={dog} />
                </section>
            </main>
            <Footer />
        </div> 
    )
}
