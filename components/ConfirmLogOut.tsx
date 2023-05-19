import { SDK } from "@/lib/fetch_sdk";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react"

export default function ConfirmLogOut({ showConf, setShowConf }: { showConf: boolean, setShowConf: Dispatch<SetStateAction<boolean>> }) {
    const router = useRouter();

    const logoutRedirect = async () => {
        setShowConf(false);
        const status = await SDK.logout();
        if (status === 200) {
            router.push('/')
        } else {
            console.log("logout failed")
        }
    }

    const continueBrowsing = () => {
        setShowConf(false);
    }

    return (
        // <div>
        //     <h5>Are you sure you want to log out?</h5>
        //     <p>You have not yet been matched with a dog!</p>
        //     <div>
        //         <button onClick={logoutRedirect}>Log Out</button>
        //         <button onClick={continueBrowsing}>Continue matching</button>
        //     </div>
        // </div>

    <Transition appear show={showConf} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={continueBrowsing}>
            <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                    >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                        >
                        Are you sure you want to log out?
                        </Dialog.Title>
                        <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            You have not yet been matched with a dog!
                        </p>
                        </div>

                        <div className="mt-4">
                        <button type="button" onClick={logoutRedirect}>
                            Log out
                        </button>
                        <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={continueBrowsing}
                        >
                            Continue matching
                        </button>
                        </div>
                    </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition>
    )
}