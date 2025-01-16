import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Ellipsis } from 'lucide-react';
function PostCard({slug, firstName, lastName,photo, username,  createdAt, content, votes, post_id, refresh, setRefresh}) {
  const {accessToken} = useContext(AuthContext)

  const vote = async (post_id) =>{
    const url = 'http://127.0.0.1:8000/votes';
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      body: `{"post_id": ${post_id}}`
    };

    try {
      const response = await fetch(url, options);
      if (response.ok){
        setRefresh(!refresh)
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <div className="bg-gray-50 border rounded-md mb-7 p-7 w-full md:min-w-96">
        <div className="flex">
          <img src={`${photo}`} className="bg-gray-200 w-12 object-cover object-center h-12 rounded-full me-5" alt="" />
          <div>
            <Link to={`/profile/${slug}`}>
              <p className="capitalize">{firstName} {lastName}</p>
            </Link>
              <p className="text-sm text-gray-600 block">@{ username }</p>
          </div>
          <div className="text-gray-600 text-sm leading-6">&nbsp;&nbsp;{createdAt}</div>
          <div className="ml-auto flex flex-col items-center">
            <button onClick={() => vote(post_id)}> 
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" className="fill-gray-600" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm45.66-77.66a8,8,0,0,1-11.32,11.32L128,115.31,93.66,149.66a8,8,0,0,1-11.32-11.32l40-40a8,8,0,0,1,11.32,0Z"></path></svg>
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" className="fill-gray-600" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,125.66a8,8,0,0,1-11.32,0L128,115.31,93.66,149.66a8,8,0,0,1-11.32-11.32l40-40a8,8,0,0,1,11.32,0l40,40A8,8,0,0,1,173.66,149.66Z"></path></svg> */}
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
