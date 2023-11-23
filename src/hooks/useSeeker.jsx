import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useSeeker = () => {
  const { user, loading } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();

  const fetchSeekers = async () => {
    const response = await axiosSecure.get(`/seekers?email=${user?.email}`);
    return response.data;
  };

  const { data: appliedInfo = [], refetch } = useQuery({
    queryKey: ["seekers", user?.email],
    enabled: !loading,
    queryFn: fetchSeekers,
  });
  return [appliedInfo, refetch];
};

export default useSeeker;
