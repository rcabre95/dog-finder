import axios from "axios";

interface ILoginData {
    name: string;
    email: string
}

axios.defaults.withCredentials = true

export default async function Login(data: any) {
    const { name, email } = data;

    const instance = axios.create({
        baseURL: `${process.env.NEXT_PUBLIC_FETCH_URL}`,
        timeout: 1000
    });

    let test = await instance.post(`/auth/login`, data)
    console.log(test)

    let test2 = await instance.get(`/dogs/breeds`);
    console.log(test2.data)

}


