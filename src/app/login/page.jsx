import SocialSignin from "@/components/shared/SocialSignin";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Suspense } from 'react';

const Page = () => {
  const router = useRouter();
  const session = useSession();
  const searchParams = typeof window !== 'undefined' ? useRouter().query : null;
  const path = searchParams ? searchParams.redirect : null;

  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const res = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: path ? path : "/",
    });
  };

  return (
    <div className="container mx-auto py-24 px-24">
      <div className="grid grid-cols-2 gap-12 items-center">
        <div>
          <Image
            src="/assets/images/login/login.svg"
            height={540}
            width={540}
            alt="login image"
          />
        </div>
        <div className="border-2 border-orange-500 rounded-lg p-12">
          <h6 className="text-3xl font-semibold text-center mb-12">
            Please Sign In
          </h6>
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2">Email</label>
              <div className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="none"
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
            </div>
            <div className="mb-12">
              <label htmlFor="password" className="block mb-2">Password</label>
              <div className="input input-bordered flex items-center gap-2">
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
            </div>

            <button type="submit" className="btn btn-primary w-full text-base">
              Sign in
            </button>
          </form>
          <div className="mt-12">
            <h6 className="divider text-cyan-700">or sign in with</h6>
            <div className="text-center space-x-3">
              <SocialSignin />
              <h6 className="text-cyan-700 mt-12">
                Do not have an account?{" "}
                <Link href="/signup" className="text-primary font-semibold">
                  Sign Up
                </Link>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
