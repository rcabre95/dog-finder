import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"

export default function ServerError() {

    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState<number>(10);

    useEffect(() => {
        const interval = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft])

    useEffect(() => {
        if (timeLeft === 0) {
            router.push('/')
        }
    }, [timeLeft])

    return (
        <div className={`h-screen w-screen flex flex-col items-center justify-center`}>
            <h4>500: Server Error</h4>
            <div  className={`h-52 w-72 relative rounded-md overflow-hidden`}>
                <Image fill src={`https://media.tenor.com/5-oJdjeBnD0AAAAC/hiding-doggys.gif`} alt={`dog hiding face funny gif`} />
            </div>
            <p>Oh this is embarassing...</p>
            <p>Something is wrong on our end, so we're sending you back home.</p>
            <p className="text-center">If you're not automatically sent home in {timeLeft} seconds, <Link className={`hover:underline text-blue-400`} href={`/`}>click here.</Link></p>
        </div>

    )
}