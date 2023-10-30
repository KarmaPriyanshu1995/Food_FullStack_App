import React, { useState } from "react";
import { LoginBG, Logo } from "../assets";
import { LoginInput } from "../components";
import { FaEnvelope } from "../assets/icons";
const Login = () => {
  const [userEmail, setuserEmail] = useState("");
  const [isSignUp, setisSignUp] = useState(false);
  return (
    <div className="w-screen h-screen relative overflow-hidden flex">
      <img
        src={LoginBG}
        className="w-full h-full object-cover absolute top-0 left-0"
        alt=""
      />
      {/* content box */}
      <div className="flex flex-col items-center bg-lightOverlay w-[80%] md:w-508 h-full z-10 backdrop-blur-md p-4 px-4 py-12 gap-6">
        {/*Top Logo Section */}
        <div className="flex items-center justify-start gap-4 w-full">
          <img src={Logo} className="w-8" />
          <p className="text-headingColor font-semibold text-2xl">City</p>
        </div>
        <p className="text-3xl font-semibold text-headingColor ">
          Welcome Back
        </p>
        <p className="text-xl text-textColor -mt-6">Sign in with following</p>
        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
          <LoginInput
            placeHolder={"Email here"}
            icon={<FaEnvelope className="text-xl text-textColor" />}
            inputState={userEmail}
            inputStateFunc={setuserEmail}
            type={"email"}
            isSignUp={isSignUp}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
