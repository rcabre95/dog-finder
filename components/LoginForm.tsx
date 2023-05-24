import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { SDK } from '@/lib/fetch_sdk'
import Loader from './shared-ui/Loader'


export default function LoginForm({ saveData }: { saveData?: () => void }) {

    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (

    <section className={`w-full h-fit flex flex-col items-center justify-center`}>
        <h3 className={`text-4xl mb-8`}>Login</h3>
        <form className={`flex flex-col w-fit items-center`}
            onSubmit={handleSubmit(async (data) => {
            setLoading(true);
            if (saveData) {
                saveData();
            }
            SDK.login(data.name, data.email).then((d) => {
                if (d === 200) {
                    router.push('/dogs');
                } else {
                    alert("Something went wrong with our servers...")
                }
                setLoading(false);
            })
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

            <button disabled={loading} className={`hover:border-0 h-10 w-28 mb-4 flex justify-center items-center rounded-md shadow-sm hover:bg-burnt hover:text-cream disabled:bg-slate-400 border text-burnt bg-cream border-burnt transition-colors duration-300`} type="submit">{loading ? <Loader /> : "Submit"}</button>
        </form>
    </section>
    )
}