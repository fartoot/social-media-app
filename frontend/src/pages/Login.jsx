import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})
function Login() {

  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: zodResolver(formSchema)
  });
  const onSubmit = (data) => console.log(data);
  return (
    <>
      <div className="mt-52 flex items-center justify-center w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
          <div className="mb-4">
            <input type="text" placeholder="john@gmail.com" {...register("email")} 
              className="border rounded w-full py-2 px-3 text-gray-700 mb-2 focus:outline-none focus:border-gray-400" />
            {errors.email && <div className="text-red-500 text-xs italic">{ errors.email.message}</div>}
          </div>
          <div className="mb-6">
            <input type="password" placeholder="*******" {...register("password")}
              className="border rounded w-full py-2 px-3 text-gray-700 mb-2 focus:outline-none focus:border-gray-400" />
            {errors.password && <div className="text-red-500 text-xs italic">{ errors.password.message}</div>}
          </div>
          <div className="flex items-center justify-center">
            <button type="submit" className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login 