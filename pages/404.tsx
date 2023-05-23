import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"

export default function NotFound() {

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
    }, [timeLeft, router])

    return (
        <div className={`h-screen w-screen flex flex-col items-center justify-center`}>
            <h4>404: NOT FOUND</h4>
            <div  className={`h-52 w-72 relative rounded-md overflow-hidden`}>
                <Image fill src={`https://media.tenor.com/1sWoFUxwUyEAAAAd/dog-wow.gif`} alt={`awkward dog funny gif`} />
            </div>
            <p>Not sure what you&apos;re looking for...</p>
            <p>but it&apos;s not here.</p>
            <p className="text-center">If you&apos;re not automatically sent home in {timeLeft} seconds, <Link className={`hover:underline text-blue-400`} href={`/`}>click here.</Link></p>
        </div>

    )
}