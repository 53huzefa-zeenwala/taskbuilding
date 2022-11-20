import React from "react";
import { useStateContext } from "../context/StateContext";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
export default function home() {
  const { currentUser } = useStateContext();
  console.log(currentUser)
  return (
    <div>
      Home
      <button onClick={() => signOut(auth)}>
        Logout
      </button>
    </div>
  );
}
