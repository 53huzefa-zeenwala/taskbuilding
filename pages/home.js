import React from "react";
import { useStateContext } from "../context/StateContext";
import { MainContent, Navbar } from "../components/Home";
import { useRouter } from "next/router";
import { AddTaskButtonAndModel, Blob, CategoryMenu } from "../components";

export default function home() {
  const { currentUser, userProfileData, openCategoryMenu, setOpenCategoryMenu } = useStateContext();
  const { replace } = useRouter();
  if (currentUser === undefined) {
    replace("/login");
  } 
  if (userProfileData === undefined) {
    replace("/newprofile")
  }
  return (
    <div className="relative overflow-x-hidden">
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
