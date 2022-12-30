import React from "react";
import { useStateContext } from "../context/StateContext";
import { MainContent, Navbar } from "../components/Home";
import { useRouter } from "next/router";
import { AddTaskButtonAndModel, CategoryMenu } from "../components";

export default function home() {
  const { currentUser, userProfileData, openCategoryMenu, setOpenCategoryMenu } = useStateContext();
  const { replace } = useRouter();
  if (currentUser === undefined) {
    replace("/login");
  }
  return (
    <div>
      <CategoryMenu {...{openCategoryMenu, setOpenCategoryMenu, userProfileData}} />
      <Navbar avatarUrl={userProfileData?.avatarUrl} setOpenCategoryMenu={setOpenCategoryMenu} />
      <MainContent
        nickName={userProfileData?.nickName}
        userId={currentUser?.uid}
      />
      <AddTaskButtonAndModel {...{currentUser, userProfileData}} />
    </div>
  );
}
