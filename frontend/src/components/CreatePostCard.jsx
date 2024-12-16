import { AuthContext } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  content: z.string().min(1).max(200),
});

function CreatePostCard({className, refresh, setRefresh}) {
  const { accessToken } = useContext(AuthContext)
  const {
     register,
     handleSubmit,
     formState: { errors },
     reset
   } = useForm({
     resolver: zodResolver(formSchema),
   });
  const navigate = useNavigate()
   const onSubmit = async (data) => {
     const url = 'http://127.0.0.1:8000/posts';
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'content-type': 'application/json'
        },
        body : JSON.stringify({
          content: data.content
        })
      };
 
     try {
       const response = await fetch(url, options);
       const data = await response.json();
       setRefresh(!refresh)
       reset()
     } catch (error) {
       console.error(error);
     }
   }; 
  
  return (
    <>
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className={`${className} bg-gray-100 rounded-3xl p-6 space-y-3 mx-auto mb-7`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-left w-full text-gray-800 ms-2">Create Post</h2>
          <button className="bg-gray-300 py-2 px-3 rounded-full text-sm">Publish</button>
        </div>
        <textarea {...register("content")} rows={4} placeholder="Something..." className="bg-gray-200 text-gray-800 rounded-2xl w-full px-4 py-2"></textarea>
        {errors.content && (
          <div className="text-red-500 text-xs italic">
                    {errors.content.message}
          </div>
        )}
      </form>
    </>
  )
}

export default CreatePostCard 