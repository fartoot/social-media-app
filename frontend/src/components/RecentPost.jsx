function RecentPost({full_name, username, date}){
  return (
    <div  className="bg-gray-100 border text-gray-800 rounded-full w-full px-4 py-2 flex justify-between items-center">
      <div className="space-x-1">
        <span className="text-sm capitalize">{full_name}</span>
        <span className="text-xs text-gray-600">@{username}</span>
      </div>
      <span className="text-xs text-gray-600">
        {date}
      </span>
  </div>
  )
}
export default RecentPost;