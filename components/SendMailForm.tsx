import { sendEmail } from "@/lib/utils/send_email";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";
import Loader from "@/components/shared-ui/Loader";
import { Dog } from "@/lib/fetch_sdk";

// need to make reusable and replace loginform or vice-versa
export default function SendMailForm({ dog, saveData }: { dog: Dog, saveData?: (data: any) => void }) {
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter()
    const { register, handleSubmit, formState: {errors} } = useForm();


    return (
        <form className={`flex flex-col w-fit items-center`}
            onSubmit={handleSubmit(async (data) => {
                setLoading(true);
                if(saveData) {
                    saveData(data)
                }
                let email = await sendEmail(data.name, data.email, dog.name, dog.zip_code);
                if (email.status === 200) {
                    alert("Thanks for choosing furry friend finder! An email containing the contact information has been sent to the provided email");
                    router.push("/")
                }
                if (email.status === 500) {
                    alert("Something went wrong. Please try again later");
                }
                if (email.status === 450) {
                    alert("Oops... something was wrong with the way that was sent.");
                }
                setLoading(false);
        })}
        >
            <div className={`w-full flex justify-center items-center rounded-md border py-2 px-4 bg-white ${errors.name ? null : "mb-5" }`}>
                <label className={`mr-2`} htmlFor="name">Name:</label>
                <input id='name' className={`w-5/6 flex`}
                    {...register("name",
                    {
                        required: "You must enter a name.",
                        minLength: {
                        value: 3,
                        message: "Your name must be at least 3 characters long."
                        }
                    }
                    )}
                    type="text"
                    placeholder='Enter your name...'
                />
            </div>
            <p className={`${errors.name ? "block" : "hidden"} mb-1 text-xs text-red-600`}>
                    {errors.name ? errors.name.message?.toString() : null}
            </p>

            <div className={`w-full flex justify-center items-center rounded-md border py-2 px-4 bg-white ${errors.email ? null : "mb-5" }`}>
                <label className={`mr-3`} htmlFor="email">Email:</label>
                <input id="email" className={`w-5/6 flex`}
                    {...register("email",
                    {
                        required: "You must enter your email.",
                        pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter a valid email address."
                        }
                    }
                    )}
                    type="text"
                    placeholder='Enter your email...'
                />
            </div>
                <p className={`${errors.email ? "block" : "hidden"} mb-1 text-xs text-red-600`}>
                    {errors.email ? errors.email.message?.toString() : null}
                </p>

            <button disabled={loading} className={`hover:border-0 h-10 w-28 flex justify-center items-center rounded-md shadow-sm hover:bg-burnt hover:text-cream disabled:bg-slate-400 border text-burnt bg-cream border-burnt transition-colors duration-300`} type="submit">{loading ? <Loader /> : "Submit"}</button>
        </form>
    )
}
