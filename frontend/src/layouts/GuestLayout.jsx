import { Outlet, useLocation } from "react-router-dom";
import ProfileCard from "../components/ProfileCard.jsx"
import CreatePostCard from "../components/CreatePostCard.jsx";
import { useState } from "react";
function GuestLayout() {
  const [refresh, setRefresh] = useState(false)
  const location = useLocation()
  const forbindenPlaces = ["profile"]
  console.log(location.pathname.split("/")[1])
  return (
    <>
      <div className="w-full hidden lg:block space-y-20 self-start sticky top-28">
        <ProfileCard fullName="Dani Taylor" username="@danitaylor" bio="Lorem, ipsum dolor sit amet consectetur adipisicing elit dolor..." />
        
        <div className="w-96 bg-gray-100 rounded-3xl p-8 space-y-2 flex flex-col items-center mx-auto">
          <h2 className="text-left w-full text-gray-800 ms-2 mb-2">Recent Liked</h2>
          {
            [1,1,1,1,1].map((data)=>(
              <div key={data.key} className="bg-gray-200 text-gray-800 rounded-full w-full px-4 py-2 flex justify-between items-center">
                <div className="space-x-1">
                  <span className="text-sm">James Adam</span>
                  <span className="text-xs text-gray-600">@jamesadam</span>
                </div>
                <span className="text-sm">
                  2h ago
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
        <Outlet context={{ refresh }} />
      </div>
      <div className="w-full hidden xl:inline-block space-y-5 self-start sticky top-28">
        <CreatePostCard className="w-96" refresh={refresh} setRefresh={setRefresh}/>
        <div className="w-96 bg-gray-100 rounded-3xl p-8 space-y-3 flex flex-col items-center mx-auto">
          <h2 className="text-left w-full text-gray-800 ms-2 mb-2">Popular Posts</h2>
          {
            [1,1,1].map((data)=>(
              <div key={data.key} className="bg-gray-200 text-gray-800 rounded-2xl w-full px-4 py-2">
                <div className="flex justify-between items-center">
                  <div className="space-x-1 mb-2">
                    <span className="text-sm">James Adam</span>
                  </div>
                  <span className="text-sm">2.4K ⭐</span>
                </div>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, non alias? Voluptates, iusto</p>
            </div>
            ))
          }
        </div>
      </div>
    </>
  );
}

export default GuestLayout;
