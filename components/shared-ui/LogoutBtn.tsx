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
        <button className={`hover:border-0 rounded-md shadow-sm hover:bg-myBrown-dark hover:text-cream disabled:bg-slate-400 h-8 w- flex flex-row items-center justify-center bg-white border text-myBrown-dark transition-colors duration-300 px-4 py-2`} onClick={logoutConf} type="button">
            Log out
        </button>
    )
}