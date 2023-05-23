import { Dog } from "@/lib/fetch_sdk";
import YouMustBeLoggedIn from "@/components/shared-ui/YouMustBeLoggedIn";
import { SDK } from "@/lib/fetch_sdk";
import { GetServerSideProps } from "next"
import { useEffect, useState } from "react";
import Loader from "@/components/shared-ui/Loader";
import { useRouter } from "next/router";
import MatchMain from "@/components/MatchMain";
import MetaTags from "@/components/shared-ui/MetaTags";

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
    }, [dogId, router])

    return (
        <>
        <MetaTags
            title="Your Match!"
            pageUrl={`${process.env.NEXT_PUBLIC_HOME_URL!}/match`}
            description={`Find your furry friend today!`}
            imgUrl="/images/logo.png"
        />
        {dogId === "none" ? <Loader /> : (
        status === 401 ?
        <YouMustBeLoggedIn /> : 
        (dog ?

        <MatchMain dog={dog} /> 
        : <Loader />)
        )}
        </>
    )
}