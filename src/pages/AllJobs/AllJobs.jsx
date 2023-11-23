import { Link } from "react-router-dom";
import SubTitle from "../../components/SubTitle/SubTitle";
import useJob from "../../hooks/useJob";
import useTitle from "../../hooks/useTitle";
import { BiSolidArrowToRight } from "react-icons/bi";
import { useContext, useState } from "react";
import "../Home/JobCategory/JobCategory.css";
import ReactPaginate from "react-paginate";
import { format } from "date-fns";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";

const AllJobs = () => {
  useTitle("All Jobs");
  const { user } = useContext(AuthContext);

  const [jobs] = useJob();
  const [searchQuery, setSearchQuery] = useState("");
  const filteredJobs = jobs.filter((job) =>
    job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (event) => {
    // event.target.preventDefault();
    setSearchQuery(event.target.value);
    setPageNumber(0);
  };

  const [pageNumber, setPageNumber] = useState(0);
  const jobsPerPage = 14;

  const pagesVisited = pageNumber * jobsPerPage;
  const pageCount = Math.ceil(filteredJobs.length / jobsPerPage);
  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
    // setPageNumber(0);
  };

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
  }
  return (
    <div className="mb-28">
      <div className="mb-10 bg-[#f03737]">
        <div className="h-50 px-8 py-8 flex items-center gap-4">
          <div className="w-full">
            <input
              className="w-full h-12 rounded focus:outline-none focus:shadow-outline text-xl px-8 shadow-lg"
              type="search"
              placeholder="Find your desire jobs..."
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>
      <div className="mb-10">
        <SubTitle title="All jobs" />
      </div>
      <div className="bg-[#F3F3F3] py-6 sm:p-12 mb-20">
        <div className="overflow-x-auto rounded-t-xl">
          <table className="table table-zebra text-center text-base">
            <thead className="bg-gray-500 text-white py-6">
              <tr className="uppercase">
                <th>Name</th>
                <th className="py-6">Job Title</th>
                <th>Posting Date</th>
                <th>Deadline</th>
                <th>Salary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs
                .slice(pagesVisited, pagesVisited + jobsPerPage)
                .map((job) => (
                  <tr key={job._id} className="border-b border-[#3735354f]">
                    <td>{job.loggedInUser}</td>
                    <td className="py-6">{job.jobTitle}</td>
                    <td>
                      {format(new Date(job.jobPostingDate), "dd-MM-yyyy")}
                    </td>
                    <td>
                      {format(new Date(job.applicationDeadline), "dd-MM-yyyy")}
                    </td>
                    <td>{job.salaryRange}</td>
                    <th>
                      <Link
                        to={`/jobdetails/${job._id}`}
                        className="btn bg-gray-500 text-white hover:text-gray-500 text-base"
                        onClick={handleLogged}
                      >
                        <p>Details</p>
                        <BiSolidArrowToRight className="hidden lg:block xl:text-2xl"></BiSolidArrowToRight>
                      </Link>
                    </th>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredJobs.length > jobsPerPage && (
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          pageCount={pageCount}
          onPageChange={handlePageChange}
          // forcePage={currentPage}
          containerClassName={"pagination"}
          disabledClassName={"pagination-disabled"}
          activeClassName={"active"}
        />
      )}
    </div>
  );
};

export default AllJobs;
