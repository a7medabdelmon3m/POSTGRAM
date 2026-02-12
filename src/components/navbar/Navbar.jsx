import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaSearch, FaBars, FaTimes, FaPaperPlane, FaHome, FaChartLine, FaUser, FaSignOutAlt } from 'react-icons/fa';
// صورة البروفايل
import userImg from '../../assets/images/elwan.png';
import { authContext } from '../../useContext/authContext';

export default function MyNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate()
  const {userToken , clearAuthContextToken} = useContext(authContext)
  const isUserLogin = !!userToken ; 

  const getLinkClasses = ({ isActive }) => 
    `flex items-center gap-2 font-medium transition-all duration-300 hover:text-[#589FC7] relative group ${
      isActive ? 'text-[#F7BA1C]' : 'text-white/90'
    }`;

    function handleLogOut(){
      localStorage.removeItem('postGramTkn') ; 
      clearAuthContextToken() ; 
      navigate('/login');
    }

  return (
    <nav className="bg-gradient-to-r from-[#00644E] to-[#065F48] shadow-lg sticky top-0 z-50 border-b border-[#589FC7]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
            <div className="p-2 bg-[#F7BA1C] rounded-full text-white shadow-md group-hover:rotate-12 transition-transform duration-300">
              <FaPaperPlane size={18} />
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-wider group-hover:text-[#589FC7] transition-colors">
              Postgram
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            
            {/* Search Input */}
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-[#029E75]/50 text-white placeholder-gray-200 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#589FC7] focus:bg-[#00644E] w-32 focus:w-48 transition-all duration-300 border border-transparent focus:border-[#589FC7]"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-200 group-focus-within:text-[#589FC7]" />
            </div>

            {/* Navigation Links */}
            <NavLink to="/home" className={getLinkClasses}>
              <FaHome /> Home
            </NavLink>
            <NavLink to="/dashboard" className={getLinkClasses}>
              <FaChartLine /> Dashboard
            </NavLink>

            {/* --- كل العناصر ظاهرة هنا جنب بعض --- */}
            <div className="flex items-center gap-4 border-l border-[#589FC7]/30 pl-4">
              
              {/* 1. Auth Buttons */}
              { !isUserLogin &&
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <button className="px-4 py-1.5 text-sm text-white font-medium border border-[#589FC7] rounded-full hover:bg-[#589FC7] hover:text-white transition-all shadow-sm">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="px-4 py-1.5 text-sm bg-[#F7BA1C] text-[#00644E] font-bold rounded-full shadow-md hover:bg-[#e5aa18] transform hover:-translate-y-0.5 transition-all">
                    Register
                  </button>
                </Link>
              </div>
              }
              
              {isUserLogin && 
                  <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  onBlur={() => setTimeout(() => setIsProfileOpen(false), 200)}
                  className="flex items-center focus:outline-none group"
                >
                  <div className="w-10 h-10 rounded-full border-2 border-[#F7BA1C] p-0.5 group-hover:border-[#589FC7] transition-all duration-300 shadow-md">
                    <img 
                      src={userImg} 
                      alt="User Profile" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-[#00644E] rounded-xl shadow-2xl py-2 z-50 border border-[#589FC7]/30 overflow-hidden animate-in fade-in zoom-in duration-200">
                    <Link 
                      to="/profile" 
                      className="flex items-center gap-3 px-4 py-3 text-white/90 hover:bg-[#065F48] hover:text-[#F7BA1C] transition-colors border-b border-[#589FC7]/10"
                    >
                      <FaUser className="text-[#589FC7]" /> Profile
                    </Link>
                    <button 
                     onClick={handleLogOut}
                      className="w-full flex items-center gap-3 px-4 py-3 text-white/90 hover:bg-[#b91c1c]/20 hover:text-red-400 transition-colors"
                    >
                      <FaSignOutAlt className="text-[#589FC7]" /> Logout
                    </button>
                  </div>
                )}
              </div>
              }
              {/* 2. Profile Dropdown Section */}
              

            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-white hover:text-[#589FC7] focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - فيه كل حاجة برضه */}
      <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pt-2 pb-6 space-y-3 bg-[#00644E] border-t border-[#589FC7]/30">
          
          <div className="relative mt-3 mb-4">
             <input type="text" placeholder="Search..." className="w-full bg-[#029E75] text-white placeholder-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-[#589FC7]" />
             <FaSearch className="absolute left-3 top-3 text-gray-300" />
          </div>

          <Link to="/home" className="block text-white hover:text-[#F7BA1C] font-medium py-2 border-b border-[#589FC7]/10">Home</Link>
          <Link to="/dashboard" className="block text-white hover:text-[#F7BA1C] font-medium py-2 border-b border-[#589FC7]/10">Dashboard</Link>
          
          {/* Mobile Profile Actions */}
          {isUserLogin && 
            <div className="pt-2">
            <p className="text-[#589FC7] text-sm font-bold mb-2 uppercase tracking-wider">Account</p>
            <Link to="/profile" className="block text-white hover:text-[#F7BA1C] font-medium py-2">My Profile</Link>
            <button onClick={handleLogOut} className="block w-full text-left text-red-400 font-medium py-2">Logout</button>
          </div>
          }
          

          {/* Mobile Auth Buttons */}
          { !isUserLogin &&
            <div className="pt-4 flex flex-col gap-3 border-t border-[#589FC7]/10">
             <p className="text-[#589FC7] text-sm font-bold uppercase tracking-wider">Auth (Test)</p>
             <div className="flex gap-3">
                <Link to="/login" className="flex-1 text-center py-2 text-[#589FC7] border border-[#589FC7] rounded-lg hover:bg-[#589FC7] hover:text-white transition-colors">
                  Login
                </Link>
                <Link to="/register" className="flex-1 text-center py-2 bg-[#F7BA1C] text-[#00644E] font-bold rounded-lg hover:bg-[#e5aa18]">
                  Register
                </Link>
             </div>
          </div>
          }
          

        </div>
      </div>
    </nav>
  );
}