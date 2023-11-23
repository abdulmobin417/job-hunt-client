import useTitle from "../../../hooks/useTitle";
import Clients from "../../Clients/Clients";
import Stats from "../../Stats/Stats";
import Testimonial from "../../Testimonial/Testimonial";
import Banner from "../Banner/Banner";
import JobCategory from "../JobCategory/JobCategory";

const Home = () => {
  useTitle("Home");
  return (
    <div>
      <Banner></Banner>
      <Stats></Stats>
      <JobCategory></JobCategory>
      <Clients></Clients>
      <Testimonial></Testimonial>
    </div>
  );
};

export default Home;
