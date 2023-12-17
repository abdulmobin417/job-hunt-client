import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    axiosPublic.get(`/user/${user.email}`).then((res) => {
      setUserInfo(res.data);
    });
  }, [axiosPublic, user.email]);
  return (
    <div className="bg-gray-200 font-sans h-screen w-full flex flex-row justify-center items-center">
      <div className="card w-96 mx-auto bg-white  shadow-xl hover:shadow">
        <img
          className="w-32 mx-auto rounded-full -mt-20 border-8 border-white"
          src={userInfo?.photo}
          alt=""
        />
        <div className="text-center mt-2 text-3xl font-medium">
          {userInfo?.name}
        </div>
        <div className="text-center mt-2 font-light text-sm">
          {userInfo?.email}
        </div>
        <div className="text-center font-normal text-lg">{userInfo?.role}</div>
        <div className="px-6 text-center mt-2 font-light text-sm">
          <p>{userInfo?.photo}cd</p>
        </div>
        <hr className="mt-8" />
        <div className="flex p-4">
          <div className="w-1/2 text-center">
            <span className="font-bold">1.8 k</span> Followers
          </div>
          <div className="w-0 border border-gray-300"></div>
          <div className="w-1/2 text-center">
            <span className="font-bold">2.0 k</span> Following
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
