import { BiSolidArrowToRight } from "react-icons/bi";
import useTitle from "../../hooks/useTitle";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import SubTitle from "../../components/SubTitle/SubTitle";
import useSeeker from "../../hooks/useSeeker";
import useJob from "../../hooks/useJob";
import { useState } from "react";

const AppliedJobs = () => {
  useTitle("Applied Jobs");

  const [jobs] = useJob();
  const uniqueCategories = Array.from(
    new Set(jobs.map((job) => job.jobCategory))
  );
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSelect = (e) => {
    setSelectedCategory(e.target.value);
  };

  const [appliedInfo] = useSeeker();
  const filteredAppliedInfo = selectedCategory
    ? appliedInfo.filter(
        (data) => data.jobInfo.jobCategory === selectedCategory
      )
    : appliedInfo;

  return (
    <div className="mb-28">
      <div className="mb-10">
        <SubTitle title="Applied jobs" />
      </div>
      <div className="mb-10">
        <div>
          <div className="flex flex-wrap items-center gap-4 px-2">
            <p className="text-lg font-semibold">Filter Out:</p>
            <select
              className="select select-bordered w-full max-w-xs font-medium"
              onChange={handleSelect}
              name="jobCategory"
              id="jobCategory"
            >
              <option value="">All Categories</option>
              {uniqueCategories?.map((data, index) => (
                <option key={index} value={data} className="font-medium">
                  {data}
                </option>
              ))}
            </select>
            {/* <select
              className="border rounded-md font-medium"
              onChange={handleSelect}
              name="jobCategory"
              id="jobCategory"
            >
              <option value="">All Categories</option>
              {uniqueCategories.map((data, index) => (
                <option key={index} value={data} className="font-medium">
                  {data}
                </option>
              ))}
            </select> */}
          </div>
        </div>
      </div>
      <div className="bg-[#F3F3F3] py-6 sm:p-12 mb-20">
        <div className="overflow-x-auto rounded-t-xl">
          <table className="table table-zebra text-center text-base">
            <thead className="bg-gray-500 text-white py-6">
              <tr className="uppercase">
                <th>Posted By</th>
                <th className="py-6">Job Title</th>
                <th>Company Name</th>
                <th>Applied Date</th>
                <th>Salary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppliedInfo?.map((data) => (
                <tr key={data._id} className="border-b border-[#3735354f]">
                  <td>{data.jobInfo.loggedInUser}</td>
                  <td>{data.jobTitle}</td>
                  <td className="py-6">{data.jobInfo.companyName}</td>
                  <td>{format(new Date(data.appliedDate), "dd-MM-yyyy")}</td>
                  <td>{data.jobInfo.salaryRange}</td>
                  <th>
                    <Link
                      to={`/jobdetails/${data.jobId}`}
                      className="btn bg-gray-500 text-white hover:text-gray-500 text-base"
                    >
                      <p>Details</p>
                      <BiSolidArrowToRight className="hidden lg:block xl:text-2xl" />
                    </Link>
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

export default AppliedJobs;
