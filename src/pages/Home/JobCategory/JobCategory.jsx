import { useState } from "react";
import useJob from "../../../hooks/useJob";
import SubTitle from "../../../components/SubTitle/SubTitle";
import "react-tabs/style/react-tabs.css";
import JobCard from "../../../components/JobCard/JobCard";
import ReactPaginate from "react-paginate";
import "./JobCategory.css";

const JobCategory = () => {
  const [jobs, isLoading] = useJob();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  const uniqueCategories = Array.from(
    new Set(jobs.map((job) => job.jobCategory))
  );
  const [tabIndex, setTabIndex] = useState(0);
  const category = uniqueCategories[tabIndex];
  const categoryJobs = jobs.filter((job) => job.jobCategory === category);

  const totalJobs = categoryJobs.length;
  const totalPages = Math.ceil(totalJobs / itemsPerPage);

  const offset = currentPage * itemsPerPage;
  const currentJobs = categoryJobs.slice(offset, offset + itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="my-16">
        <SubTitle title={"job by Category"}></SubTitle>
      </div>
      <div className="flex flex-wrap mb-10 gap-4 sm:gap-10 md:gap-14 justify-center">
        {uniqueCategories.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              setTabIndex(index);
              setCurrentPage(0);
            }}
            className={`uppercase text-sm sm:text-2xl pb-2 border-b-2 ${
              index === tabIndex
                ? "border-b-[#f03737] font-bold text-[#f03737]"
                : "border-b-transparent font-medium"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {isLoading ? (
          <div className="flex justify-center gap-1 items-center -mt-10 w-full">
            <span className="loading loading-spinner text-info "></span>
            <p>Please Wait and stay here...</p>
          </div>
        ) : (
          currentJobs?.map((job) => <JobCard key={job._id} job={job} />)
        )}
      </div>
      <div className="flex justify-center mt-4">
        {categoryJobs.length > itemsPerPage && (
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
            pageCount={totalPages}
            onPageChange={handlePageChange}
            forcePage={currentPage}
            containerClassName={"pagination"}
            disabledClassName={"pagination-disabled"}
            activeClassName={"active"}
          />
        )}
      </div>
    </div>
  );
};

export default JobCategory;
