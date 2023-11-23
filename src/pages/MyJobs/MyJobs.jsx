import { useQuery } from "@tanstack/react-query";
import useTitle from "../../hooks/useTitle";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { AiOutlineDelete } from "react-icons/ai";
import { RxUpdate } from "react-icons/rx";
import SubTitle from "../../components/SubTitle/SubTitle";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyJob = () => {
  useTitle("My Job");
  const { user, loading } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();

  const fetchJobFilter = async () => {
    const response = await axiosSecure.get(`/jobFilter?email=${user?.email}`);
    return response.data;
  };

  const { data: jobFilter = [], refetch } = useQuery({
    queryKey: ["jobFilter"],
    enabled: !loading,
    queryFn: fetchJobFilter,
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/deleteJob/${id}`).then((data) => {
          if (data.data.deletedCount > 0) {
            toast.success("Post deleted successfully");
            refetch();
          }
        });
      }
    });
  };
  return (
    <div className="mb-28">
      <div className="mb-10">
        <SubTitle title="My jobs" />
      </div>
      <div className="bg-[#F3F3F3] py-6 sm:p-12 mb-20">
        <div className="overflow-x-auto rounded-t-xl">
          <table className="table table-zebra text-center text-base">
            <thead className="bg-gray-500 text-white py-6">
              <tr className="uppercase">
                <th className="py-6">Job Title</th>
                <th>Category</th>
                <th>Posting Date</th>
                <th>Deadline</th>
                <th>Salary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {jobFilter?.map((data) => (
                <tr key={data._id} className="border-b border-[#3735354f]">
                  <td className="py-6">{data.jobTitle}</td>
                  <td>{data.jobCategory}</td>
                  <td>{format(new Date(data.jobPostingDate), "dd-MM-yyyy")}</td>
                  <td>
                    {format(new Date(data.applicationDeadline), "dd-MM-yyyy")}
                  </td>
                  <td>{data.salaryRange}</td>
                  <th className="flex gap-2 items-center justify-center">
                    <Link
                      to={`/updatePost/${data._id}`}
                      className="btn bg-gray-500 text-white hover:text-gray-500 text-base"
                    >
                      <p>Update</p>
                      <RxUpdate className="hidden lg:block xl:text-2xl" />
                    </Link>
                    <button
                      onClick={() => handleDelete(data._id)}
                      className="btn bg-red-500 text-white hover:text-gray-500 text-base"
                    >
                      <p>Delete</p>
                      <AiOutlineDelete className="hidden lg:block xl:text-2xl" />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyJob;
