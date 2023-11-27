import React from "react";
import { BsFillBellFill, BsToggles2 } from "react-icons/bs";
import { MdLogout, MdSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { buttonClick } from "../animation";
import { Avatar } from "../assets";
import { useNavigate } from "react-router-dom";
import { setUserNull } from "../context/actions/usersActions";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
export default function DBHeader() {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signOut = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        dispatch(setUserNull());
        navigate("/login", { replace: true });
      })
      .catch((err) => console.log(err));
  };
  const user = useSelector((state) => state.user);
  // console.log(user?.data?.picture,"[][]]][][]][][][][")
  return (
    <div className="w-full flex items-center justify-between gap-3">
      <p className="text-2xl text-headingColor m-4">
        {" "}
        Welcome to City
        {user && (
          <span className="block text-base text-gray-500">{`Hello ${user?.data?.name}`}</span>
        )}
      </p>

      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-3 px-4 py-2 bg-lightOverlay backdrop-blur-md rounded-md shadow-md m-4">
          <MdSearch className="text-gray-400 text-2xl" />
          <input
            type="text"
            placeholder="Search Here..."
            className="border-none outline-none bg-transparent w-32 text-base font-semibold text-textColor"
          />
          <BsToggles2 className="text-gray-400 text-2xl" />
        </div>

        <motion.div
          {...buttonClick}
          className="w-10 h-10 rounded-md cursor-pointer bg-lightOverlay backdrop-blur-md shadow-md flex items-center justify-center m-2"
        >
          <BsFillBellFill className="text-gray-400 text-xl " />
        </motion.div>

        <div className="flex items-center justify-center gap-2">
          <div className="w-10 h-10 rounded-md shadow-md cursor-pointer overflow-hidden">
            <motion.img
              className="w-full h-full object-cover"
              src={user?.data?.picture ? user?.data?.picture : Avatar}
              whileHover={{ scale: 1.15 }}
              referrerPolicy="no-referrer"
            />
          </div>
          <motion.div
            onClick={signOut}
            {...buttonClick}
            className="w-10 h-10 rounded-md cursor-pointer bg-lightOverlay backdrop-blur-md shadow-md flex items-center justify-center m-4"
          >
            <MdLogout className="text-gray-400 text-xl" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
