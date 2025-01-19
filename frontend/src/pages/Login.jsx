import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link ,useNavigate } from "react-router-dom";
import AsyncRequest from "../utils/request";

const formSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(8),
});
function Login() {
  const [isError, setIsError] = useState(false);
  const {accessToken, setAccessToken} = useContext(AuthContext)
  const navigate = useNavigate()
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
          const body = new URLSearchParams({username: data.username, password: data.password})
          const options = {"content-type": "application/x-www-form-urlencoded"}
          const resData = await AsyncRequest('http://127.0.0.1:8000/login/', "POST", accessToken, body,options);
          setAccessToken(resData.access_token)
          navigate("/")
       } catch (error) {
         setIsError(true)
         console.error(error);
       }
  };
  return (
    <>
      <div className="mt-44 flex flex-col items-center justify-center w-full">
        {
          isError && <div className="mb-4 text-red-500">Invalid username or password. Please try again.</div>
        }
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-96"
        >
          <div className="mb-4">
            <input
              type="text"
              placeholder="JamesTaylor123"
              {...register("username")}
              className="border rounded-lg w-full py-2 px-3 text-gray-700 mb-2 focus:outline-none focus:border-gray-400"
            />
            {errors.username && (
              <div className="text-red-500 text-xs italic">
                {errors.username.message}
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
              Sign In
            </button>
          </div>
        </form>
        <p className="text-gray-400">
          <p className="inline me-1">Don't have an account?</p>
          <Link className="inline text-gray-400 underline hover:text-gray-500" to="/register">Create one</Link>
        </p>
      </div>
    </>
  );
}

export default Login;
