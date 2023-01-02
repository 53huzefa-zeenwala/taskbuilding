import { useRouter } from "next/router";
import React from "react";
import { AddTaskButtonAndModel } from "../../components";
import { Navbar } from "../../components/Categories";
import TypePage from "../../components/TypePage";
import { useStateContext } from "../../context/StateContext";

export default function type() {
  const { currentUser, userProfileData } = useStateContext();
  const { replace, query } = useRouter();
  if (currentUser === undefined) {
    replace("/login");
  } 
  if (userProfileData === undefined) {
    replace("/newprofile")
  }
  return (
    <div>
      <Navbar {...{ category: query.slug }} />
      <TypePage category={query.slug} userId={currentUser?.uid} />
      <AddTaskButtonAndModel />
    </div>
  );
}
