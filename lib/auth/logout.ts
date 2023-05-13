import axios from "axios";

interface ILoginData {
    name: string;
    email: string
}

export default async function Logout() {
    let test = await axios({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_FETCH_AUTH_URL}`,
        data: null
    })

    console.log(test)
}