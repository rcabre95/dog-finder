import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { SDK } from '@/lib/fetch_sdk'
import Loader from './shared-ui/Loader'


export default function LoginForm() {

    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (

    <section className={`bg-green-300 w-full h-fit flex flex-col items-center justify-center`}>
        <h3 className={`text-4xl mb-8`}>Login</h3>
        <form className={`flex flex-col w-fit items-center`}
            onSubmit={handleSubmit(async (data) => {
            setLoading(true);
            // Login(data);
            let status = await SDK.login(data.name, data.email)
            setLoading(false);
            if (status === 200) {
                router.push('/dogs');
                // let breeds = await SDK.getBreeds();
                // console.log(breeds);
            } else { alert("Something went wrong with our servers...")}
            })}
        >
            <div className={`w-full flex bg-green-300`}>
                <label className={`flex`} htmlFor="name">Name:</label>
                <input id='name' className={`w-5/6 flex ml-2 mb-2`}
                    {...register("name",
                    {
                        required: "You must enter a name.",
                        minLength: {
                        value: 3,
                        message: "Your name must be at least 3 characters long. Please use your last name if needed."
                        }
                    }
                    )}
                    type="text"
                    placeholder='Enter your name...'
                />
            </div>

            <div className={`w-full flex bg-green-300 justify-end`}>
                <label className={`flex`} htmlFor="email">Email:</label>
                <input id="email" className={`w-5/6 flex ml-2 mb-2`}
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

            <button className={`h-10 w-fit px-2 bg-blue-300 rounded-sm border border-black`} type="submit">{loading ? <Loader /> : "Submit"}</button>
        </form>
    </section>
    )
}