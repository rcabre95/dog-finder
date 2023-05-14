// import { getBreeds, getDogIds, getDogs } from "@/lib/dogs"
import { Dog } from "@/lib/dogs";
import { GetServerSideProps } from "next"
import { useState, useEffect } from "react";
import { SDK } from "@/lib/fetch_sdk";

// export const getServerSideProps: GetServerSideProps = async () => {
//     await SDK.login("Bob", "Bob@bob.com");
//     const breeds: Array<string> = await SDK.getBreeds();
//     // const dogs: Array<string> = await SDK.doDogSearch();
//     // const breeds: Array<string> = [];
//     const dogs: Array<string> = [];
//     console.log(SDK.temp);

//     return {
//         props: {
//             initBreeds: breeds,
//             dogs: dogs
//         }
//     }
// }

// export default function Dogs({ dogs, initBreeds }: { dogs: Array<Dog>, initBreeds: Array<string> }) {
export default function Dogs() {

    const [breeds, setBreeds] = useState<Array<string>>();
    const [page, setPage] = useState<number>(1);
    const [showFilters, setShowFilters] = useState<boolean>(false);

    const prevPage = async () => {
        
    }

    const nextPage = async () => {

    }

    
    useEffect(() => {
        SDK.getBreeds().then((d) => {
            setBreeds(d)
        })
        
    }, [])

    return (
        <div className={``}>
            {breeds ? <div>{JSON.stringify(breeds)}</div> : null}
        </div>
    )
}

export function Filter() {

    return (
        <div>
        </div>
    )
}