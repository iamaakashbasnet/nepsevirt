import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { userProfileData } from './api';

const Profile = () => {
  const { username } = useParams();

  const { data, isLoading } = useQuery({
    queryFn: () => userProfileData(username),
    queryKey: ['user-profile-data'],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <div className="text-center">
        <div className="dark: h-60 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <img
          src={data?.avatar}
          className="mx-auto -mt-10 mb-5 w-36 rounded-full border-4 border-gray-400"
          alt="User profile pic"
        />
        <h1 className="font-heading text-3xl">
          {data?.firstname} {data?.lastname}
        </h1>
      </div>
    </section>
  );
};

export default Profile;
