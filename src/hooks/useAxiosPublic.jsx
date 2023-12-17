import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://job-seeker-server-omega.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
