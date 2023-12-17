import useRole from "../../../hooks/useRole";
import useTitle from "../../../hooks/useTitle";
import Clients from "../../Clients/Clients";
import Package from "../../Package/Package";
import Stats from "../../Stats/Stats";
import Testimonial from "../../Testimonial/Testimonial";
import Banner from "../Banner/Banner";
import JobCategory from "../JobCategory/JobCategory";

const Home = () => {
  const { isRole } = useRole();
  // console.log(isRole);
  useTitle("Home");
  return (
    <div>
      <Banner />
      <Stats />
      <JobCategory />
      {isRole == "seeker" && <Package />}
      <Clients />
      <Testimonial />
    </div>
  );
};

export default Home;
