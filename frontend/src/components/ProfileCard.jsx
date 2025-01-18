import { Link } from "react-router-dom";
import { Settings2 } from 'lucide-react';
const ProfileCard = ({id, fullName, username, bio, photo}) => {
  return (
    <div className="w-96 bg-gray-50 border rounded-3xl p-8 space-y-2 flex flex-col items-center mx-auto relative">
      <Link to={`/profile/edit/${id}`} className="absolute right-4 top-4">
        <Settings2 size={28} strokeWidth={1.5} className='stroke-gray-500' />
      </Link>
      <img src={ photo } className="w-32 h-32 bg-gray-200 object-cover object-center rounded-full" alt="profile-photo" />
      <div className="text-center">
        <p className="font-medium text-lg capitalize">{ fullName }</p>
        <p className="text-sm">@{ username }</p>
      </div>
      <p className="text-center">
        {bio}
      </p>
    </div>
  );
};

export default ProfileCard;
