import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FiMenu, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { toast } from "react-toastify";

export const Navbar = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      toast.success(result.data?.message || "Logged out");
      setProfileOpen(false);
      setMobileOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const menuItems = [
    { label: "My Profile", onClick: () => navigate("/profile") },
    { label: "My Courses", onClick: () => navigate("/mycourses") },
  ];

  return (
    <nav className="w-full h-[70px] fixed top-0 left-0 px-4 sm:px-8 flex items-center justify-between bg-white/10 backdrop-blur-md border-b border-white/20 z-[100] shadow-lg">
      {/* Logo */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src={logo}
          alt="Logo"
          className="w-[50px] h-[50px] rounded-lg border border-white/40 shadow-md object-cover"
        />
       
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-4 relative">
        {!userData && (
          <IoPersonCircleOutline
            className="w-[45px] h-[45px] "
            onClick={() => navigate("/login")}
          />
        )}

        {userData && (
          <div className="relative">
            {userData?.photoUrl ? (
              <img
                src={userData.photoUrl}
                alt="avatar"
                className="w-[45px] h-[45px] rounded-full object-cover border border-white/30 cursor-pointer shadow-md"
                onClick={() => setProfileOpen((prev) => !prev)}
              />
            ) : (
              <div
                className="w-[45px] h-[45px] rounded-full text-white flex items-center justify-center text-lg font-semibold border border-white/30 bg-black/70 backdrop-blur-md cursor-pointer shadow-md"
                onClick={() => setProfileOpen((prev) => !prev)}
              >
                {userData?.name?.slice(0, 1).toUpperCase()}
              </div>
            )}
            {profileOpen && (
              <div className="absolute top-[120%] right-0 flex flex-col gap-1 text-[16px] rounded-md bg-white p-2 min-w-[180px] border-[2px] border-black shadow-lg z-[300]">
                <span
                  className="w-full text-black text-left px-4 py-2 rounded-md hover:bg-black hover:text-white cursor-pointer transition"
                  onClick={() => {
                    navigate("/profile");
                    setProfileOpen(false);
                  }}
                >
                  My Profile
                </span>
                <span
                  className="w-full text-black text-left px-4 py-2 rounded-md hover:bg-black hover:text-white cursor-pointer transition"
                  onClick={() => {
                    navigate("/mycourses");
                    setProfileOpen(false);
                  }}
                >
                  My Courses
                </span>
              </div>
            )}
          </div>
        )}

        {userData?.role === "educator" && (
          <div
            className="px-4 py-2 text-white bg-black/70 rounded-lg border border-white/30 shadow-md hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </div>
        )}

        {!userData ? (
          <span
            className="px-6 py-2 border border-white/40 text-white font-medium bg-black/70 rounded-lg shadow-md hover:bg-white hover:text-black hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        ) : (
          <span
            className="px-6 py-2 border border-white/40 text-black font-medium bg-white rounded-lg shadow-md hover:bg-black hover:text-white hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </span>
        )}

        
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center gap-3 z-[200] relative">
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="text-black md:text-white text-3xl cursor-pointer p-1 rounded-md bg-white/70 md:bg-transparent"
        >
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`absolute top-[70px] left-0 w-full bg-black/80 backdrop-blur-md flex flex-col items-center gap-4 py-6 md:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ zIndex: 150 }}
      >
        {!userData && (
          <span
            className="px-6 py-2 border border-white/40 text-white font-medium bg-black/70 rounded-lg shadow-md hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
            onClick={() => {
              navigate("/login");
              setMobileOpen(false);
            }}
          >
            Login
          </span>
        )}

        {userData && (
          <>
            <div className="flex items-center gap-3">
              {userData?.photoUrl ? (
                <img
                  src={userData.photoUrl}
                  alt="avatar"
                  className="w-[45px] h-[45px] rounded-full object-cover border border-white/30"
                />
              ) : (
                <div className="w-[45px] h-[45px] rounded-full text-white flex items-center justify-center text-lg font-semibold border border-white/30 bg-black/70">
                  {userData?.name?.slice(0, 1).toUpperCase()}
                </div>
              )}
              <span className="text-white font-medium">{userData.name}</span>
            </div>

            {menuItems.map((item, idx) => (
              <span
                key={idx}
                className="text-white hover:text-gray-300 cursor-pointer"
                onClick={() => {
                  item.onClick();
                  setMobileOpen(false);
                }}
              >
                {item.label}
              </span>
            ))}

            {userData?.role === "educator" && (
              <span
                className="text-white hover:text-gray-300 cursor-pointer"
                onClick={() => {
                  navigate("/dashboard");
                  setMobileOpen(false);
                }}
              >
                Dashboard
              </span>
            )}

            <span
              className="px-6 py-2 border border-white/40 text-black font-medium bg-white rounded-lg shadow-md hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </span>
          </>
        )}
      </div>
    </nav>
  );
};
