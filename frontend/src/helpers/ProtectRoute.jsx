import { useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom";


const ProtectRoute = ({children}) =>  {
  const navigate = useNavigate()
  const { accessToken } = useContext(AuthContext);

  useEffect(() => {
    if (!accessToken) {
      navigate("/login")
    }
  }, [accessToken, navigate])

  return children;

}

export default ProtectRoute