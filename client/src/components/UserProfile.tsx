import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";

const UserProfile = () => {
  const { loading, error, data } = useQuery(GET_ME);

  if (loading) return <p>Loading User Profile...</p>;
  if (error) return <p>Error Fetching User Profile: {error.message}</p>;

  return (
    <div>
      <h1>{data.me.username}</h1>
      <p>{data.me.email}</p>
    </div>
  );
};

export default UserProfile;