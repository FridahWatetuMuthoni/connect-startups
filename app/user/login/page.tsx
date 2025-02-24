"use client";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import React, { useState } from "react";
import { social_login } from "../../../lib/actions/auth";
import { signIn } from "next-auth/react";
import Loading from "@/components/Loading";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("search") || "/";
  const router = useRouter();
  let isLoading = false;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    isLoading = true;

    const result = await signIn("credentials", {
      email: user.email,
      password: user.password,
      callbackUrl: "/",
      redirect: false,
    });
    console.log(result);
    if (result?.error) {
      if (result.error == "Configuration") {
        setError("Invalid email or password");
      } else {
        setError("Something went wrong, refresh and try again");
      }
    } else {
      isLoading = false;
      router.push("/");
      router.refresh();
    }
    // const response = await credentials_login({
    //   email: user.email,
    //   password: user.password,
    // });

    // if (response?.message) {
    //   console.log(response.message);
    //   setError(response?.message);
    // } else {
    //   update();
    //   router.push("/");
    // }
  };
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-600">
              Welcome Back
            </h2>
          </div>
          {/* Google and Github Button */}

          <div className="mt-7 flex gap-2 items-center justify-center">
            <button
              onClick={() => social_login("github", callbackUrl)}
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
              onClick={() => social_login("google", callbackUrl)}
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
          {error && (
            <p className="text-red-500 text-sm my-3 italic text-center">
              {error}
            </p>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
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
                className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 focus:outline-indigo-600"
                required
                name="email"
                onChange={(e) => handleChange(e)}
              />
            </div>
            {/* Password */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="block w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 focus:outline-indigo-600"
                  required
                  name="password"
                  onChange={(e) => handleChange(e)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? (
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
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
              href="/user/register"
              className="font-medium text-indigo-600 hover:text-indigo-400"
            >
              Sign up now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
