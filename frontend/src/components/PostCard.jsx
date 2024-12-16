import { Link } from "react-router-dom";
function PostCard({slug, firstName, lastName, username,  createdAt, content}) {
  return (
    <>
      <div className="bg-gray-100 rounded-md mb-7 p-7 w-full md:min-w-96">
        <div className="flex">
          <div className="bg-gray-300 w-12 h-12 rounded-full me-5"></div>
          <div>
            <Link to={`/profile/${slug}`}>
              <p>{firstName} {lastName}</p>
              <p className="text-sm block">@{ username }</p>
            </Link>
          </div>
          <div className="text-gray-600 text-sm leading-6">&nbsp;&nbsp;{createdAt}</div>
        </div>
        <div className="my-4">
          {content}
        </div>
      </div>
    </>
  );
}

export default PostCard;
