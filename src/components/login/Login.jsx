import React, { useContext, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCalendarAlt,
  FaVenusMars,
  FaPaperPlane,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo (2).svg";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Swal from "sweetalert2";
import { PulseLoader } from "react-spinners";
import { authContext } from "../../useContext/authContext";

function confirmationEvent(msg, bg) {
  Swal.fire({
    position: "top",
    title: msg,
    showConfirmButton: false,
    background: bg,
    timer: "1500",
    color: "white",
    width: "fit-content",
    didOpen: () => {
      const title = Swal.getTitle();
      title.style.fontSize = "16px";
    },
  });
}

const registerSchema = z.object({
  email: z
    .string()
    .min(1, "Email or Username is required !!!")
    .refine((val) => {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      const isUsername = /^[a-z0-9_]{3,30}$/.test(val);
      return isEmail || isUsername;
    }, "Please enter a valid Email or Username"),

  password: z
    .string()
    .min(1, "zodPassword is required !!!")
    .regex(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*-+=])(?!\s).{8,20}$/,
      "Password is too weak",
    ),
});

export default function Login() {
  const { setAuthContextToken } = useContext(authContext);
  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  const {
    handleSubmit,
    register,
    formState,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(registerSchema),
  });

  function myHandleSubmit(vals) {
    setShowLoading(true);
    axios
      .post("https://route-posts.routemisr.com/users/signin", vals, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (resp) {
        setAuthContextToken(resp.data.data.token);
        localStorage.setItem("postGramTkn", resp.data.data.token);
        localStorage.setItem("userData", JSON.stringify(resp.data.data.user));
        confirmationEvent("Welcome Back 🥰", "#5CB85D");
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      })
      .catch(function (error) {
        console.log("ERROR", error.response?.data?.message);

        const msg = error.response?.data?.errors || 
                error.response?.data?.message || 
                "Something went wrong";
        confirmationEvent(msg, "#F2103B");
      })
      .finally(function () {
        setShowLoading(false);
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Container */}
      <div className="w-full max-w-lg bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:scale-[1.01] duration-300">
        {/* Header & Logo */}
        <img className="animate-pulse" src={logo} alt="postman logo" />

        {/* Form */}
        <form
          onSubmit={handleSubmit(myHandleSubmit)}
          className="px-8 pb-8 space-y-5"
        >
          {/* Email */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className="text-[#065F48] group-focus-within:text-[#F7BA1C] transition-colors duration-300" />
            </div>
            <input
              {...register("email")}
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#00644E] focus:ring-1 focus:ring-[#00644E] transition-all bg-gray-50"
            />
            {formState.errors.email && formState.touchedFields.email && (
              <p className="text-red-700 text-sm font-semibold ml-2 mt-1">
                {formState.errors.email?.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="grid grid-cols-1 gap-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-[#065F48] group-focus-within:text-[#F7BA1C] transition-colors duration-300" />
              </div>
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"} 
                placeholder="Password"
                className="w-full pl-10 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#00644E] focus:ring-1 focus:ring-[#00644E] transition-all bg-gray-50"
              />
              
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#065F48] hover:text-[#F7BA1C] transition-colors duration-300"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>

              {formState.errors.password &&
                formState.touchedFields.password && (
                  <p className="text-red-700 text-sm font-semibold ml-2 mt-1">
                    {formState.errors.password?.message}
                  </p>
                )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            disabled={showLoading}
            type="submit"
            className="w-full bg-[#00644E] text-white font-bold py-3 rounded-xl hover:bg-[#065F48] shadow-lg hover:shadow-[#F7BA1C]/40 transform hover:-translate-y-1 transition-all duration-300"
          >
            {showLoading ? <PulseLoader color="#F7BA1C" size={8} /> : "Login"}
          </button>

          {/* Footer */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Not have an account?{" "}
              <Link
                to="/Register"
                className="font-bold text-[#589FC7] hover:text-[#00644E] transition-colors"
              >
                Register from here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}