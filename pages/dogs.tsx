// import { getBreeds, getDogIds, getDogs } from "@/lib/dogs"
import { Dog } from "@/lib/dogs";
import { GetServerSideProps } from "next"
import { useState, useEffect } from "react";
import { SDK } from "@/lib/fetch_sdk";
import { Geo, MapPoint } from "@/lib/utils/distance";
import LogoutBtn from "@/components/shared-ui/LogoutBtn";

// export const getServerSideProps: GetServerSideProps = async () => {
//     // await SDK.login("Bob", "Bob@bob.com");
//     await SDK.fetchBreeds();
//     // const dogs: Array<string> = await SDK.doDogSearch();
//     const breeds: Array<string> = [];
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

    const [breeds, setBreeds] = useState<Array<string>>([]);
    const [page, setPage] = useState<number>(1);
    const [locationAvailable, setLocationAvailable] = useState<boolean>(true);
    const [location, setLocation] = useState<Array<number>>()
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [dogs, setDogs] = useState<Array<string>>([])

    const prevPage = async () => {
        
    }

    const nextPage = async () => {

    }
    
    useEffect(() => {
        // var initZipCodes: string[] = ["60630"]
        SDK.getBreeds().then((d) => {
            setBreeds(d);
        });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const coords: MapPoint = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                }
                const { minPoint, maxPoint } = Geo.getBoundingBox(coords, 20);
                // console.log([minPoint, maxPoint])
                SDK.getZipcodes(minPoint, maxPoint).then((zipCodes) => {
                    SDK.getDogs(breeds, zipCodes).then((d) => {
                        // console.log(d)
                        setDogs(d)
                    })
                    
                })
            })
        } 
        console.log(dogs)
        // navigator.geolocation.getCurrentPosition(
        //     async function(position){
        //         // console.log(position.coords)
        //         const coords: MapPoint = {
        //             lat: position.coords.latitude,
        //             lon: position.coords.longitude
        //         }
                
        //         // console.log(coordinates)
        //         console.log(Geo.getBoundingBox(coords, 10))
        //         const { minPoint, maxPoint } = Geo.getBoundingBox(coords, 20);
        //         SDK.getZipcodes(minPoint, maxPoint).then((d) => {
        //             initZipCodes
        //         })
        //     },
        //     function(error) {
        //         if (error.code !== 0) {
        //             setLocationAvailable(false)
        //         }
        //     }
        // );

        //         SDK.getDogs(breeds, initZipCodes).then((d) => {
        //             setDogs(d)
        //         })

    }, [])

    return (
        <div className={``}>
            <LogoutBtn />
            {breeds ? <div>{JSON.stringify(breeds)}</div> : null}
            {dogs ? <div>{JSON.stringify(dogs)}</div> : null}
        </div>
    )
}

export function Filter() {

    return (
        <div>
        </div>
    )
}