import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { Inter } from 'next/font/google'
import FetchSVG from '@/components/FetchSVG'
import { useState } from 'react'
import Login from '@/lib/auth/login'
import Logout from '@/lib/auth/logout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [loading, setLoading] = useState<boolean>(false)

  return (
    <main
      className={`h-screen w-screen flex flex-col items-center bg-slate-200 ${inter.className}`}
    >
      <div className={``}>
        <h1 className={`text-center text-6xl font-medium`}>Furry Friend Finder</h1>
        <p className={`flex justify-center items-center text-lg bg-green-400`}>powered by <span className={`h-5 w-10 ml-2 -mt-4`}><FetchSVG /></span></p>
      </div>
      <div className='w-4/6 h-full bg-blue-300'>
        <form className={`flex flex-col items-center`}
          onSubmit={handleSubmit(async (data) => {
            setLoading(true);
            Login(data);
            setLoading(false);
          })}
        >
          <div className={`w-1/3 flex bg-green-300`}>
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

          <div className={`w-1/3 flex bg-green-300 justify-end`}>
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
          
          <button type="submit">{loading ? "Please wait..." : "Log in"}</button>
        </form>
        <button onClick={Logout}>Log out</button>
      </div>
    </main>
  )
}
