"use client"; // Add this directive to mark this component as a client component

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import SocialSignin from "@/components/shared/SocialSignin";

const SignUpPage = () => {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSignUp = async (event) => {
    event.preventDefault();
    setError(null);
    const newUser = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/signup/api`, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        event.target.reset();
        router.push("/login"); // Redirect after successful signup
      } else {
        throw new Error("Signup failed");
      }
    } catch (error) {
      setError("Failed to sign up. Please try again.");
    }
  };

  return (
    <div className="container mx-auto py-24 px-4 md:px-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="hidden md:block">
          <Image
            src="/assets/images/login/login.svg"
            height={540}
            width={540}
            alt="login image"
          />
        </div>
        <div className="border-2 border-orange-500 rounded-lg p-6 md:p-12">
          <h6 className="text-3xl font-semibold text-center mb-6 md:mb-12">
            Please Sign Up
          </h6>
          <form onSubmit={handleSignUp}>
            <label htmlFor="name">User Name</label>
            <div className="input input-bordered flex items-center gap-2 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                className="grow"
                name="name"
                placeholder="Username"
                required
              />
            </div>
            <label htmlFor="email">Email</label>
            <div className="input input-bordered flex items-center gap-2 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill=""
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="email"
                name="email"
                className="grow"
                placeholder="Email"
                required
              />
            </div>
            <label htmlFor="password">Password</label>
            <div className="input input-bordered flex items-center gap-2 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                name="password"
                className="grow"
                placeholder="Enter password"
                required
              />
            </div>
            {error && <div className="mb-6 text-red-500">{error}</div>}

            <button type="submit" className="btn btn-primary w-full text-base">
              Sign Up
            </button>
          </form>
          <div className="mt-12">
            <h6 className="divider text-cyan-700">or sign in with</h6>
            <SocialSignin />
            <h6 className="text-cyan-700 mt-12">
              Already Have an account?{" "}
              <Link href="/login" className="text-primary font-semibold">
                Sign In
              </Link>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
