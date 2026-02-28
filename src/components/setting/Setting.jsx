import { addToast, Button } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaKey, FaLock, FaExclamationTriangle } from "react-icons/fa";
import { z } from "zod";
import { authContext } from "../../useContext/authContext";

const changePasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required !!!")
      .regex(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*-+=])(?!\s).{8,20}$/,
        "Password is too weak",
      ),
    newPassword: z
      .string()
      .min(1, "New Password is required !!!")
      .regex(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*-+=])(?!\s).{8,20}$/,
        "Password is too weak",
      ),
    rePassword: z.string().min(1, "Confirmation is required !!!"),
  })
  .refine((data) => data.newPassword === data.rePassword, {
    message: "Passwords do not match !!",
    path: ["rePassword"],
  });

export default function Setting() {
  const validStyle =
    " pr-4 border-gray-200 focus:border-[#00644E] focus:ring-1 focus:ring-[#00644E] transition-all bg-gray-50";
  const nonValidStyle =
    " pr-10 border-red-700 focus:border-red-700 focus:ring-1 focus:ring-red-700 transition-all bg-red-50";
     const {setAuthContextToken} =  useContext(authContext)

  const { handleSubmit, register, formState } = useForm({
    mode: "onChange", // خليها onChange عشان اليوزر يشوف الخطأ وهو بيكتب
    resolver: zodResolver(changePasswordSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (vals) => {
      return axios.patch(
        `https://route-posts.routemisr.com/users/change-password`,
        { password: vals.password, newPassword: vals.newPassword },
        { headers: { token: localStorage.getItem("postGramTkn") } }, 
      );
    },
    onSuccess: (resp) => {
        const newToken = resp?.data?.data?.token ;
        console.log(newToken);
        
        localStorage.setItem("postGramTkn", newToken) ;
        setAuthContextToken(newToken)
      addToast({
        title: "Congratulations",
        description: resp?.data?.message || "Password updated successfully!",
        color: "success",
      });
    },
    onError: (error) => {
      addToast({
        title: "Sorry!",
        description: error.response?.data?.message || "Something went wrong",
        color: "danger",
      });
    },
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-gray-100"
      dir="ltr"
    >
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-8 pt-8 pb-4 border-b border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-[#F7BF2D] rounded-full text-white">
            <FaKey size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Change Password
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Keep your account secure.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit((data) => mutate(data))}
          className="p-8 space-y-5"
        >
          {/* Current Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Current password
            </label>
            <div className="relative">
              <input
                {...register("password")}
                placeholder="Enter Current Password"
                type="password"
                className={`w-full pl-4 py-3 border-2 rounded-xl focus:outline-none ${formState.errors.password ? nonValidStyle : validStyle}`}
              />
            </div>
            {formState.errors.password && (
              <p className="text-red-700 text-xs mt-1">
                {formState.errors.password.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              New password
            </label>
            <div className="relative">
              <input
                {...register("newPassword")}
                placeholder="Enter New Password"
                type="password"
                className={`w-full pl-4 py-3 border-2 rounded-xl focus:outline-none ${formState.errors.newPassword ? nonValidStyle : validStyle}`}
              />
            </div>
            {formState.errors.newPassword && (
              <p className="text-red-700 text-xs mt-1">
                {formState.errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Confirm new password
            </label>
            <div className="relative">
              <input
                {...register("rePassword")}
                placeholder="Re-Enter New Password"
                type="password"
                className={`w-full pl-4 py-3 border-2 rounded-xl focus:outline-none ${formState.errors.rePassword ? nonValidStyle : validStyle}`}
              />
            </div>
            {formState.errors.rePassword && (
              <p className="text-red-700 text-xs mt-1">
                {formState.errors.rePassword.message}
              </p>
            )}
          </div>

          <Button
            isLoading={isPending}
            type="submit"
            className="w-full bg-[#00644E] text-white font-bold py-6 rounded-xl hover:bg-[#065F48]"
          >
            {!isPending && <span>Update password</span>}
            
          </Button>
        </form>
      </div>
    </div>
  );
}
