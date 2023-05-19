import { Dog } from "@/lib/dogs";
import Image from "next/image";
import YouMustBeLoggedIn from "@/components/shared-ui/YouMustBeLoggedIn";
import { SDK } from "@/lib/fetch_sdk";
import LogoutBtn from "@/components/shared-ui/LogoutBtn";
import { GetServerSideProps } from "next"
import { useEffect, useState } from "react";
import Loader from "@/components/shared-ui/Loader";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const dogId: string = query.dog as string;
    

    return {
        props: {
            dogId: dogId
        }
    }
}

export default function Match({ dogId }: { dogId: string }) {
    // const { name, age, img, zip_code, breed } = match;
    const [dog, setDog] = useState<Dog | null>(null)
    const [status, setStatus] = useState<number | null>(null)

    useEffect(() => {
        SDK.getDog(dogId).then((d) => {
            setStatus(d.status);
            setDog(d.dog);
        })
    }, [])

    return (
        status ? (
        status !== 200 ?
        <YouMustBeLoggedIn />
        : dog ? 
        <div className={``}>
            <header className={`w-full h-16 bg-purple-300 flex items-center justify-between fixed z-40`}>
                <h3 className={`pl-2 text-xl`}>Furry Friend Finder</h3>
                <div className={` w-36 flex justify-between mr-2`}>
                <LogoutBtn needsConf={false} />
            </div>
            </header>
            <main className={`pt-16`}>
                <h1>Match</h1>
                <div className={`relative h-16 w-32`}>
                    <Image fill src={dog.img} alt={dog.name} />
                </div>
                <p>{dog.age}</p>
                <p>{dog.breed}</p>
                <p>{dog.zip_code}</p>
            </main>
        </div>
        : <Loader /> ) : <Loader />
        
    )
}