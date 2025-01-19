import { Outlet, useLocation } from "react-router-dom";
import ProfileCard from "../components/ProfileCard.jsx"
import CreatePostCard from "../components/CreatePostCard.jsx";
import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../context/ProfileContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import PopularPost from "../components/PopularPost.jsx";
import RecentPost from "../components/RecentPost.jsx";
import AsyncRequest from "../utils/request.jsx"
import momentShort from "../utils/date.jsx"


function GuestLayout() {
  const [refresh, setRefresh] = useState(false)
  const [popularPosts, setPopularPosts] = useState([])
  const [recentPosts, setRecentPosts] = useState([])
  
  const location = useLocation()
  const forbindenPlaces = ["profile"]
  const {accessToken} = useContext(AuthContext)
  const {profile, setProfile} = useContext(ProfileContext)
  
  useEffect(() => {
    const fetchProfile = async () => {
          try {
            const profileData = await AsyncRequest("http://127.0.0.1:8000/users/", "GET", accessToken);
            setProfile(profileData);
          } catch (error) {
            console.error(error);
          }
        }
    
    const getRecentPostsByMe = async () => {
          try {
            const data = await AsyncRequest("http://127.0.0.1:8000/posts/recent", "GET", accessToken);
            setRecentPosts(data);
          } catch (error) {
            console.error(error);
          }
        }
    getRecentPostsByMe()
    fetchProfile();
  }, [accessToken])
  
  useEffect(()=>{
    const getPopularPosts = async () => {
        try {
          const data = await AsyncRequest("http://127.0.0.1:8000/posts/popular/", "GET", accessToken);
          setPopularPosts(data);
        } catch (error) {
          console.error(error);
        }
    }
    getPopularPosts()
  },[refresh])
  
  
  return (
    <>
      <div className="w-full hidden lg:block space-y-20 self-start sticky top-4">
        <ProfileCard id={profile.id} fullName={ `${profile.first_name} ${profile.last_name}` } username={profile.username} bio={profile.bio} photo={profile.photo} />
        
        <div className="w-96 bg-white border rounded-3xl p-8 space-y-2 flex flex-col items-center mx-auto">
          <h2 className="text-left w-full text-gray-800 ms-2 mb-2">Recent Liked</h2>
          {
            recentPosts.map((data)=>(
            <RecentPost key={data.key} full_name={`${data.Post.owner.first_name} ${data.Post.owner.last_name}`} username={data.Post.owner.username} date={momentShort(data.Vote.created_at)} />
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
        <div className="w-96 bg-white border rounded-3xl relative p-8 space-y-3 flex flex-col items-center mx-auto">
          <div className="bg-gradient-to-t from-gray-50 from-40% rounded-b-3xl absolute bottom-0 h-20 w-full">
          </div>
          <div className="flex justify-between w-full px-3 mb-2">
            <h2 className="text-gray-800">Today's Popular Posts</h2>
            <a href="#" className="underline text-gray-600">more</a>
          </div>
          {
            popularPosts.map((data)=>(
              <PopularPost key={data.id} full_name={`${data.owner.first_name} ${data.owner.last_name}`}  votes={data.votes} content={data.content} />
            ))
          }
        </div>
        
      </div>
    </>
  );
}

export default GuestLayout;
