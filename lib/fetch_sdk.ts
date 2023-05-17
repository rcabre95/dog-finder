import axios, { AxiosInstance } from "axios"
import DEBUG_PRINT from "./utils/debug"
import { MapPoint } from "./utils/distance"

export interface Dog {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
}

export interface Location {
    zip_code: string;
    latitude: number;
    longitude: number;
    city: string;
    state: string;
    county: string;
}

axios.defaults.withCredentials = true

export class FetchSDK {
    private axiosInstance: AxiosInstance;

    constructor(private url: string) {
        this.axiosInstance = axios.create({
            baseURL: url
        });
    }

    public async login(name: string, email: string): Promise<number> {
        DEBUG_PRINT("HIGH", "Beginning Login endpoint...");
        const success = await this.axiosInstance.post(`/auth/login`, { name, email });

        DEBUG_PRINT("HIGH", `Completing login request\nStatus: ${success.status}`);
        return success.status;
    }

    public async logout(): Promise<any> {
        DEBUG_PRINT("HIGH", "Beginning Login endpoint...");
        try {
            const success = await this.axiosInstance.post(`/auth/logout`)
            return success.status
        } catch(err) {
            console.log(err);
            throw err
        }
    }

    public async getBreeds(): Promise<Array<string>> {
        try {
            const breeds: Array<string> = (await this.axiosInstance.get(`/dogs/breeds`)).data;
            DEBUG_PRINT("LOW", breeds)
            return breeds
        } catch(err) {
            console.log(err)
            throw err
        }
    }

    public async getZipcodes(bottomLeft: MapPoint, topRight: MapPoint) {
        // console.log([bottomLeft, topRight]);
        const locations: Array<string> = (await this.axiosInstance.post(`/locations/search`,
        {
            geoBoundingBox: {
                bottom_left: bottomLeft,
                top_right: topRight
        }}))
        .data.results.map((location: Location) => {
            return location.zip_code
        });
        // console.log(locations)
        return locations
    }

    public async getDogIds(
        breeds?: Array<string>,
        zipCodes?: Array<number | string>,
        ageMin: number = 0,
        ageMax: number = 100,
        direction?: string
        ): Promise<Array<string>>
    {
        console.log(`breeds: ${breeds}`)
        console.log(`zipCodes: ${zipCodes}`)
        console.log(`ageMin: ${ageMin}`)
        console.log(`ageMax: ${ageMax}`)
        console.log(`sort=breeds:${direction}`)
        
        try {
            const dogIds: Array<string> = (await this.axiosInstance.get(`/dogs/search`, {
                params: {
                    ...(breeds ? { breeds: breeds } : null),
                    ...(zipCodes ? { zipCodes: zipCodes } : null),
                    ...(ageMin ? { ageMin: ageMin } : null),
                    ...(ageMax ? { ageMax: ageMax } : null),
                    sort: `breeds:[${direction}]`
                    // sort: `breeds:${direction}`
                    // sort: `sort=breeds:${direction}`
                    // sort: `sort=breeds:[${direction}]`
                }
            })).data.resultIds
            // console.log(dogIds)
            return dogIds
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    public async getDogs(breeds: Array<string>, zipCodes: Array<string>, direction: string = "asc", ageMin?: number, ageMax?: number): Promise<any> {
        const ids: Array<string> = await this.getDogIds(breeds, zipCodes, ageMin, ageMax, direction);
        console.log(ids)
        try {
            const dogs = (await this.axiosInstance.post(`/dogs`,  ids )).data
            console.log(dogs)
            return dogs
        } catch(err) {
            console.log(err)
            throw err
        }
    }

    public async dogMatch(favorites: Array<string>): Promise<string> {
        const match: string = (await this.axiosInstance.post(`/dogs/match`, favorites)).data.match;
        console.log(match);
        return match
    }
}

export const SDK = new FetchSDK(process.env.NEXT_PUBLIC_FETCH_URL!);