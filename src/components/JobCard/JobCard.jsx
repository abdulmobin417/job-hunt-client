/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";
import { PropagateLoader } from "react-spinners";
import { format } from "date-fns";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";
import { useContext } from "react";

const JobCard = ({ job, loading }) => {
  const { user } = useContext(AuthContext);
  const handleLogged = () => {
    if (!user) {
      toast.info("You have to log in first to view details", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div>
      {loading ? (
        <PropagateLoader color="#f03737" />
      ) : (
        <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
          <div className="relative mx-4 mt-4 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
            <img src={job.jobBanner} className="h-[190px] text-black" alt="ui/ux review check" />
            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div className="block font-sans leading-snug tracking-normal text-blue-gray-900 antialiased">
                <p className="text-sm">
                  By:{" "}
                  <span className="capitalize">
                    {job.loggedInUser} /{" "}
                    {format(new Date(job.jobPostingDate), "dd-MM-yyyy")}
                  </span>
                </p>
                <p className="text-xl font-medium capitalize text-[#f03737]">
                  {job.jobTitle}
                </p>
                <p className="text-sm">
                  Deadline:
                  <span className="font-bold">
                    {" "}
                    {format(new Date(job.applicationDeadline), "dd/MM/yyyy")}
                  </span>
                </p>
                <div className="flex items-center gap-2">
                  <p>
                    Applied:
                    <span className="font-bold">
                      {" "}
                      {job.jobApplicantsNumber}
                    </span>
                  </p>
                  <FaUserFriends></FaUserFriends>
                </div>
                <p>
                  Salary:<span className="font-bold"> {job.salaryRange}</span>
                </p>
              </div>
              <div className="avatar placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                  <span>MX</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 pt-0">
            <Link
              to={`/jobdetails/${job._id}`}
              onClick={handleLogged}
              className="block w-full select-none rounded-lg bg-gray-500 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md transition-all hover:shadow-lg hover:bg-[#f03737] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              See Details
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCard;
