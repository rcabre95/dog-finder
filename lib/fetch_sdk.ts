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

export interface IBreedRes {
    breeds: Array<string>,
    status: number
}

export interface IDogIdsRes {
    resultIds: Array<string>;
    total: number
}

export interface IDogsRes {
    dogs: Array<Dog>;
    total: number;
}

export interface IDogMatchRes {
    dog: Dog;
    status: number;
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
            console.error(err);
            throw err
        }
    }

    public async getBreeds(): Promise<IBreedRes> {
        
        return this.axiosInstance.get(`/dogs/breeds`).then((res) => {
            return { breeds: res.data, status: res.status }
        }).catch((error) => {
            console.error(`Error in getBreeds: ${error}`)
            return { breeds: [], status: error.response.status }
        })
    }
    
    public async getZipcodes(bottomLeft: MapPoint, topRight: MapPoint): Promise<Array<string>> {

        return this.axiosInstance.post(`/locations/search`, {
            geoBoundingBox: {
                bottom_left: bottomLeft,
                top_right: topRight
            }
        }).then((d) => {
            let resLocations = d.data.results.map((location: Location) => {
                return location.zip_code
            })
            return resLocations
        }).catch((error) => {
            console.log(error);
            return []
        })
    }

    public async getDogIds(
        breeds?: Array<string>,
        zipCodes?: Array<number | string>,
        ageMin: number = 0,
        ageMax: number = 100,
        from: number = 0,
        direction?: string
        ): Promise<IDogIdsRes | any>
    {
        const size: number = 25;
        
        return this.axiosInstance(`/dogs/search`, {
            params: {
                sort: `breed:${direction}`,
                breeds,
                zipCodes,
                ageMin,
                ageMax,
                from,
                size
            }
        }).then((d) => {
            return { resultIds: d.data.resultIds, total: d.data.total}
        }).catch((error) => {
            console.log(error);
            return { resultIds: [], total: 0 }
        })
    }

    public async getDogs(breeds: Array<string>, zipCodes: Array<string>, direction: string = "asc", from: number, ageMin?: number, ageMax?: number): Promise<any> {
        const res = await this.getDogIds(breeds, zipCodes, ageMin, ageMax, from, direction );
        const ids = res.resultIds;
        const total = res.total;

        return this.axiosInstance.post(`/dogs`, ids ).then((d) => {
            return { dogs: d.data, total: total }
        }).catch((error) => {
            console.log(error);
            return { dogs: [], total: 0 }
        })
    }

    public async getDog(id: string): Promise<IDogMatchRes> {
        try {
            const res = (await this.axiosInstance.post(`/dogs`, [id] ))
            return { dog: res.data[0], status: res.status }
        } catch(err) {
            console.error(err);
            throw err;
        }
    }

    public async dogMatch(favorites: Array<string>): Promise<string> {
        const match: string = (await this.axiosInstance.post(`/dogs/match`, favorites)).data.match;
        // console.log(match);
        return match
    }
}

export const SDK = new FetchSDK(process.env.NEXT_PUBLIC_FETCH_URL!);