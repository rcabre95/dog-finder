import { SDK } from "@/lib/fetch_sdk"
import { useRouter } from "next/router";

export default function LogoutBtn() {
    const router = useRouter();

    const logoutRedirect = async () => {
        const status = await SDK.logout();
        if (status === 200) {
            router.push('/')
        } else {
            console.log("logout failed")
        }
    }

    return (
        <button onClick={logoutRedirect}>
            Log out
        </button>
    )
}