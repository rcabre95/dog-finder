import { SDK } from "@/lib/fetch_sdk";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

export default function LogoutBtn({ needsConf=false, setShowConf }: { needsConf: boolean, setShowConf?: Dispatch<SetStateAction<boolean>> }) {
    const router = useRouter();

    const logoutRedirect = async () => {
        const status = await SDK.logout();
        if (status === 200) {
            router.push('/')
        } else {
            console.log("logout failed")
        }
    }

    const logoutConf = () => {
        if (needsConf) {
            setShowConf!(true);
        } else {
            logoutRedirect();
        }
    }

    return (
        <button className={`border bg-white w-16 h-8`} onClick={logoutConf}>
            Log out
        </button>
    )
}