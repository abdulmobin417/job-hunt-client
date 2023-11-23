import { NavLink } from "react-router-dom";
import logo from "../../../assets/logo1.png";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
// import pic from "../../../assets/user.png";
import { Tooltip as ReactTooltip } from "react-tooltip";

const Navbar = () => {
  const { user, logOut, logUserInfo } = useContext(AuthContext);
  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const navOptions = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-[#f03737]" : "text-[#474747] hover:text-[#f03737]"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/alljobs"
          className={({ isActive }) =>
            isActive ? "text-[#f03737]" : "text-[#474747] hover:text-[#f03737]"
          }
        >
          All Jobs
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="appliedjobs"
              className={({ isActive }) =>
                isActive
                  ? "text-[#f03737]"
                  : "text-[#474747] hover:text-[#f03737]"
              }
            >
              Applied Jobs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="addajob"
              className={({ isActive }) =>
                isActive
                  ? "text-[#f03737]"
                  : "text-[#474747] hover:text-[#f03737]"
              }
            >
              Add A Job
            </NavLink>
          </li>
          <li>
            <NavLink
              to="myjobs"
              className={({ isActive }) =>
                isActive
                  ? "text-[#f03737]"
                  : "text-[#474747] hover:text-[#f03737]"
              }
            >
              My Jobs
            </NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink
          to="blogs"
          className={({ isActive }) =>
            isActive ? "text-[#f03737]" : "text-[#474747] hover:text-[#f03737]"
          }
        >
          Blogs
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 my-8 px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-base"
          >
            {navOptions}
          </ul>
        </div>
        <NavLink to="/">
          <div className="flex items-center">
            <img src={logo} className="w-8" alt="" />
            <h1 className="text-xl font-semibold text-[#474747]">MyJobGator</h1>
          </div>
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium text-base gap-2">
          {navOptions}
        </ul>
      </div>
      <div className="navbar-end">
        <div className="z-20">
          {user ? (
            <div>
              <details className="dropdown">
                <summary className="m-1 btn bg-[#FFF] border-0 hover:bg-[#FFF]">
                  {user?.photoURL ? (
                    <img
                      className="w-12 h-12 rounded-full object-cover"
                      src={user.photoURL}
                      data-tooltip-id="my-tooltip-2"
                      alt=""
                    />
                  ) : (
                    <img
                      className="w-10"
                      src={logUserInfo?.photo}
                      data-tooltip-id="my-tooltip-2"
                      alt=""
                    />
                  )}
                </summary>
                <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-36 absolute right-0">
                  <li className="flex items-center">
                    <NavLink to="/profile">
                      Profile
                    </NavLink>
                  </li>
                  <li className="flex items-center">
                    <NavLink to="/login">
                      <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-white bg-[#FF3811] rounded-md"
                      >
                        Sign Out
                      </button>
                    </NavLink>
                  </li>
                </ul>
              </details>
            </div>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-[#f03737] text-base font-semibold"
                  : "text-[#474747] text-base font-semibold hover:text-[#f03737]"
              }
            >
              Login
            </NavLink>
          )}
          <ReactTooltip
            id="my-tooltip-2"
            place="left"
            style={{ backgroundColor: "#f03737" }}
            content={user?.displayName}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
