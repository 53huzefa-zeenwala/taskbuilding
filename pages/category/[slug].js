import React from "react";
import { MainContent, Navbar } from "../../components/Categories";
import { useStateContext } from "../../context/StateContext";
import { useRouter } from "next/router";
import { AddTaskButtonAndModel } from "../../components";

export default function category() {
  const { currentUser, userProfileData } = useStateContext();
  const { replace, query } = useRouter();
  if (currentUser === undefined) {
    replace("/login");
  }
  return (
    <div>
      <Navbar {...{category: query.slug}} />
      <MainContent category={query.slug} userId={currentUser?.uid} />
      <AddTaskButtonAndModel {...{currentUser, userProfileData}} />
    </div>
  );
}
