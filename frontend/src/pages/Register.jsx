import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AsyncRequest from "../utils/request";

const formSchema = z.object({
  firstname: z.string().min(3).max(30),
  lastname: z.string().min(3).max(30),
  username: z.string().min(6).max(50),
  email: z.string().email(),
  password: z.string().min(8),
});
function Register() {
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate()
  const {accessToken} = useContext(AuthContext)
  useEffect(()=>{
    if(accessToken){
      navigate("/")
    }
  },[])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });
  
  const onSubmit = async (data) => {
    try {
      const body = JSON.stringify({
          photo: "",
          bio: "hello", 
          first_name: data.firstname,
          last_name: data.lastname,
          username: data.username,
          email: data.email,
          password: data.password
      })
      const options = {"content-type": "application/json"}
      await AsyncRequest('http://127.0.0.1:8000/users/', "POST", accessToken, body,options);
      setIsError(false);
      window.location.href = '/login';
    } catch (error) {
      setIsError(true);
      console.error(error);
    }
  };
  return (
    <>
      <div className="mt-36 flex flex-col items-center justify-center w-full">
        {
          isError && <div className="mb-4 text-red-500">This username or email is already registered. Please try different ones.</div>
        }
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-96"
        >
          <div className="mb-4">
            <input
              type="text"
              placeholder="fisrt name"
              {...register("firstname")}
              className="border rounded-lg w-full py-2 px-3 text-gray-700 mb-2 focus:outline-none focus:border-gray-400"
            />
            {errors.firstname && (
              <div className="text-red-500 text-xs italic">
                {errors.firstname.message}
              </div>
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="last name"
              {...register("lastname")}
              className="border rounded-lg w-full py-2 px-3 text-gray-700 mb-2 focus:outline-none focus:border-gray-400"
            />
            {errors.lastname && (
              <div className="text-red-500 text-xs italic">
                {errors.lastname.message}
              </div>
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="username"
              {...register("username")}
              className="border rounded-lg w-full py-2 px-3 text-gray-700 mb-2 focus:outline-none focus:border-gray-400"
            />
            {errors.username && (
              <div className="text-red-500 text-xs italic">
                {errors.username.message}
              </div>
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="example@email.com"
              {...register("email")}
              className="border rounded-lg w-full py-2 px-3 text-gray-700 mb-2 focus:outline-none focus:border-gray-400"
            />
            {errors.email && (
              <div className="text-red-500 text-xs italic">
                {errors.email.message}
              </div>
            )}
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="*******"
              {...register("password")}
              className="border rounded-lg w-full py-2 px-3 text-gray-700 mb-2 focus:outline-none focus:border-gray-400"
            />
            {errors.password && (
              <div className="text-red-500 text-xs italic">
                {errors.password.message}
              </div>
            )}
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-gray-50 hover:bg-gray-100 text-gray-500 py-2 px-6 border border-gray-300 rounded-full shadow-sm"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-gray-400">
          <p className="inline me-1">Already have an account?</p>
          <a className="text-gray-400 underline hover:text-gray-500" href='/login'>Login</a>
          
        </div >
      </div>
    </>
  );
}

export default Register;
