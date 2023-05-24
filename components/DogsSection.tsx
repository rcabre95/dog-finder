import { Dog } from "@/lib/fetch_sdk"
import Loader from "./shared-ui/Loader"
import DogCard from "./shared-ui/DogCard"

export default function DogsSection({ loadingDogs, dogs, favorites, handleFavorites }: { loadingDogs: boolean, dogs: Array<Dog>, favorites: Array<string>, handleFavorites: (id: string) => void }) {

    return (
        <section className={`flex flex-wrap min-h-screen w-full justify-center md:w-4/6 ${loadingDogs ? "pt-4": null}`}>
            {loadingDogs ? 
                <div className={`h-full`}>

                    <Loader />
                </div>
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
        </section>
    )
}