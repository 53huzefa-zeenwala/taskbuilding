import { useRouter } from "next/router";
import React from "react";
import { Blob, NewProfile } from "../components";
import { useStateContext } from "../context/StateContext";

export default function newprofile() {
  const { currentUser, userProfileData } = useStateContext();
  const { replace } = useRouter();
  if (currentUser === undefined) {
    replace("/login");
  } 
  // if (userProfileData ) {
  //   replace("/home")
  // }
  return (
    <div className='relative overflow-x-hidden'>
      <Blob size={85} type="dark" fromX={30} fromY={50} rotate={80} />
      <Blob size={125} type="light" fromX={240} fromY={270} rotate={80} />
      <NewProfile />
    </div>
  );
}
