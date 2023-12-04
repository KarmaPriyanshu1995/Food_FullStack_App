import React, { useState } from "react";
import { statuses } from "../utils/styles";
import { Spinner } from "../components";
import { FaCloudUploadAlt } from "../assets/icons";

import { storage } from "../config/firebase.config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { alertDanger, alertNull, alertSuccess } from "../context/actions/alertActions";
import { progress } from "framer-motion";
const DBNewItem = () => {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState(null);
  const [price, setPrice] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [process, setProcess] = useState(null);
  const [imageDownloadingURL, setImageDownLoadingURL] = useState(null);

  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  // const uploadImage = (e) => {
  //   setisLoading(true);
  //   const imageFiles = e.target.files;
  //   if (imageFiles && imageFiles.length > 0) {
  //     const firstImageFile = imageFiles[0];

  //     const storageRef = ref(
  //       storage,
  //       `Images/${Date.now()}_${firstImageFile.name}`
  //     );
  //     const uploadTask = uploadBytesResumable(storageRef, imageFiles);
  //     uploadTask.on("state_changed"),
  //       (snapshot) => {
  //         setProcess((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
  //       },
  //       (error) => {
  //         dispatch(alertDanger(`Error:${error}`));
  //         setTimeout(()=>{
  //           dispatch(alertNull())
  //         },3000)
  //       },
  //       () => {
  //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
  //           setImageDownLoadingURL(downloadURL)
  //           setisLoading(false)
  //           setProcess(null)
  //           dispatch(alertSuccess("Image Uploaded to the Cloud"));
  //           setTimeout(()=>{
  //             dispatch(alertNull())
  //           },3000)
  //         })
  //       };
  //   }
  // };
  
  const uploadImage = (e) => {
    setisLoading(true);
    const imageFiles = e.target.files;
    if (imageFiles && imageFiles.length > 0) {
      const firstImageFile = imageFiles[0];
  
      const storageRef = ref(
        storage,
        `Images/${Date.now()}_${firstImageFile.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, firstImageFile);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const process = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProcess(process);
        },
        (error) => {
          dispatch(alertDanger(`Error:${error}`));
          setTimeout(() => {
            dispatch(alertNull());
          }, 3000);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageDownLoadingURL(downloadURL);
            setisLoading(false);
            setProcess(null);
            dispatch(alertSuccess("Image Uploaded to the Cloud"));
            setTimeout(() => {
              dispatch(alertNull());
            }, 3000);
          });
        }
      );
    }
  };
  
  return (
    <div className="flex items-center justify-self-center gap-4 pt-6 w-full ml-20">
      <div className="border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4">
        <InputValueField
          type="text"
          placeHolder={"Item Name Here"}
          stateFunction={setItemName}
          stateValue={itemName}
        />

        <div className="w-full flex items-center justify-around gap-3 flex-wrap">
          {statuses &&
            statuses?.map((data) => {
              return (
                <p
                  key={data.id}
                  onClick={() => setCategory(data.category)}
                  className={`px-4 py-3 rounded-md text-xl text-textColor font-semibold cursor-pointer hover:shadow-md boredr border-gray-200 backdrop-blur-md ${
                    data.category === category
                      ? "bg-red-400 text-primary"
                      : "bg-transparent"
                  }`}
                >
                  {data.title}
                </p>
              );
            })}
        </div>
        <InputValueField
          type="number"
          placeHolder={"Item price Here"}
          stateFunction={setPrice}
          stateValue={price}
        />
        <div className="w-full bg-card backdrop-blur-md h-370 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
          {isLoading ? (
            <div className="w-full h-full flex flex-col items-center justify-evenly px-24">
              <Spinner />
              {progress}
            </div>
          ) : (
            <>
              {!imageDownloadingURL ? (
                <>
                  <label>
                    <div className="flex flex-col items-center justify-center h-full w-full cursor-pointer">
                      <div className="flex flex-col justify-center items-center cursor-pointer">
                        <p className="font-bold text-4xl">
                          <FaCloudUploadAlt className="-rotate-0" />
                        </p>
                        <p className="text-lg text-textColor">
                          Click to upload an image
                        </p>
                      </div>
                    </div>
                    <input
                      type="file"
                      name="upload-image"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const InputValueField = ({
  type,
  placeHolder,
  stateValue,
  stateFunction,
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeHolder}
        className="w-full px-4 py-3 bg-lightOverlay shadow-md outline-none rounded-md border border-gray-200 focus:border-red-400"
        value={stateValue}
        onChange={(e) => stateFunction(e.target.value)}
      />
    </>
  );
};

export default DBNewItem;
