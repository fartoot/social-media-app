import { Outlet, useLocation } from "react-router-dom";
import ProfileCard from "../components/ProfileCard.jsx"
import CreatePostCard from "../components/CreatePostCard.jsx";
import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../context/ProfileContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import moment from"moment";

const moment_short = (timeAgo) =>{
  return timeAgo.replace("a few seconds ago","just now").replace("a minute","1m").replace(" hours", "h").replace(" minutes", "m").replace(" days", "d").replace(" seconds", "s").replace(" years", "y");
}

function GuestLayout() {
  const [refresh, setRefresh] = useState(false)
  const [popularPosts, setPopularPosts] = useState([])
  const [recentPosts, setRecentPosts] = useState([])
  
  const location = useLocation()
  const forbindenPlaces = ["profile"]
  const {accessToken} = useContext(AuthContext)
  const {profile, setProfile} = useContext(ProfileContext)
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
          const options = {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          };
          const response = await fetch("http://127.0.0.1:8000/users/", options)
          const profileData = await response.json()
          if (response.ok){
            setProfile(profileData)
          }
      }
      catch (error) {
        console.log("error", error)
      }
    }
      fetchPosts()
  }, [accessToken])
  
  useEffect(()=>{
    const getPopularPosts = async () => {
      const url = 'http://127.0.0.1:8000/posts/popular/';
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      };
      
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (response.ok){
          setPopularPosts(data)
        }
      } catch (error) {
        console.error(error);
      }
    }
    getPopularPosts()
  },[])
  
  useEffect(() => {
    const getRecentPostsByMe = async () => {
      const url = 'http://127.0.0.1:8000/posts/recent';
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}` 
        }
      };
      
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (response.ok){
          setRecentPosts(data)
        }
      } catch (error) {
        console.error(error);
      }
    }
    getRecentPostsByMe()
  }, [refresh])
  
  return (
    <>
      <div className="w-full hidden lg:block space-y-20 self-start sticky top-4">
        <ProfileCard id={profile.id} fullName={ `${profile.first_name} ${profile.last_name}` } username={profile.username} bio={profile.bio} photo={profile.photo} />
        
        <div className="w-96 bg-gray-50 border rounded-3xl p-8 space-y-2 flex flex-col items-center mx-auto">
          <h2 className="text-left w-full text-gray-800 ms-2 mb-2">Recent Liked</h2>
          {
            recentPosts.map((data)=>(
              <div key={data.key} className="bg-gray-100 border text-gray-800 rounded-full w-full px-4 py-2 flex justify-between items-center">
                <div className="space-x-1">
                  <span className="text-sm capitalize">{data.Post.owner.first_name} { data.Post.owner.last_name }</span>
                  <span className="text-xs text-gray-600">@{ data.Post.owner.username }</span>
                </div>
                <span className="text-xs text-gray-600">
                  { moment_short(moment(data.Vote.created_at).fromNow())}
                </span>
            </div>
            ))
          }
        </div>
      </div>
      <div className="max-w-3xl w-full mx-auto">
        { forbindenPlaces.includes(location.pathname.split("/")[1]) || (
        <CreatePostCard className="xl:hidden" refresh={refresh} setRefresh={setRefresh}/>  
        )}
        <Outlet context={{ refresh , setRefresh}} />
      </div>
      <div className="w-full hidden xl:inline-block space-y-5 self-start sticky top-4">
        <CreatePostCard className="w-96" refresh={refresh} setRefresh={setRefresh}/>
        <div className="w-96 bg-gray-50 border rounded-3xl relative p-8 space-y-3 flex flex-col items-center mx-auto">
          <div className="bg-gradient-to-t from-gray-50 from-55% rounded-b-3xl absolute bottom-0 h-20 w-full">
          </div>
          <div className="flex justify-between w-full px-3 mb-2">
            <h2 className="text-gray-800">Today's Popular Posts</h2>
            <a href="#" className="underline text-gray-600">more</a>
          </div>
          {
            popularPosts.map((data)=>(
              <div key={data.key} className="bg-white border text-gray-600 rounded-2xl w-full px-4 py-2">
                <div className="flex justify-between items-center">
                  <div className="space-x-1 mb-2">
                    <span className="text-xs capitalize">{data.owner.first_name} { data.owner.last_name} </span>
                  </div>
                  <div>
                  <span className="text-sm -me-1">{data.votes}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="inline fill-gray-600" viewBox="0 0 256 256">
                      <path d="M173.66,138.34a8,8,0,0,1-11.32,11.32L128,115.31,93.66,149.66a8,8,0,0,1-11.32-11.32l40-40a8,8,0,0,1,11.32,0Z"></path>
                    </svg>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">{data.content} </p>
            </div>
            ))
          }
        </div>
      </div>
    </>
  );
}

export default GuestLayout;
