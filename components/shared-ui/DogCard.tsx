import Image from "next/image";
import { Dog } from "@/lib/fetch_sdk";

export default function DogCard(props: Dog) {
    const { img, name, age, breed, zip_code } = props;

    return (
        <div className={`w-52 h-72 flex flex-col my-4 border rounded-md overflow-hidden shadow-sm`}>
            <div className={`relative w-full h-2/3`}>
                <button className={`absolute top-2 right-2 z-10 h-6 w-8`}>
                    <svg fill="#D3D3D3" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z" fill-rule="nonzero"/></svg>
                </button>
                <Image fill src={img} alt={`image of ${name}`} />
            </div>
            <div className="p-2">
                <h5>{name}</h5>
                <p>{age} years old.</p>
                <p>{breed}</p>
                <p>{zip_code}</p>
            </div>
        </div>
    )
}