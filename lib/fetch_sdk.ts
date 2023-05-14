import axios, { AxiosInstance } from "axios"
import DEBUG_PRINT from "./utils/debug"

export interface Dog {
    id: string
    img: string
    name: string
    age: number
    zip_code: string
    breed: string
}

axios.defaults.withCredentials = true

export class FetchSDK {
    private axiosInstance: AxiosInstance;
    public temp: number = 0;

    constructor(private url: string) {
        this.axiosInstance = axios.create({
            baseURL: url
        });
    }

    public async login(name: string, email: string): Promise<number> {
        DEBUG_PRINT("HIGH", "Beginning Login endpoint...");
        this.temp++
        console.log(this.temp);
        const success = await this.axiosInstance.post(`/auth/login`, { name, email });
        // let success = await fetch(`${process.env.NEXT_PUBLIC_FETCH_URL}/auth/login`, {
        //     method: 'POST',
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ name, email })
        // })
        console.log(success)

        DEBUG_PRINT("HIGH", `Completing login request\nStatus: ${success.status}`);
        // console.log(success.status)
        return success.status;
    }

    public async logout(): Promise<void> {
        DEBUG_PRINT("HIGH", "Beginning Login endpoint...");

    }

    public async getBreeds(): Promise<Array<string>> {
        try {
            this.temp++
            console.log(this.temp)
            const breeds: Array<string> = (await this.axiosInstance.get(`/dogs/breeds`, {
                withCredentials: true
            })).data;
            console.log(breeds)
            DEBUG_PRINT("LOW", breeds)
            return breeds
        } catch(err) {
            console.log(err)
            throw err
        }
    }

    public async doDogSearch(
        breeds?: Array<string>,
        zipCodes?: Array<number | string>,
        ageMin?: number,
        ageMax?: number): Promise<Array<string>> 
    {

        try {
            const dogIds: Array<string> = await this.axiosInstance.get(`/dogs/search`, {
                withCredentials: true
            })
            return dogIds
        } catch (err) {
            throw new Error("Error in funcion: getDogIds:\n", { cause: err })
        }
    }

    // public async getDogs(ids: Array<string>): Promise<Array<Dog>> {

    // }

    // public async dogMatch(favorites: Array<string>): Promise<Dog> {

    // }
}

export const SDK = new FetchSDK(process.env.NEXT_PUBLIC_FETCH_URL!);