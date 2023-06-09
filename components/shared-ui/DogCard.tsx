import Image from "next/image";
import { Dog } from "@/lib/fetch_sdk";

export default function DogCard({ id, img, name, age, breed, zip_code, favorites, handleFavorites }: { id: string, img: string, name: string, age: number, breed: string, zip_code: string, favorites: Array<string>, handleFavorites: (id: string) => void }) {

    return (
        <div className={`w-64 h-80 md:m-4 flex flex-col my-4 border border-myBrown-dark rounded-md overflow-hidden shadow-sm bg-cream`}>
            <div className={`relative w-full h-2/3`}>
                <button onClick={() => { handleFavorites(id) }} className={`absolute top-2 right-2 z-10 h-6 w-8 hover:scale-125 transition duration-200`} type="button" data-testid="heart-btn">
                    <svg fill={`${ favorites.includes(id) ? "#f84434" : "#D3D3D3" }`} clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z" fillRule="nonzero"/></svg>
                </button>
                <Image fill src={img} alt={`image of ${name}`} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            </div>
            <div className="p-2 flex flex-col">
                <div className={`flex w-full justify-between`}>
                    <h5 className={`text-burnt text-xl font-bold`}>{name}</h5>
                    <p className={`text-myBrown-dark text-lg`}>{zip_code}</p>
                </div>
                <div className={`w-full flex flex-col`}>
                    <p className={`text-myBrown-dark text-lg`}>{age} years old</p>
                    <p className={`text-myBrown-dark text-lg`}>{breed}</p>
                </div>
            
            </div>
        </div>
    )
}