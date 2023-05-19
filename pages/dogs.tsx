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
import ConfirmLogOut from "@/components/ConfirmLogOut";

export type AgeRange = [number, number];
export type TSortDir = "asc" | "desc"
export interface IBreed {
    name: string,
    selected: boolean
}

export default function Dogs() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
    const [total, setTotal] = useState<number | null>();
    const [showConf, setShowConf] = useState<boolean>(false);
    const [breeds, setBreeds] = useState<Array<IBreed>>([]);
    const [distance, setDistance] = useState<number>(20);
    const [sortDirection, setSortDirection] = useState<TSortDir>("asc");
    const [favorites, setFavorites] = useState<Array<string>>([])
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

    const handleFavorites = (id: string) => {
        let favoritesCopy = JSON.parse(JSON.stringify(favorites));
        if (favoritesCopy.includes(id)) {
            console.log("already favorited... removing")
            const idx: number = favoritesCopy.indexOf(id);
            favoritesCopy.splice(idx, 1);
            console.log(favoritesCopy)
            setFavorites(favoritesCopy);
            console.log(favorites)
        } else {
            if (favorites.length > 9) {
                alert("You have run out of favorites")
            }
            console.log("not yet favorited... adding")
            favoritesCopy.push(id);
            console.log(favoritesCopy);
            setFavorites(favoritesCopy);
            console.log(favorites)
        }
        console.log(favorites)
    }

    const confirmFilters = async (newBreeds: Array<IBreed>, newAgeRange: AgeRange, newDistance: number) => {
        setDogs([]);
        setBreeds(newBreeds);
        setAgeRange(newAgeRange);
        setDistance(newDistance);

        const deconstructedNewBreeds: Array<string> = [];
        for (let i = 0; i < newBreeds.length; i++) {
            if (newBreeds[i].selected === true) {
                deconstructedNewBreeds.push(newBreeds[i].name)
            };
        };

        const { minPoint, maxPoint } = Geo.getBoundingBox(location, newDistance);
        const newZipCodes = await SDK.getZipcodes(minPoint, maxPoint);
        const newDogs = await SDK.getDogs(deconstructedNewBreeds, newZipCodes, sortDirection, newAgeRange[0], newAgeRange[1]);

        setDogs(newDogs);
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
                        console.log(breeds!.length)
                        SDK.getZipcodes(minPoint, maxPoint).then((zipCodes) => {
                            const deconstructedBreeds: Array<string> = breeds!.map((breed) => {
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
        });
    }, [])

    return (

        isLoggedIn ? 
        <div className={`w-screen h-fit`}>
            <Header
                needsConf={true}
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                setShowConf={setShowConf}
            />
            <ConfirmLogOut showConf={showConf} setShowConf={setShowConf} />
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
                        favorites={favorites}
                        handleFavorites={handleFavorites}
                    />
                ))
                : <Loader />}
            </div>
            {/* <pre>{JSON.stringify(dogs, null, 4)}</pre> */}
            {breeds.length > 0 ? 
                <Filters
                    breeds={breeds}
                    ageRange={ageRange}
                    distance={distance}
                    showFilters={showFilters}
                    setShowFilters={setShowFilters}
                    confirmFilters={confirmFilters}
                />
            : null}
            
        </div>
        : <YouMustBeLoggedIn />
    )
}
