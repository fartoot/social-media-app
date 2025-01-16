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
      <div className="bg-gray-50 border rounded-3xl">
        <div className="bg-gray-200 w-full h-52 rounded-3xl bg-cover bg-[url('https://img.freepik.com/free-vector/minimal-flowing-lines-background_1048-20229.jpg?t=st=1736620338~exp=1736623938~hmac=d1acc5682cb9e2e8cf8841ec63cad5458864670fb8e89402468017b447f91a3e&w=500')]"></div>
        <img src={`${profileData.photo}`} className="bg-gray-200 w-44 h-44 object-cover object-center rounded-full mx-auto border-8 border- border-white -mt-20" alt="" />
        <div className="py-4 px-5 text-center">
          <div className="mb-4">
            <h2 className="text-2xl">
              { profileData.first_name } { profileData.last_name }
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