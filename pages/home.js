import React from "react";
import { useStateContext } from "../context/StateContext";
import { MainContent, Navbar } from "../components/Home";
import { useRouter } from "next/router";
import { AddTaskButtonAndModel, Blob, CategoryMenu } from "../components";

export default function home() {
  const { currentUser, userProfileData, openCategoryMenu, setOpenCategoryMenu } = useStateContext();
  const { replace, reload } = useRouter();
  if (currentUser === undefined) {
    replace("/login");
  } 
  if (userProfileData != undefined && userProfileData?.isProfileDataAdded === false) {
    replace("/newprofile")
  }
  if (userProfileData?.avatarUrl === undefined && userProfileData != undefined) {
      reload()
  }
  console.log(userProfileData, currentUser)
  return (
    <div className="relative overflow-x-hidden h-screen">
      <CategoryMenu {...{openCategoryMenu, setOpenCategoryMenu, userProfileData}} />
      <Navbar avatarUrl={userProfileData?.avatarUrl} setOpenCategoryMenu={setOpenCategoryMenu} />
      <Blob size={85} type="dark" fromX={275} fromY={140} rotate={300} />

      <MainContent
        nickName={userProfileData?.nickName}
        userId={currentUser?.uid}
      />
      <AddTaskButtonAndModel />
    </div>
  );
}
