import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useJob = () => {
  const axiosSecure = useAxiosSecure();

  const fetchJobs = async () => {
    const response = await axiosSecure.get(`/jobs`);
    return response.data;
  };

  const {
    data: jobs = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs
  });
  return [jobs, isLoading, refetch];
};

export default useJob;
