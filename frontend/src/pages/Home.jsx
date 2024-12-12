import PostCard from "../components/PostCard"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import moment from"moment";
import { useOutletContext } from "react-router-dom";

function Home() {
  const { refresh } = useOutletContext();
  const [posts, setPosts] = useState([])
  const { accessToken } = useContext(AuthContext)
  useEffect(() => {
    const fetchPosts = async () => {
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      };
      const response = await fetch("http://127.0.0.1:8000/posts/", options)
      const postsData = await response.json()
      setPosts(postsData)
      console.log(postsData)
    }
    fetchPosts()
  }, [accessToken, refresh])

  return (
    <>
      {posts.map((data) => <PostCard key={data.id} slug={data.owner.id} firstName={data.owner.first_name} lastName={data.owner.last_name} username={data.owner.username} createdAt={moment(data.created_at).fromNow()} content={data.content}  /> )}
    </>
  )
}

export default Home