import React, { useState } from "react";
import { LoginBG, Logo } from "../assets";
import { LoginInput } from "../components";
import { FaEnvelope, FaLock, FcGoogle } from "../assets/icons";
import { motion } from "framer-motion";
import { buttonClick } from "../animation";

import {getAuth,signInWithPopup,GoogleAuthProvider} from 'firebase/auth'
import {app} from '../config/firebase.config'
const Login = () => {
  const [userEmail, setuserEmail] = useState("");
  const [isSignUp, setisSignUp] = useState(false);
  const [password, setpassword] = useState("");
  const [confirm, setconfirm] = useState();

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const loginWithGoogle = async()=>{
    await signInWithPopup(firebaseAuth,provider).then((userCred)=>{
      firebaseAuth.onAuthStateChanged((cred)=>{
        if(cred){
          cred.getIdToken().then((token)=>{
            console.log(token)
          })
        }
      })
    })
  }
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
        <p className="text-xl text-textColor -mt-6">{isSignUp?"Sign Up" :"Sign In"} with following</p>
        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
          <LoginInput
            placeHolder={"Email here"}
            icon={<FaEnvelope className="text-xl text-textColor" />}
            inputState={userEmail}
            inputStateFunc={setuserEmail}
            type={"email"}
            isSignUp={isSignUp}
          />
          <LoginInput
            placeHolder={"Password here"}
            icon={<FaLock className="text-xl text-textColor" />}
            inputState={password}
            inputStateFunc={setpassword}
            type={"password"}
            isSignUp={isSignUp}
          />
          {isSignUp && (
            <LoginInput
              placeHolder={"Confirm Password"}
              icon={<FaLock className="text-xl text-textColor" />}
              inputState={confirm}
              inputStateFunc={setconfirm}
              type={"password"}
              isSignUp={isSignUp}
            />
          )}
          {!isSignUp ? (
            <p>
              Don't Have An Account:{" "}
              <motion.button
                {...buttonClick}
                className="text-red-800 underline curser-pointer bg-transparent"
                onClick={()=>setisSignUp(true)}
              >
                Create One
              </motion.button>
            </p>
          ) : (
            <p>
               Already Have An Account:{" "}
              <motion.button
                {...buttonClick}
                className="text-red-800 underline curser-pointer bg-transparent"
                onClick={()=>setisSignUp(false)}
              >
                Sign-In Here
              </motion.button>
            </p>
          )}
          {/* button Section */}
          {isSignUp?<motion.button {...buttonClick} className="w-full px-4 py-2 bg-red-400 rounded-md cursor-pointer text-white capitalize hover:bg-red-600 transition-all duration-150">
           Sign Up
          </motion.button>:<motion.button {...buttonClick} className="w-full px-4 py-2 bg-red-400 rounded-md cursor-pointer text-white capitalize hover:bg-red-600 transition-all duration-150">
          Sign In
          </motion.button>}
        </div>
        <div className="flex items-center justify-between gap-16">
          <div className="w-24 h-[1px] rounded-md bg-white" >
          </div>
          <p className="text-white">or</p>
          <div className="w-24 h-[1px] rounded-md bg-white" >
          </div>
          </div>
          <motion.div onClick={loginWithGoogle} {...buttonClick} className="flex justify-center items-center px-20 py-2 bg-lightOverlay backdrop-blur-md cursor-pointer rounded-3xl gap-4">
            <FcGoogle className="text-3xl"/>
            <p className="capitalize text-base text-headingColor">Signin with Google</p>
          </motion.div>
        
      </div>
    </div>
  );
};

export default Login;
