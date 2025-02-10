"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import React from "react";
import { login } from "../../../lib/actions/auth";

function Register() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md md:max-w-lg">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-600">
              Sign Up
            </h2>
          </div>
          {/* Google and Github Button */}

          <div className="mt-7 flex gap-2 items-center justify-center">
            <button
              onClick={() => login("github", callbackUrl)}
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-xs font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Image
                src="https://www.svgrepo.com/show/512317/github-142.svg"
                alt="GitHub"
                className="h-[18px] w-[18px] "
                width="18"
                height="18"
              />
              Continue with GitHub
            </button>

            <button
              onClick={() => login("google", callbackUrl)}
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-xs font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Image
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="h-[18px] w-[18px] "
                width="18"
                height="18"
              />
              Continue with Google
            </button>
          </div>
          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-100 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          {/* Form */}
          <form className="space-y-6">
            <section className="flex items-center justify-center gap-2">
              {/* email and name */}
              {/* Email */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-3 py-2  border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 focus:outline-indigo-600"
                  required
                />
              </div>
              {/* Name */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full px-3 py-2  border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 focus:outline-indigo-600"
                  required
                />
              </div>
            </section>

            {/* Password */}
            <section className="flex items-center justify-center gap-2">
              {/* password one and password 2 */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="password1"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type="password"
                    id="password1"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 focus:outline-indigo-600"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="password2"
                >
                  Repeat Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type="password"
                    id="password2"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 focus:outline-indigo-600"
                    required
                  />
                </div>
              </div>
            </section>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-600 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-sm text-indigo-600 hover:text-indigo-400"
              >
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 sm:py-3 border border-transparent rounded-lg shadow-sm text-sm sm:text-base font-medium text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            >
              <span>Sign In</span>
            </button>
          </form>
          <p className="mt-6 text-center text-sm">
            Dont have an account?{" "}
            <a
              href="/user/login"
              className="font-medium text-indigo-600 hover:text-indigo-400"
            >
              Login now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
