import { useContext, useState } from "react";
import SubTitle from "../../components/SubTitle/SubTitle";
import useTitle from "../../hooks/useTitle";
import { AuthContext } from "../../providers/AuthProvider";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "./AddAJob.css";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddAJob = () => {
  useTitle("Add A Job");
  const { user } = useContext(AuthContext);
  const [deadline, setDeadline] = useState(new Date());
  const axiosSecure = useAxiosSecure();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const jobBanner = form.bannerUrl.value;
    const companyLogo = form.companyLogo.value;
    const jobTitle = form.jobName.value;
    const loggedInUser = user?.displayName;
    const jobCategory = form.jobCategory.value;
    const companyName = form.companyName.value;
    const startingSalary = form.startingSalary.value;
    const endingSalary = form.endingSalary.value;
    const salaryRange = `$${startingSalary} - $${endingSalary}`;
    const jobDescription = form.description.value;
    const jobPostingDate = new Date();
    const applicationDeadline = deadline;
    const vacancy = form.vacancy.value;
    const jobApplicantsNumber = form.applicants.value;
    const userEmail = user?.email;
    // form.reset();
    const jobInfo = {
      jobBanner,
      companyName,
      companyLogo,
      jobTitle,
      loggedInUser,
      jobCategory,
      salaryRange,
      jobDescription,
      jobPostingDate,
      applicationDeadline,
      vacancy: parseInt(vacancy),
      jobApplicantsNumber: parseInt(jobApplicantsNumber),
      userEmail,
    };
    axiosSecure.post("/jobs", jobInfo).then((data) => {
      if (data.data.insertedId) {
        toast.success("Job add successful!!!");
        form.reset();
      }
    });
  };
  return (
    <div className="mb-28 border border-gray-900/10 px-8 pb-8 rounded-lg">
      <div className="my-10">
        <SubTitle title="Add a Job" />
      </div>
      <div className="">
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-4 xl:grid-cols-6">
                <div className="col-span-2 xl:col-span-2">
                  <label
                    htmlFor="bannerUrl"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Job Banner
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="bannerUrl"
                      id="bannerUrl"
                      autoComplete="bannerUrl"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
                    />
                  </div>
                </div>
                <div className="col-span-2 xl:col-span-2">
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Company Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="companyName"
                      id="companyName"
                      required
                      autoComplete="companyName"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
                    />
                  </div>
                </div>
                <div className="col-span-2 xl:col-span-2">
                  <label
                    htmlFor="companyLogo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Company Logo
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="companyLogo"
                      id="companyLogo"
                      required
                      autoComplete="companyLogo"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
                    />
                  </div>
                </div>

                <div className="col-span-2 xl:col-span-4">
                  <label
                    htmlFor="salary"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Salary Range
                  </label>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="mt-2 lg:col-span-2 flex items-center gap-4">
                      <input
                        type="number"
                        name="startingSalary"
                        id="salary"
                        required
                        autoComplete="salary"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
                      />
                      <p>to</p>
                    </div>
                    <div className="mt-2 lg:col-span-2">
                      <input
                        type="number"
                        name="endingSalary"
                        id="endingSalary"
                        required
                        autoComplete="endingSalary"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="vacancy"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Job Vacancy
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="vacancy"
                      id="vacancy"
                      required
                      autoComplete="vacancy"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
                    />
                  </div>
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="userName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    User Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="userName"
                      id="userName"
                      required
                      defaultValue={user?.displayName}
                      readOnly
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="jobName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Job Title
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="jobName"
                      id="jobName"
                      required
                      autoComplete="jobName"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="jobCategory"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Job Category
                  </label>
                  <div className="mt-2">
                    <select
                      id="jobCategory"
                      name="jobCategory"
                      required
                      autoComplete="jobCategory"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6 px-2"
                    >
                      <option value="On Site">On Site</option>
                      <option value="Remote">Remote</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="jobPostDate"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Job Posting Date
                  </label>
                  <div className="mt-2">
                    <ReactDatePicker
                      selected={new Date()}
                      dateFormat="dd/MM/yyyy"
                      disabled
                      required
                      name="postingDate"
                      id="postingDate"
                      className="block w-[310px] sm:w-[390px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4 bg-[#FFF]"
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="deadline"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Application Deadline
                  </label>
                  <div className="mt-2">
                    <ReactDatePicker
                      selected={deadline}
                      onChange={(date) => setDeadline(date)}
                      minDate={new Date()}
                      required
                      dateFormat="dd/MM/yyyy"
                      name="deadline"
                      id="deadline"
                      className="block w-[310px] sm:w-[390px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4 bg-[#FFF]"
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="applicants"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Applicants Number
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="applicants"
                      id="applicants"
                      required
                      autoComplete="applicants"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
                      defaultValue="0"
                      readOnly
                    />
                  </div>
                </div>

                <div className="col-span-2 lg:col-span-full">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Job Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      type="text"
                      name="description"
                      id="description"
                      required
                      autoComplete="description"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4 h-72 resize-none"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <button
                    type="submit"
                    className="bg-gray-500 text-[#FFF] text-lg font-semibold w-full py-3 rounded-lg hover:bg-gray-700"
                  >
                    Add Job
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAJob;
