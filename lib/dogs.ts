import axios from "axios";

export interface Dog {
    id: string
    img: string
    name: string
    age: number
    zip_code: string
    breed: string
}

export async function getBreeds(): Promise<Array<string>> {
    try {
        const breeds: Array<string> = await axios.get(`${process.env.NEXT_PUBLIC_FETCH_URL}/dogs/breeds`, {
            withCredentials: true
        });
        return breeds
    } catch(err) {
        // throw new Error("Error in function: getBreeds:\n", { cause: err })
        throw err
    }
}

export async function getDogIds(): Promise<Array<string>> {
    try {
        const dogIds: Array<string> = await axios.get(`${process.env.NEXT_PUBLIC_FETCH_URL}/dogs/search`, {
            withCredentials: true
        })
        return dogIds
    } catch (err) {
        throw new Error("Error in funcion: getDogIds:\n", { cause: err })
    }
}

export async function getDogs(ids: Array<string>): Promise<Array<Dog>> {

    try {
        const dogs: Array<Dog> = await axios({
            method: "POST",
            url: `${process.env.NEXT_PUBLIC_FETCH_URL}/dogs`,
            data: ids
        });
        return dogs;
    } catch (err) {
        throw new Error("Error in funcion: getDogs", { cause: err })
    }
}

export async function getMatch(favorites: Array<string>): Promise<Dog | null> {
    try {
        const matchArray = await getDogs(favorites);
        if (matchArray.length > 0) { return matchArray[0] }
        else { return null };
    } catch (err) {
        throw new Error("Error in funcion: getMatch", { cause: err })
    }
}