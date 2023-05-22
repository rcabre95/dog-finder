import DogCard from "@/components/shared-ui/DogCard";
import { Dog } from "../lib/fetch_sdk"
import Header from "@/components/Header";
import Footer from "@/components/shared-ui/Footer";
import { Filters } from "@/components/Filters";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { SDK } from "@/lib/fetch_sdk";
import { Geo, MapPoint } from "@/lib/utils/distance";
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
    const [location, setLocation] = useState<MapPoint>({lat: 0, lon: 0})
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [ageRange, setAgeRange] = useState<AgeRange>([0, 100])
    const [dogs, setDogs] = useState<Array<Dog>>([]);
    const [loadingDogs, setLoadingDogs] = useState<boolean>(true)
    const router = useRouter();

    const prevPage = async () => {
        if (page < 2) {
            alert("This is the first page.")
            return;
        }
        setLoadingDogs(true);
        setPage(page - 1);
    }

    const nextPage = async () => {
        const numPages: number = total! / 25;
        if (numPages < page + 1) {
            alert("This is the last page")
            return;
        }
        setLoadingDogs(true);
        setPage(page + 1);
    }

    useEffect(() => {
        console.log("on page update")
        let breedsCopy = JSON.parse(JSON.stringify(breeds));

        const deconstructedBreeds: Array<string> = [];
        for (let i = 0; i < breedsCopy.length; i++) {
            if (breedsCopy[i].selected === true) {
                deconstructedBreeds.push(breedsCopy[i].name)
            };
        };
        const startIdx = 25 * (page - 1);

        const { minPoint, maxPoint } = Geo.getBoundingBox(location, distance);
        SDK.getZipcodes(minPoint, maxPoint).then((newZipCodes) => {
            SDK.getDogs(deconstructedBreeds, newZipCodes, sortDirection, startIdx, ageRange[0], ageRange[1])
                .then((resDogs) => {
                    setDogs(resDogs.dogs);
                    setLoadingDogs(false);
                    window.scrollTo(0, 0);
                });
        });

    }, [page])

    const reSort = () => {
        setLoadingDogs(true)
        if (sortDirection == "asc") {
            setSortDirection("desc")
        } else {
            setSortDirection("asc")
        }
        setPage(1);
    }

    useEffect(() => {
        console.log("on sortDirection update")
        setLoadingDogs(true);

        let breedsCopy = JSON.parse(JSON.stringify(breeds));

        const deconstructedBreeds: Array<string> = [];
        for (let i = 0; i < breedsCopy.length; i++) {
            if (breedsCopy[i].selected === true) {
                deconstructedBreeds.push(breedsCopy[i].name)
            };
        };

        const { minPoint, maxPoint } = Geo.getBoundingBox(location, distance);

        SDK.getZipcodes(minPoint, maxPoint).then((newZipCodes) => {
            SDK.getDogs(deconstructedBreeds, newZipCodes, sortDirection, 0, ageRange[0], ageRange[1])
                .then((d) => {
                    setTotal(d.total);
                    setDogs(d.dogs);
                    setLoadingDogs(false);
                })
        });
    }, [sortDirection])

    const handleFavorites = (id: string) => {
        let favoritesCopy = JSON.parse(JSON.stringify(favorites));
        if (favoritesCopy.includes(id)) {
            const idx: number = favoritesCopy.indexOf(id);
            favoritesCopy.splice(idx, 1);
            setFavorites(favoritesCopy);
        } else {
            if (favorites.length > 9) {
                alert("You have run out of favorites")
            }
            favoritesCopy.push(id);
            setFavorites(favoritesCopy);
        }
    }

    const confirmFilters = async (newBreeds: Array<IBreed>, newAgeRange: AgeRange, newDistance: number) => {
        setLoadingDogs(true);
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
        const newZipCodes: Array<string> = await SDK.getZipcodes(minPoint, maxPoint);
        const resDogs = await SDK.getDogs(deconstructedNewBreeds, newZipCodes, sortDirection, 0, newAgeRange[0], newAgeRange[1]);
        const newDogs: Array<Dog> = resDogs.dogs
        const newTotal: number = resDogs.total

        setDogs(newDogs);
        setTotal(newTotal);
        setShowFilters(false);
        setLoadingDogs(false);
    }
    
    useEffect(() => {
        console.log("on mount")
        SDK.getBreeds().then((d) => {
            if (d.status !== 200) {
                setIsLoggedIn(false)
            } else {
                const formattedBreeds: Array<IBreed> = d.breeds.map((breed) => {
                    return {
                        name: breed,
                        selected: false
                    }
                })
                setBreeds(formattedBreeds);
                if (navigator.geolocation) {
                    console.log("navigator available")
                    navigator.geolocation.getCurrentPosition(async (position) => {
                        const coords: MapPoint = {
                            lat: position.coords.latitude,
                            lon: position.coords.longitude
                        }
                        setLocation(coords);
                    })
                } else {
                    console.log("navigator unavailable")
                    let defaultCoords = {
                        lat: 0,
                        lon: 0,
                    }
                    setLocation(defaultCoords)
                }
                
            }
        });
    }, [])

    useEffect(() => {
        console.log("on location update")
        const { minPoint, maxPoint } = Geo.getBoundingBox(location, distance);
        SDK.getZipcodes(minPoint, maxPoint).then((zipCodes) => {
            const deconstructedBreeds: Array<string> = [];
            for (let i = 0; i < breeds.length; i++) {
                if (breeds[i].selected === true) {
                    deconstructedBreeds.push(breeds[i].name)
                };
            };
            SDK.getDogs(deconstructedBreeds, zipCodes, "asc", 0, ageRange[0], ageRange[1]).then((d) => {
                setDogs(d.dogs);
                setTotal(d.total);
                setLoadingDogs(false);
            })
            
        })
    }, [location]);

    useEffect(() => {
        if (favorites.length === 10) {
            SDK.dogMatch(favorites).then((d: string) => {
                router.push({
                    pathname: '/match',
                    query: { dog: d }
                }, '/match')
            })
        }
    }, [favorites]);

    return (

        isLoggedIn ? (
        <div className={`w-screen h-fit relative flex flex-col`}>
            <Header
                breeds={breeds}
                needsConf={true}
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                setShowConf={setShowConf}
            />
            <ConfirmLogOut showConf={showConf} setShowConf={setShowConf} />
            {breeds.length > 0 ? 
                    <Filters
                        breeds={breeds}
                        ageRange={ageRange}
                        distance={distance}
                        showFilters={showFilters}
                        setShowFilters={setShowFilters}
                        confirmFilters={confirmFilters}
                        location={location}
                    />
                : null}
            <main className={`pt-16 flex flex-1 flex-col items-center min-h-screen`}>
                <div className="flex flex-col justify-center items-center">
                    <div className={`w-full mb-2`}>
                    {total ? <h5 className={`text-2xl font-bold`}>Search yielded <span className={`text-slate-400`}>{total}</span> results</h5>: null}
                    <p className={`text-sm`}>You have <span className={`text-red-500`}>{10 - favorites.length}</span> hearts left before being matched</p>
                    </div>
                    {sortDirection ?
                    <button onClick={reSort} className={`w-52 h-8 border rounded-md shadow-sm`}>Sort: Breeds {sortDirection === "asc" ? "A-Z" : "Z-A" }</button>
                    : null}
                </div>
                <div className={`flex flex-wrap w-full justify-center md:w-4/6 ${loadingDogs ? "pt-4": null}`}>
                    {loadingDogs ? 
                        <Loader />
                    :
                            Array.isArray(dogs) ? dogs.map((dog: Dog) => (
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
                            )): null
                        }
                </div>
            </main>
                <div className={`flex bg-green-400 w-full px-10 justify-around h-14 items-center `}>
                    <button disabled={page < 2} onClick={prevPage} className={`rounded-sm bg-cyan-300`}>Prev</button>
                    <div className={`font-bold text-gray-700 rounded-full bg-white flex items-center justify-center h-7 w-7 p-2`}>{page}</div>
                    <button onClick={nextPage} className={`rounded-sm bg-cyan-300`}>Next</button>
                </div>
                <Footer />
            </div>)
            : <YouMustBeLoggedIn />
    )
}
