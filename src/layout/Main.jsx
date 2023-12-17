import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";

const Main = () => {
  return (
    <div>
      <div className="mx-auto max-w-7xl">
        <Navbar />
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Main;
