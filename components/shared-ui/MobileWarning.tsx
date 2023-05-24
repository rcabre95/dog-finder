import { Dispatch, SetStateAction, Fragment } from "react";
// import { CloseWarning } from "./Close";
import Close from "./Close";
import Link from "next/link";
import { Transition } from "@headlessui/react";

export default function MobileWarning({ showWarning, setShowWarning }: { showWarning: boolean, setShowWarning: Dispatch<SetStateAction<boolean>> }) {

    return (
        <Transition show={showWarning} as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className={`w-full h-fit pb-1 flex flex-col absolute top-0 inset-x-0 z-10 bg-myBrown-light`}>
                <Close setShow={setShowWarning} />
                <p className={`text-sm text-white ml-5`}>Looks like you&apos;re using a mobile browser.</p>
                <p className={`text-sm text-white ml-5`}>To make sure this site runs properly, please <Link className={`underline text-blue-300`} href={'https://ws.facil-iti.com/change-browser-settings.html#:~:text=Go%20to%20%E2%80%9CSettings%E2%80%9D,Allow%20Cross-Website%20Tracking%E2%80%9D'} target="_blank">allow cross-site tracking</Link></p>
            </div>
        </Transition>
    )
}