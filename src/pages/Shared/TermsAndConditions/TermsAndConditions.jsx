import useTitle from "../../../hooks/useTitle";

const TermsAndConditions = () => {
  useTitle("Terms&Conditions");
  return (
    <div className="mb-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">
        Terms & Conditions
      </h1>
      <h2 className="text-xl font-semibold mb-3">General Terms</h2>
      <p className="">
        <span className="font-semibold">Acceptance of Terms:</span> This section
        outlines that by using the website, users agree to adhere to the terms
        and conditions laid out by the website. {"It's"} a fundamental agreement
        that users need to consent to before using the service. <br />
        <span className="font-semibold">User Eligibility:</span>It specifies the
        conditions under which users can access and use the platform. Usually,
        it states the minimum age requirement and the capacity to enter into a
        legal contract. <br />
        <span className="font-semibold">User Account:</span> This part focuses
        on the responsibility of users to maintain the confidentiality of their
        account credentials and the activities associated with their account.
        <br />
        <span className="font-semibold">Use Restrictions:</span> Users agree not
        to engage in any activity that disrupts or interferes with the proper
        functioning of the Site or its services.
        <br />
        <span className="font-semibold">Modification of Terms:</span> The Site
        reserves the right to modify or update these terms at any time. Users
        will be notified of such changes and continued use of the Site
        constitutes acceptance of the modified terms.
      </p>
      <h2 className="text-xl font-semibold my-3">Security</h2>
      <p className="">
        <span className="font-semibold">Data Security:</span> This section
        discusses the measures taken by the website to protect user data and
        information. It often includes a disclaimer that no system can guarantee
        complete security. <br />
        <span className="font-semibold">Account Security: </span>Users are urged
        to maintain the security of their accounts and notify the website of any
        unauthorized access or security breaches to protect their personal
        information. <br />
        <span className="font-semibold">Third-Party Links:</span> If the website
        contains links to other websites, it may disclaim responsibility for the
        security and privacy practices of those external sites. It advises users
        to be cautious when navigating to these external links.
      </p>
      <h2 className="text-xl font-semibold my-3">Jobs</h2>
      <p className="">
        <span className="font-semibold">Job Postings:</span> Here, the website
        may state that the job listings are provided by third parties and the
        website doesn’t guarantee the accuracy, completeness, or reliability of
        those postings. <br />
        <span className="font-semibold">Job Applications: </span>This part often
        stresses that users are responsible for the accuracy of the information
        they submit when applying for jobs through the website. The website
        {"doesn't"} guarantee job placement or the outcome of the hiring
        process. <br />
        <span className="font-semibold">Job Search:</span> It emphasizes that
        the website provides a platform for job seekers to find opportunities
        but does not assure employment. The responsibility for securing a job
        ultimately lies with the users.
      </p>
      <h2 className="text-xl font-semibold my-3">Ownership</h2>
      <p className="">
        <span className="font-semibold">Site Content:</span> This section
        explains that all the content provided on the website, such as text,
        images, logos, and software, is the property of the website and is
        protected by intellectual property laws. <br />
        <span className="font-semibold">User Content:</span> Users retain
        ownership of the content they provide but grant the website a license to
        use, reproduce, and modify the content for website purposes. <br />
        <span className="font-semibold">Trademarks:</span> It clarifies the
        ownership of trademarks, service marks, and logos used on the website,
        noting they belong to their respective owners.
      </p>
    </div>
  );
};

export default TermsAndConditions;
