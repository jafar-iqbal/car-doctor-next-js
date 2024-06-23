"use client";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React from 'react';
import { BiLogoFacebookCircle } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";

const SocialSignin = () => {
  const searchParams = useSearchParams()
  const path = searchParams.get('redirect')

  const handleSocialLogin = (provider) => {
    const res = signIn(provider, {
      redirect : true,
      callbackUrl : path ? path : '/'
    })
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
