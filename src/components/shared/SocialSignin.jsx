"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from 'react';
import { BiLogoFacebookCircle } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";

const SocialSignin = () => {
  const router = useRouter();
  const session = useSession();

  const handleSocialLogin = async (provider) => {
    const res = signIn(provider,{redirect:false});
  };
  if (session.status === "authenticated") {
    router.push("/");
  }
  return (
    <div className="text-center space-x-3">
      <button onClick={() => handleSocialLogin('google')} className="btn bg-slate-300 text-3xl">
        <FcGoogle />
      </button>
      <button onClick={() => handleSocialLogin('github')} className="btn bg-slate-300 text-3xl">
        <ImGithub />
      </button>
      <button onClick={() => handleSocialLogin('facebook')} className="btn bg-slate-300 text-3xl">
        <BiLogoFacebookCircle />
      </button>
    </div>
  );
};

export default SocialSignin;
