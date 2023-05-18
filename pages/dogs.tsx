// import { getBreeds, getDogIds, getDogs } from "@/lib/dogs"
import DogCard from "@/components/shared-ui/DogCard";
import { Dog } from "@/lib/dogs";
import Header from "@/components/Header";
import { GetServerSideProps } from "next"
import { Filters } from "@/components/Filters";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useFieldArray, useForm } from 'react-hook-form'
import { SDK } from "@/lib/fetch_sdk";
import { Geo, MapPoint } from "@/lib/utils/distance";
import LogoutBtn from "@/components/shared-ui/LogoutBtn";
import YouMustBeLoggedIn from "@/components/shared-ui/YouMustBeLoggedIn";
import Loader from "@/components/shared-ui/Loader";

// export const getServerSideProps: GetServerSideProps = async (context) => {

//     return {
//         props: {
//             initBreeds: breeds,
//             dogs: dogs
//         }
//     }
// }

export type AgeRange = [number, number];
export type TSortDir = "asc" | "desc"

export interface IBreed {
    name: string,
    selected: boolean
}


// export default function Dogs({ dogs, initBreeds }: { dogs: Array<Dog>, initBreeds: Array<string> }) {
export default function Dogs() {
    const [loadingDogs, setLoadingDogs] = useState<boolean>(true)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
    const [total, setTotal] = useState<number | null>()
    const [breeds, setBreeds] = useState<Array<IBreed>>([]);
    const [distance, setDistance] = useState<number>(20);
    const [sortDirection, setSortDirection] = useState<TSortDir>("asc");
    const [favorites, setFavorites] = useState<Array<Dog>>([])
    const [page, setPage] = useState<number>(1);
    const [locationAvailable, setLocationAvailable] = useState<boolean>(true);
    const [location, setLocation] = useState<MapPoint>({ lat: 41.881832, lon: -87.623177 })
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [ageRange, setAgeRange] = useState<AgeRange>([0, 100])
    const [dogs, setDogs] = useState<Array<Dog>>([]);

    const prevPage = async () => {
        
    }

    const nextPage = async () => {

    }

    const confirmFilters = async (newBreeds: Array<IBreed>, newAgeRange: AgeRange, newDistance: number) => {
        setLoadingDogs(true);
        setBreeds(newBreeds);
        setAgeRange(newAgeRange);
        setDistance(newDistance);

        const deconstructedNewBreeds: Array<string> = newBreeds.map((newBreed: IBreed) => {
            return newBreed.name
        })

        const { minPoint, maxPoint } = Geo.getBoundingBox(location, newDistance);
        const newZipCodes = await SDK.getZipcodes(minPoint, maxPoint);
        const newDogs = await SDK.getDogs(deconstructedNewBreeds, newZipCodes, sortDirection, newAgeRange[0], newAgeRange[1]);

        setDogs(newDogs);
        setLoadingDogs(false);
        setShowFilters(false);
    }

    
    
    useEffect(() => {
        // var initZipCodes: string[] = ["60630"]
        SDK.getBreeds().then((d) => {
            if (d.status !== 200) {
                setIsLoggedIn(false)
            } else {
                const formattedBreeds: Array<IBreed> = d.breeds.map((breed) => {
                    return {
                        name: breed,
                        selected: true
                    }
                })
                setBreeds(formattedBreeds);
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(async (position) => {
                        const coords: MapPoint = {
                            lat: position.coords.latitude,
                            lon: position.coords.longitude
                        }
                        setLocation(coords);
                        const { minPoint, maxPoint } = Geo.getBoundingBox(location, distance);
                        // console.log([minPoint, maxPoint])
                        console.log(breeds.length)
                        SDK.getZipcodes(minPoint, maxPoint).then((zipCodes) => {
                            const deconstructedBreeds: Array<string> = breeds.map((breed) => {
                                return breed.name
                            })
                            SDK.getDogs(deconstructedBreeds, zipCodes, "asc", ageRange[0], ageRange[1]).then((d) => {
                                setDogs(d.dogs)
                                setTotal(d.total)
                            })
                            
                        })
                    })
                }
                
            }
            // change getBreeds so that it also returns status so it can be used to set isLogged in
        });

        setLoadingDogs(false)
    }, [])

    return (
        isLoggedIn ? 
        <div className={`w-screen h-fit`}>
            <Header showFilters={showFilters} setShowFilters={setShowFilters}></Header>
            <div>
                {total ? <h5>Search yielded {total} results</h5>: null}
                <p>You have {10 - favorites.length} hearts left before being matched</p>
            </div>
            <div className={`flex flex-wrap w-full justify-center`}>
                {dogs.length > 0 ? dogs.map((dog: Dog) => (
                    <DogCard
                        key={dog.id}
                        id={dog.id}
                        img={dog.img}
                        name={dog.name}
                        age={dog.age}
                        breed={dog.breed}
                        zip_code={dog.zip_code}
                    />
                ))
                : <Loader />}
            </div>
            {/* <pre>{JSON.stringify(dogs, null, 4)}</pre> */}
            {showFilters ?
                <Filters
                    breeds={breeds}
                    ageRange={ageRange}
                    distance={distance}
                    confirmFilters={confirmFilters}
                /> : null
            }
        </div>
        : <YouMustBeLoggedIn />
    )
}
