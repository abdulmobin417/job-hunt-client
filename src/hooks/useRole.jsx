import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useRole = () => {
  const { user, adminLoading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const {
    data: isRole,
    refetch,
    isLoading: isRoleLoading,
  } = useQuery({
    queryKey: ["isRole", user?.email],
    enabled: !adminLoading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin?email=${user?.email}`);
      return res.data;
    },
  });
  return { isRole, refetch, isRoleLoading };
};

export default useRole;
