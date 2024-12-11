import PostCard from "../components/PostCard"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import moment from"moment";

function Home() {
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
  }, [accessToken])

  return (
    <>
      {posts.map((data) => <PostCard key={data.id} firstName={data.owner.first_name} lastName={data.owner.last_name} username={data.owner.username} createdAt={moment(data.owner.created_at).fromNow()} content={data.content}  /> )}
    </>
  )
}

export default Home