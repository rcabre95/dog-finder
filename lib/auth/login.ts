import axios from "axios";

interface ILoginData {
    name: string;
    email: string
}

export default async function Login(data: any) {
    const { name, email } = data;
    let test = await axios({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_FETCH_URL}/auth/login`,
        data: data
    })

    console.log(test)
}