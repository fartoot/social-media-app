import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

function Profile() {

  const {accessToken} = useContext(AuthContext)
  console.log(accessToken)
  return (
    <>
      <div className="bg-gray-100 rounded-3xl">
        <div className="bg-gray-300 w-full h-52 rounded-3xl pt-10 ">
        </div>
        <div className="bg-gray-500 w-44 h-44 rounded-full mx-auto border-8 border- border-white -mt-20">
        </div>
        <div className="py-4 px-5 text-center">
          <h2 className="text-2xl">
            Adam Locas
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident eum, dolores repellat optio dolorum, ullam suscipit minima recusandae
          </p>
        </div>
      </div>
    </>
  )
}

export default Profile 