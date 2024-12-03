import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

function Profile() {

  const {accessToken} = useContext(AuthContext)
  console.log(accessToken)
  return (
    <>
      <div>
       Profile 
      </div>
    </>
  )
}

export default Profile 