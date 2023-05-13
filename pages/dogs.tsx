import { getDogIds, getDogs } from "@/lib/dogs"
import { GetServerSideProps } from "next"

export const getServerSideProps: GetServerSideProps = async () => {
    const dogs = await getDogIds();
    console.log(dogs)

    return {
        props: {
            dogs: dogs
        }
    }
}

export default function Dogs() {

    return (
        <div className={``}>

        </div>
    )
}