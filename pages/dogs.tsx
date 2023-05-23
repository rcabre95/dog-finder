import DogsSection from "@/components/DogsSection";
import PageNavigation from "@/components/shared-ui/PageNavigation";
import ResultsBanner from "@/components/ResultsBanner";
import { Dog } from "../lib/fetch_sdk"
import Header from "@/components/Header";
import Footer from "@/components/shared-ui/Footer";
import Filters from "@/components/Filters";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { SDK } from "@/lib/fetch_sdk";
import { Geo, MapPoint } from "@/lib/utils/distance";
import MetaTags from "@/components/shared-ui/MetaTags";
import YouMustBeLoggedIn from "@/components/shared-ui/YouMustBeLoggedIn";
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

    const prevPage = () => {
        if (page < 2) {
            alert("This is the first page.")
            return;
        }
        setLoadingDogs(true);
        setPage(page - 1);
    }

    const nextPage = () => {
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

    }, [page, ageRange, breeds, distance, location, sortDirection])

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
    }, [sortDirection, ageRange, breeds, distance, location])

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

    const formatBreeds = (toFormat: Array<string>) => {
        const formatted = toFormat.map((breed) => {
            return { name: breed, selected: false }
        })

        return formatted
    }
    
    useEffect(() => {
        console.log("on mount")
        SDK.getBreeds().then((d) => {
            if (d.status !== 200) {
                setIsLoggedIn(false)
            } else {
                const formattedBreeds: Array<IBreed> = formatBreeds(d.breeds);
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
        return {
            
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
    }, [location, ageRange, breeds, distance]);

    useEffect(() => {
        if (favorites.length === 10) {
            SDK.dogMatch(favorites).then((d: string) => {
                router.push({
                    pathname: '/match',
                    query: { dog: d }
                }, '/match')
            })
        }
    }, [favorites, router]);

    return (

        isLoggedIn ? (
        <div className={`w-screen h-fit relative flex flex-col`}>
            <MetaTags
                title="Furry Friend Finder"
                pageUrl={process.env.NEXT_PUBLIC_HOME_URL!}
                description={`Find your furry friend today!`}
                imgUrl="/images/logo.png"
            />
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
            <main className={`pt-16 flex flex-1 flex-col items-center h-fit mb-4`}>
                <ResultsBanner
                    total={total}
                    favorites={favorites}
                    sortDirection={sortDirection}
                    reSort={reSort}
                />
                <PageNavigation page={page} prevPage={prevPage} nextPage={nextPage} />
                <DogsSection
                    loadingDogs={loadingDogs}
                    dogs={dogs}
                    favorites={favorites}
                    handleFavorites={handleFavorites}
                />
                <PageNavigation page={page} prevPage={prevPage} nextPage={nextPage} />
            </main>
                <Footer />
            </div>)
            : <YouMustBeLoggedIn />
    )
}