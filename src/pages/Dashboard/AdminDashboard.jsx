import { RiDeleteBinLine, RiShieldUserFill } from "react-icons/ri";
import SubTitle from "../../components/SubTitle/SubTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { RotatingLines } from "react-loader-spinner";
import { useQuery } from "@tanstack/react-query";
import { FaUsers } from "react-icons/fa";
import { toast } from "react-toastify";
import { MdWork } from "react-icons/md";
import Swal from "sweetalert2";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const {
    isLoading: isUserLoading,
    data: users = [],
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data?.filter((user) => user?.isDelete !== true);
    },
  });

  const handleAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to make ${user?.name} an admin!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            toast.success(`${user?.name} is an admin now!`);
            refetch();
          }
        });
      }
    });
  };

  const handleDelete = (user) => {
    if (user.role === "admin") {
      toast.error("You can't delete an admin");
      return;
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: `You want to delete ${user?.name}!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.patch(`/users/${user._id}`).then((res) => {
            if (res.data.modifiedCount > 0) {
              toast.success("User deleted successfully");
              refetch();
            }
          });
        }
      });
      // toast.error("Firebase doesn't modify it 🥲!");
    }
  };

  return (
    <div>
      <div className="my-16">
        <SubTitle title={"All User List"}></SubTitle>
      </div>
      <div className="bg-[#F3F3F3] mx-2 sm:mx-6 md:mx-12 lg:mx-24 py-6 sm:p-12 mb-20">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center font-body text-3xl font-bold mb-9">
          <div className="flex gap-2 items-center">
            <h3>Total Users: </h3>
            {isUserLoading ? (
              <RotatingLines
                strokeColor="green"
                strokeWidth="3"
                animationDuration="0.75"
                width="32"
                visible={true}
              />
            ) : (
              <h3>{users.length}</h3>
            )}
          </div>
        </div>
        <div className="overflow-x-auto rounded-t-xl">
          <table className="table text-center text-base">
            <thead className="bg-[#D1A054] text-white py-6">
              <tr className="uppercase">
                <th>NO</th>
                <th className="py-6">NAME</th>
                <th>EMAIL</th>
                <th>ROLE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td className="py-6">{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <div className="flex justify-center">
                      {user.role === "admin" ? (
                        <button
                          title="User"
                          className="btn bg-[#54d15e] text-white hover:text-[#D1A054] btn-md text-2xl"
                        >
                          <RiShieldUserFill />
                        </button>
                      ) : user.role === "seeker" ? (
                        <button
                          title="Make Admin"
                          onClick={() => handleAdmin(user)}
                          className="btn bg-[#D1A054] text-white hover:text-[#D1A054] btn-md text-2xl"
                        >
                          <FaUsers />
                        </button>
                      ) : (
                        <button
                          title="Make Admin"
                          onClick={() => handleAdmin(user)}
                          className="btn bg-[#D1A054] text-white hover:text-[#D1A054] btn-md text-2xl"
                        >
                          <MdWork />
                        </button>
                      )}
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(user)}
                      className="btn bg-red-600 text-white hover:text-[#D1A054] btn-md text-2xl"
                    >
                      <RiDeleteBinLine />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;