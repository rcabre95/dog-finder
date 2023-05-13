import axios from "axios";

interface Dog {
    id: string
    img: string
    name: string
    age: number
    zip_code: string
    breed: string
}

export async function getDogIds() {
    try {
        const dogIds = await axios.get(`${process.env.NEXT_PUBLIC_FETCH_URL}/dogs/search`, {
            headers: {

            }
        })
        return dogIds
    } catch (err) {
        console.log(err)
    }
    
}

export async function getDogs(ids: Array<string>): Promise<Array<Dog>> {
    const empty: Array<Dog> = []

    try {
        const dogs: Array<Dog> = await axios.post(`${process.env.NEXT_PUBLIC_FETCH_URL}/dogs`)
        return dogs
    } catch (err) {
        console.log(err);
        return empty
    }
}

export async function getMatch(favorites: Array<string>) {
    try {
        const matchArray = await getDogs(favorites);
        if (matchArray.length > 0) return matchArray[0];
    } catch (err) {
        console.log(err)
    }
}