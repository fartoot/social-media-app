import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useOutletContext, useParams } from "react-router-dom";
import { ProfileContext } from "../context/ProfileContext";
import PostCard from "../components/PostCard";
import moment from "moment";
import AsyncRequest from "../utils/request";

function Profile() {
	const { accessToken } = useContext(AuthContext);
	const { profile } = useContext(ProfileContext);
	const { refresh, setRefresh } = useOutletContext();
	const [profileData, setProfileData] = useState({
		first_name: null,
		last_name: null,
		username: null,
		bio: null,
	});
	const [posts, setPosts] = useState([]);

	const params = useParams();
	const profileId = params.id || profile.id;

	useEffect(() => {
		const getUser = async () => {
     	try {
        const data = await AsyncRequest(`http://127.0.0.1:8000/users/${profileId}`, "GET", accessToken);
        setProfileData(data);
      } catch (error) {
        console.error(error);
      }
		};
		const getPostsByUser = async () => {
  		try {
        const data = await AsyncRequest( `http://127.0.0.1:8000/posts/user/${profileId}`, "GET", accessToken);
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
		};
		getUser();
		getPostsByUser();
	}, [accessToken, refresh]);

	return (
		<>
			<div className="space-y-10">
				<div className="bg-gray-50 border rounded-3xl">
					<div className="bg-gray-200 w-full h-52 rounded-3xl bg-cover bg-[url('https://img.freepik.com/free-vector/minimal-flowing-lines-background_1048-20229.jpg?t=st=1736620338~exp=1736623938~hmac=d1acc5682cb9e2e8cf8841ec63cad5458864670fb8e89402468017b447f91a3e&w=500')]"></div>
					<img
						src={`${profileData.photo}`}
						className="bg-gray-200 w-44 h-44 object-cover object-center rounded-full mx-auto border-8 border- border-white -mt-20"
						alt=""
					/>
					<div className="py-4 px-5 text-center">
						<div className="mb-4">
							<h2 className="text-2xl">
								{profileData.first_name} {profileData.last_name}
							</h2>
							<p>@{profileData.username}</p>
						</div>
						<p>{profileData.bio}</p>
					</div>
				</div>
				<div>
					{posts.map((data) => (
						<PostCard
							key={data.id}
							slug={data.owner.id}
							firstName={data.owner.first_name}
							lastName={data.owner.last_name}
							username={data.owner.username}
							photo={data.owner.photo}
							createdAt={moment(data.created_at).fromNow()}
							content={data.content}
							votes={data.votes}
							post_id={data.id}
							refresh={refresh}
							setRefresh={setRefresh}
						/>
					))}
				</div>
			</div>
		</>
	);
}
export default Profile;