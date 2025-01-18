import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Ellipsis, CircleChevronUp } from 'lucide-react';
import AsyncRequest from "../utils/request";
function PostCard({slug, firstName, lastName,photo, username,  createdAt, content, votes, post_id, refresh, setRefresh}) {
  const {accessToken} = useContext(AuthContext)

  const vote = async (post_id) =>{
    try {
        const body = JSON.stringify( {"post_id": post_id})
        const options = {"content-type": "application/json"}
        await AsyncRequest('http://127.0.0.1:8000/votes', "POST", accessToken, body,options);
        setRefresh(!refresh)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="bg-gray-50 border rounded-md mb-7 p-7 w-full md:min-w-96">
        <div className="flex">
          <img src={photo} className="bg-gray-200 w-12 object-cover object-center h-12 rounded-full me-5" alt="" />
          <div>
            <Link to={`/profile/${slug}`}>
              <p className="capitalize">{firstName} {lastName}</p>
            </Link>
              <p className="text-sm text-gray-600 block">@{ username }</p>
          </div>
          <div className="text-gray-600 text-sm leading-6">&nbsp;&nbsp;{createdAt}</div>
          <div className="ml-auto flex flex-col items-center">
            <button onClick={() => vote(post_id)}> 
              <CircleChevronUp size={28} className='stroke-gray-500' />
            </button>
            <span className="text-sm text-gray-500">{ votes } up</span>
          </div>
        </div>
        <div className="my-4">
          {content}
        </div>
        <div className="leading-none -mb-2 flex">
          <button className="mx-auto mr-1.5">
           <Ellipsis size={18} /> 
          </button>
        </div>
      </div>
    </>
  );
}

export default PostCard;
