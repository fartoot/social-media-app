import PostCard from "../components/PostCard"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import moment from "moment";
import { useOutletContext } from "react-router-dom";
import AsyncRequest from "../utils/request";

function Home() {
  const { refresh, setRefresh } = useOutletContext();
  const [posts, setPosts] = useState([])
  const { accessToken } = useContext(AuthContext)
  useEffect(() => {
    const fetchPosts = async () => {
    try {
      const data = await AsyncRequest("http://127.0.0.1:8000/posts/", "GET", accessToken);
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
     } 
    fetchPosts()
  }, [refresh, accessToken])
  return (
    <>
      {posts.map((data) => <PostCard key={data.id} slug={data.owner.id} firstName={data.owner.first_name} lastName={data.owner.last_name} username={data.owner.username} photo={data.owner.photo} createdAt={moment(data.created_at).fromNow()} content={data.content} votes={data.votes} post_id={data.id} refresh={refresh} setRefresh={ setRefresh}  /> )}
    </>
  )
}

export default Home