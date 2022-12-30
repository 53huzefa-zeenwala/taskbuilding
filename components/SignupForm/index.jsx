import React, { useState } from "react";
import style from "../../styles/MajorForm.module.css";
import Link from 'next/link'
import { auth, db } from "../../utils/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendEmailVerification } from 'firebase/auth'
import { useStateContext } from "../../context/StateContext";
import Loader from "../Loader";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import addUserData from "../../firebase/addUserData";
import VerificationModel from "./VerificationModel";

export default function SignupForm() {
  const { currentUser } = useStateContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const { replace } = useRouter();

  const signUp = async (e) => {
    e.preventDefault()
    if (currentUser != undefined) {
      return replace('/home')
    }
    try {
      setIsLoading(true)
      if (password !== confirmPassword) {
        throw new Error('Password do not match')
      }
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      await addUserData(email, user.uid)
      replace('/newprofile')
    } catch (error) {
      console.log(error)
    }
  }

  const logInWithGoogle = async () => {
    if (currentUser != undefined) {
      return replace('/home')
    }
    try {
      setIsLoading(true)
      const provider = new GoogleAuthProvider()
      const { user } = await signInWithPopup(auth, provider)
      //is user exist
      const querySnapshot = await getDoc(doc(db, `users`, user.uid));
      // if user is not exist do this
      console.log(querySnapshot.exists())
      if (!querySnapshot.exists()) {
        await addUserData(user.email, user.uid)
        replace('/newprofile')
        return
      }
      replace('/home')
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  return (
    <main className={style.main}>
      {isLoading && <Loader />}
      <section className={style.heading}>
        <h1>Sign up.</h1>
      </section>
      <form onSubmit={e => signUp(e)}>
        <section className={style.input}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="ex: johndeo@xxxx.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </section>
        <section className={style.input}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="**********"
            minLength={8}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </section>
        <section className={style.input}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="**********"
            minLength={8}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </section>
        <button type="submit">Create Account</button>
      </form>
      <div className={style.orOption}>
        <span></span> or <span></span>
      </div>
      <button className={style.googleButton} onClick={logInWithGoogle}>
        <img src="/icons/google-svgrepo-com.svg" alt="" /> Continue with google
      </button>
      <div className={style.isAccount}>
        Already have a account?
        <span>
          <Link href={"/login"}>Log in</Link>
        </span>
      </div>
      {/* <div data-ismodelopen={isModelOpen} className={style.verificationDiv}>
        <VerificationModel />
      </div> */}
    </main>
  );
}
