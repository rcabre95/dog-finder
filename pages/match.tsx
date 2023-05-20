import { Dog } from "@/lib/dogs";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { sendEmail } from "@/lib/utils/send_email";
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
    const [dog, setDog] = useState<Dog | null>(null);
    const [status, setStatus] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const { register, handleSubmit, formState: {errors} } = useForm();

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
                <h3>Congratulations! You've matched with...</h3>
                <h4>{dog.name}</h4>
                <div className={`relative h-36 w-72`}>
                    <Image fill src={dog.img} alt={dog.name} />
                </div>
                <p>{dog.age}</p>
                <p>{dog.breed}</p>
                <p>{dog.zip_code}</p>

                <h4>You can now log out, or you can get the details sent to you email and be automatically logged out.</h4>
                <form className={``}
                onSubmit={handleSubmit(async (data) => {
                    setLoading(true);
                    let email = await sendEmail(data.name, data.email, dog.name, dog.zip_code);
                    if (email.status === 200) {
                        alert("Thanks for the message! I will get back to you at the email you provided.")
                    }
                    if (email.status === 500) {
                        alert("Something went wrong. Please try messaging me on my linkedin provided below.")
                    }
                    if (email.status === 450) {
                        alert("Not sure what you're trying to accomplish here... This is just a dev project.")
                    }
                    setLoading(false);
                })}>
                    
                </form>
            </main>
        </div>
        : <Loader /> ) : <Loader />
        
    )
}