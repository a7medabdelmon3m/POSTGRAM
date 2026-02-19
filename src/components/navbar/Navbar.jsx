import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaBars,
  FaTimes,
  FaPaperPlane,
  FaHome,
  FaChartLine,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
// صورة البروفايل
import userImg from "../../assets/images/elwan.png"; // تأكد إن الصورة موجودة
import { authContext } from "../../useContext/authContext";

export default function MyNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { userToken, clearAuthContextToken } = useContext(authContext);
  const isUserLogin = !!userToken;

  // دالة الستايل للروابط (Active vs Inactive)
  const getLinkClasses = ({ isActive }) =>
    `flex items-center gap-2 font-medium transition-all duration-300 hover:text-[#00644E] relative group text-sm ${
      isActive ? "text-[#00644E] font-bold" : "text-gray-500"
    }`;

  function handleLogOut() {
    localStorage.removeItem("postGramTkn");
    localStorage.removeItem("userData");
    clearAuthContextToken();
    navigate("/login");
  }

  return (
    <nav className="bg-white/80 backdrop-blur sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link to="/" className="shrink-0 flex items-center gap-2 group">
            <div className="p-1.5 bg-[#F7BF2D] rounded-lg text-white shadow-sm transition-transform duration-300 group-hover:scale-110">
              <FaPaperPlane size={14} />
            </div>
            <h1 className="text-xl font-bold text-[#00644E] tracking-wide group-hover:text-[#00644E] transition-colors font-sans">
              Postgram
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Search Input */}
            {isUserLogin && (
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-gray-100 text-gray-700 placeholder-gray-400 rounded-lg py-2 pl-9 pr-4 focus:outline-none focus:ring-1 focus:ring-[#00644E] w-48 transition-all duration-300 border border-transparent text-sm"
                />
                <FaSearch className="absolute left-3 top-2.5 text-gray-400 group-focus-within:text-[#00644E] text-xs" />
              </div>
            )}

            {/* Navigation Links */}
            {isUserLogin && (
              <div className="flex gap-6">
                <NavLink to="/home" className={getLinkClasses}>
                  <FaHome size={16} /> Home
                </NavLink>
                <NavLink to="/dashboard" className={getLinkClasses}>
                  <FaChartLine size={16} /> Dashboard
                </NavLink>
              </div>
            )}

            {/* Auth & Profile Section */}
            <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
              {/* 1. Auth Buttons (Login / Register) */}
              {!isUserLogin && (
                <div className="flex items-center gap-3">
                  <Link to="/login">
                    <button className="text-sm text-[gray-600] font-medium hover:text-[#00644E] transition-colors">
                      Login
                    </button>
                  </Link>
                  <Link to="/register">
                    <button className="px-4 py-2 text-sm bg-[#00644E] text-white font-medium rounded-lg shadow-sm hover:bg-[#029E75] transition-all hover:shadow-md">
                      Register
                    </button>
                  </Link>
                </div>
              )}

              {/* 2. Profile Dropdown (User Logged In) */}
              {isUserLogin && (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    onBlur={() =>
                      setTimeout(() => setIsProfileOpen(false), 200)
                    }
                    className="flex items-center focus:outline-none group"
                  >
                    <div className="w-9 h-9 rounded-full border border-[#F7BF2D] p-0.5 group-hover:border-[#00644E] transition-all duration-300">
                      <img
                        src={userImg}
                        alt="User Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100 animate-in fade-in zoom-in duration-200">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-[#00644E] transition-colors text-sm font-medium"
                      >
                        <FaUser className="text-gray-400" /> Profile
                      </Link>
                      <button
                        onClick={handleLogOut}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-500 transition-colors text-sm font-medium border-t border-gray-50 mt-1"
                      >
                        <FaSignOutAlt className="text-gray-400" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button -*/}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-[#00644E] focus:outline-none transition-colors"
            >
              {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu*/}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden bg-white border-t border-gray-100 ${isOpen ? "max-h-[500px] opacity-100 shadow-lg" : "max-h-0 opacity-0"}`}
      >
        <div className="px-4 pt-4 pb-6 space-y-4">
          {isUserLogin && (
            <>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-gray-100 text-gray-700 placeholder-gray-400 rounded-lg py-2 pl-9 pr-4 focus:outline-none focus:ring-1 focus:ring-[#00644E] text-sm"
                />
                <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-xs" />
              </div>
              <Link
                to="/home"
                className="flex items-center gap-3 text-gray-700 hover:text-[#00644E] hover:bg-gray-50 px-2 py-2 rounded-lg transition-colors font-medium"
              >
                <FaHome size={16} /> Home
              </Link>
              <Link
                to="/dashboard"
                className="flex items-center gap-3 text-gray-700 hover:text-[#00644E] hover:bg-gray-50 px-2 py-2 rounded-lg transition-colors font-medium"
              >
                <FaChartLine size={16} /> Dashboard
              </Link>
            </>
          )}

          {/* Mobile Profile Actions */}
          {isUserLogin && (
            <div className="pt-2 border-t border-gray-100 mt-2">
              <p className="text-gray-400 text-xs font-bold mb-2 uppercase tracking-wider px-2">
                Account
              </p>
              <Link
                to="/profile"
                className="flex items-center gap-3 text-gray-700 hover:text-[#00644E] hover:bg-gray-50 px-2 py-2 rounded-lg font-medium"
              >
                <FaUser size={14} /> My Profile
              </Link>
              <button
                onClick={handleLogOut}
                className="w-full flex items-center gap-3 text-red-500 hover:bg-red-50 px-2 py-2 rounded-lg font-medium transition-colors"
              >
                <FaSignOutAlt size={14} /> Logout
              </button>
            </div>
          )}

          {/* Mobile Auth Buttons */}
          {!isUserLogin && (
            <div className="pt-4 flex flex-col gap-3 border-t border-gray-100">
              <div className="flex gap-3">
                <Link
                  to="/login"
                  className="flex-1 text-center py-2 text-gray-600 border border-gray-200 rounded-lg hover:border-[#00644E] hover:text-[#00644E] transition-colors text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex-1 text-center py-2 bg-[#00644E] text-white rounded-lg hover:bg-[#029E75] transition-colors text-sm font-medium"
                >
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
