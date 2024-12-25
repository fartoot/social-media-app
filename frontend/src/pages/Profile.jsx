import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { useParams } from "react-router-dom"

function Profile() {

  const {accessToken} = useContext(AuthContext)
  const [profileData, setProfileData] = useState({"first_name": null, "last_name": null,"username":null, "bio": null})
  console.log(accessToken)
  
  const params = useParams() 
  
 useEffect(()=>{
   const getUser = async () =>{
     const url = `http://127.0.0.1:8000/users/${params.id}`;
     const options = {
       method: 'GET',
       headers: {
         Authorization: `Bearer ${accessToken}`,
       },
     };
     
     try {
       const response = await fetch(url, options);
       const data = await response.json();
       if (response.ok) {
         setProfileData(data)
         console.log(data)
       }
     } catch (error) {
       console.error(error);
     }
   }
   getUser()
 },[accessToken]) 
  
  
  return (
    <>
      <div className="bg-gray-100 rounded-3xl">
        <div className="bg-gray-300 w-full h-52 rounded-3xl pt-10 ">
        </div>
        <div className="bg-gray-300 w-44 h-44 rounded-full mx-auto border-8 border- border-white -mt-20">
        </div>
        <div className="py-4 px-5 text-center">
          <div className="mb-4">
            <h2 className="text-2xl">
              { profileData.first_name } 
            </h2>
            <p>@{ profileData.username}</p>
          </div>
          <p>
            {profileData.bio}
          </p>
        </div>
      </div>
    </>
  )
}

export default Profile 