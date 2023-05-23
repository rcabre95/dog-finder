import { Dog } from "@/lib/fetch_sdk";
import Image from "next/image";
import YouMustBeLoggedIn from "@/components/shared-ui/YouMustBeLoggedIn";
import { SDK } from "@/lib/fetch_sdk";
import LogoutBtn from "@/components/shared-ui/LogoutBtn";
import { GetServerSideProps } from "next"
import { useEffect, useState } from "react";
import Loader from "@/components/shared-ui/Loader";
import SendMailForm from "@/components/SendMailForm";
import { useRouter } from "next/router";
import Footer from "@/components/shared-ui/Footer";
import MatchMain from "@/components/MatchMain";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    let dogId: string = "none";
    if (query.dog) {
        dogId = query.dog as string;
    }
    

    return {
        props: {
            dogId: dogId
        }
    }
}

export default function Match({ dogId }: { dogId: string }) {
    const [dog, setDog] = useState<Dog | null>(null);
    const [status, setStatus] = useState<number | null>(null);
    const router = useRouter()
    
    useEffect(() => {
        if (dogId === "none") {
            router.push("/dogs")
        }
        SDK.getDog(dogId).then((d) => {
            setStatus(d.status);
            if (d.status === 200) {
                setDog(d.dog)
            }
        })
    }, [])

    return (
        dogId === "none" ? <Loader /> : (
        status === 401 ?
        <YouMustBeLoggedIn /> : 
        (dog ?
        <MatchMain dog={dog} /> : <Loader />)
        )
    )
}