import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCalendarAlt,
  FaVenusMars,
  FaPaperPlane,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo (2).svg";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Swal from "sweetalert2";
import { PulseLoader } from "react-spinners";

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

const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "zod:Name is required !!!")
      .min(3, "zodthe name must be at least 3 characters")
      .max(15, "zodthe name must be at most 15 characters"),

    email: z
      .string()
      .min(1, "zodEmail is required !!!")
      .email("zodEmail format is invalid !!!"),

    password: z
      .string()
      .min(1, "zodPassword is required !!!")
      .regex(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*-+=])(?!\s).{8,20}$/,
        "Password is too weak",
      ),

    rePassword: z.string().min(1, "zodConfirmation is required !!!"),

    dateOfBirth: z.coerce.date("invalid date !!!").refine(
      (date) => {
        const today = new Date();
        let age = today.getFullYear() - date.getFullYear();
        const monthDiff = today.getMonth() - date.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < date.getDate())
        ) {
          age--;
        }
        return age >= 18;
      },
      { message: "zod Age must be at least 18 years !!!" },
    ),

    gender: z.enum(["male", "female"], {
      errorMap: () => ({ message: " zod Gender is required !!!" }),
    }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "zod Passwords do not match !!",
    path: ["rePassword"],
  });

export default function Register() {
  // Libraries( formik ,react-hook-form (RHF) ) => get values and put values from and in inputs + validation

  // Formik => disadvantages => multible renders

  // RHF => handle inputs useing refrences no states !!

  // const [usernameValue, setUsernameValue] = useState('')

  //  function getUsernameValue(e){
  //    const val = e.target.value ;
  //   setUsernameValue(val) ;
  //   console.log(val);

  //  }
  const navigate = useNavigate() ; 
  const [showLoading, setShowLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState,
    setError,
    getValues,
    trigger,
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "male",
    },
    mode: "onSubmit",
    resolver: zodResolver(registerSchema),
  });

  function myHandleSubmit(vals) {
    // e.preventDefault();
    // console.log(vals);
    // const {data} = await axios.post('https://linked-posts.routemisr.com/users/signup')
    // console.log(data);
    setShowLoading(true);
    axios
      .post("https://linked-posts.routemisr.com/users/signup", vals)
      .then(function (resp) {
        console.log("resp", resp.data.message);
        confirmationEvent("Congratulation 👌", "#5CB85D");
        setTimeout(() => {
        navigate('/login') ;
        }, 1000);
      })
      .catch(function (error) {
        console.log("ERROR", error.response.data.error);
        const msg = error.response.data.error || "Something went wrong";
        confirmationEvent(msg, "#F2103B");
      })
      .finally(function () {
        setShowLoading(false);
      });
  }

  // const obj =  register('name')
  // console.log(formState.errors) ;

  const passwordValue = watch("password");

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#00644E] via-[#029E75] to-[#589FC7] p-4">
      {/* <button onClick={()=> confirmationEvent('sorry , there is problem ! 😥' , '#F2103B')} className="bg-amber-600 p-3">ahmed</button> */}

      {/* Container */}
      <div className="w-full max-w-lg bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:scale-[1.01] duration-300">
        {/* Header & Logo */}
        <img className=" animate-pulse" src={logo} alt="postman logo" />

        {/* Form */}
        <form
          onSubmit={handleSubmit(myHandleSubmit)}
          className="px-8 pb-8 space-y-5"
        >
          {/* First Name */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="text-[#065F48] group-focus-within:text-[#F7BA1C] transition-colors duration-300" />
            </div>
            <input
              // onChange={getUsernameValue}
              // value={usernameValue}
              {...register(
                "name",
                //  {
                //   // required:true
                //   required: { value: true, message: "Name Is Required !!" },
                //   minLength: {
                //     value: 3,
                //     message: "Name Must Be At Least 3 Characters !!",
                //   },
                //   maxLength: {
                //     value: 15,
                //     message: "Name Must Be At Most 15 Characters !!",
                //   },
                // }
              )}
              type="text"
              placeholder="Name"
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#00644E] focus:ring-1 focus:ring-[#00644E] transition-all bg-gray-50"
            />
            {formState.errors.name && formState.touchedFields.name && (
              <p className="text-red-700 text-sm font-semibold ml-2 mt-1">
                {formState.errors.name?.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className="text-[#065F48] group-focus-within:text-[#F7BA1C] transition-colors duration-300" />
            </div>
            <input
              {...register(
                "email",
                // {
                //   required: { value: true, message: "Email Is Required !!" },
                //   pattern: {
                //     value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/,
                //     message: "Email Is Not In Format !!",
                //   },
                // }
              )}
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

          {/* Password & Re-password Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-[#065F48] group-focus-within:text-[#F7BA1C] transition-colors duration-300" />
              </div>
              <input
                {...register(
                  "password",
                  // ,{
                  //   required: { value: true, message: "Password Is Required !!" },
                  //   pattern:{value:/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*-+=])(?!\s).{8,20}$/,
                  //     message:'Password Is Not In Format !!'
                  //    },
                  //    onChange: () => {
                  //     if (watch('rePassword')) trigger('rePassword');
                  //    }

                  // }
                )}
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#00644E] focus:ring-1 focus:ring-[#00644E] transition-all bg-gray-50"
              />
              {formState.errors.password &&
                formState.touchedFields.password && (
                  <p className="text-red-700 text-sm font-semibold ml-2 mt-1">
                    {formState.errors.password?.message}
                  </p>
                )}
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-[#065F48] group-focus-within:text-[#F7BA1C] transition-colors duration-300" />
              </div>
              <input
                {...register(
                  "rePassword",
                  // , {
                  //   required:{value:true , message:"Password Confirmaition Is Required "},
                  //   pattern:{value:true , message:'Password Confirm Is Not In Format !!'},
                  // validate:function(value){
                  //   const password = getValues('password') ;
                  //   if(password === value){
                  //     return true ;
                  //   }else{
                  //     return 'Password And It`s Confirmation Is Not Match !!'
                  //   }
                  // }
                  //   validate:function(value){
                  //     if(passwordValue  === value){
                  //       return true ;
                  //     }else{
                  //       return 'Password And It`s Confirmation Is Not Match !!'
                  //     }
                  //   }
                  // }
                )}
                type="password"
                placeholder="Confirm Password"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#00644E] focus:ring-1 focus:ring-[#00644E] transition-all bg-gray-50"
              />
              {formState.errors.rePassword &&
                formState.touchedFields.rePassword && (
                  <p className="text-red-700 text-sm font-semibold ml-2 mt-1">
                    {formState.errors.rePassword?.message}
                  </p>
                )}
            </div>
          </div>

          {/* Date of Birth & Gender Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaCalendarAlt className="text-[#065F48] group-focus-within:text-[#F7BA1C] transition-colors duration-300" />
              </div>
              <input
                {...register(
                  "dateOfBirth",
                  // , {
                  //   required: { value: true, message: "Date Of Birth Is Required !!" },
                  //   valueAsDate:true ,
                  //   validate:function(value){
                  //     const sellectedYear =  value.getFullYear() ;
                  //     const currentYear = new Date().getFullYear() ;
                  // console.log(sellectedYear , currentYear) ;
                  // if(currentYear - sellectedYear >= 18 ){
                  //  console.log(sellectedYear , currentYear) ;
                  //       return true ;
                  //     }
                  //     else{
                  //       return 'Sorry,Minimum Age Is 18 !!'

                  //     }
                  //   }

                  // }
                )}
                type="date"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#00644E] focus:ring-1 focus:ring-[#00644E] transition-all bg-gray-50 text-gray-500"
              />
              {formState.errors.dateOfBirth &&
                formState.touchedFields.dateOfBirth && (
                  <p className="text-red-700 text-sm font-semibold ml-2 mt-1">
                    {formState.errors.dateOfBirth?.message}
                  </p>
                )}
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaVenusMars className="text-[#065F48] group-focus-within:text-[#F7BA1C] transition-colors duration-300" />
              </div>
              <select
                {...register("gender", {
                  required: { value: true, message: "Gender Is Required !!" },
                })}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#00644E] focus:ring-1 focus:ring-[#00644E] transition-all bg-gray-50 text-gray-500 appearance-none"
              >
                <option value="" disabled selected>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {formState.errors.gender && formState.touchedFields.gender && (
                <p className="text-red-700 text-sm font-semibold ml-2 mt-1">
                  {formState.errors.gender?.message}
                </p>
              )}

              {/* Custom Arrow for select */}
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            disabled={showLoading}
            type="submit"
            className="w-full bg-[#00644E] text-white font-bold py-3 rounded-xl hover:bg-[#065F48] shadow-lg hover:shadow-[#F7BA1C]/40 transform hover:-translate-y-1 transition-all duration-300"
          >
            {showLoading ? (
              <PulseLoader color="#F7BA1C" size={8} />
            ) : (
              "Create Account"
            )}
          </button>

          {/* Footer */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-[#589FC7] hover:text-[#00644E] transition-colors"
              >
                Log in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
