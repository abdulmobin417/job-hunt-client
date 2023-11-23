/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Modal from "react-modal";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import useSeeker from "../../hooks/useSeeker";
import useTitle from "../../hooks/useTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const JobDetails = () => {
  useTitle("Job Details");
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();

  const fetchAJob = async () => {
    const response = await axiosSecure.get(`/jobs/${id}`);
    return response.data;
  };

  const { data: job, refetch } = useQuery({
    queryKey: ["job"],
    queryFn: fetchAJob,
  });

  const [btnDisable, setBtnDisable] = useState(false);
  const [appliedInfo] = useSeeker();

  const dataHas = appliedInfo.some(
    (data) => data.jobId === id && data.seekerEmail === user?.email
  );

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const userName = form.userName.value;
    const userEmail = form.userEmail.value;
    const resumeLink = form.resumeLink.value;
    const appliedDate = new Date();
    const seekerInfo = {
      jobId: job._id,
      jobTitle: job.jobTitle,
      seekerName: userName,
      seekerEmail: userEmail,
      appliedDate,
      seekerResume: resumeLink,
    };
    axiosSecure.post("/seekers", seekerInfo).then((data) => {
      if (data.message) {
        toast.error("Already Applied");
        closeModal();
      } else {
        toast.success("Job Applied Successfully!!!");
        closeModal();
        setBtnDisable(true);
        refetch();
        emailjs
          .send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS__TEMPLATE_ID,
            {
              seekerName: userName,
              seekerEmail: userEmail,
              companyName: job?.companyName,
              jobTitle: job?.jobTitle,
            },
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
          )
          .then((response) => {
            // console.log("Email successfully sent!", response);
          })
          .catch((error) => {
            // console.error("Error sending email:", error);
          });
      }
    });
  };

  return (
    <div className="mb-20">
      <div className="">
        <img
          src={job?.jobBanner}
          alt=""
          className="w-full object-cover h-[320px]"
        />
        <div className="border-x border-b p-4">
          <div className="flex flex-wrap-reverse justify-between items-center py-2">
            <div>
              <p className="text-xl font-semibold">Post: {job?.jobTitle}</p>
              <p className="text-sm font-medium text-gray-500">
                Job Category: {job?.jobCategory}
              </p>
            </div>
            <div className="w-20 bg-gray-500 rounded-full">
              <img className="w-full" src={job?.companyLogo} alt="logo" />
            </div>
          </div>
          <p className="text-xl font-semibold mb-3">Job Specifications:</p>
          <p className="text-gray-500 text-justify">{job?.jobDescription}</p>
          <div className="flex flex-wrap justify-between items-center mt-5">
            <p className="text-lg font-medium">
              Salary Range: {job?.salaryRange}
            </p>
            <p className="text-lg font-medium">
              Applicants: {job?.jobApplicantsNumber}
            </p>
          </div>
          <div className="mt-10">
            <button
              className="btn"
              onClick={openModal}
              disabled={
                user?.email === job?.userEmail ||
                new Date() > new Date(job?.applicationDeadline) ||
                dataHas ||
                btnDisable
              }
            >
              Apply Now
            </button>
            <Modal
              isOpen={modalIsOpen}
              // onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              ariaHideApp={false}
              contentLabel="Example Modal"
            >
              <p className="mb-4 text-xl font-bold text-center">
                Apply Information
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* if there is a button in form, it will close the modal */}
                <div className="w-64 md:w-96">
                  <label
                    htmlFor="email"
                    className="block font-medium leading-6 text-gray-900"
                  >
                    User Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="userName"
                      placeholder="User Name"
                      required
                      id="userName"
                      defaultValue={user?.displayName}
                      readOnly
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block font-medium leading-6 text-gray-900"
                  >
                    User Email
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="userEmail"
                      placeholder="User Email"
                      required
                      id="userEmail"
                      defaultValue={user?.email}
                      readOnly
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block font-medium leading-6 text-gray-900"
                  >
                    Resume Link
                  </label>
                  <div className="mt-2">
                    <input
                      type="url"
                      name="resumeLink"
                      required
                      placeholder="Resume Link"
                      id="resumeLink"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
                    />
                  </div>
                </div>
                <div>
                  <button className="btn mr-2">Submit</button>
                  <button type="button" onClick={closeModal} className="btn">
                    Close
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
