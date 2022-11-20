import React, { useState } from "react";
import style from "../styles/MajorForm.module.css";
import Link from 'next/link'
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useStateContext } from "../context/StateContext";
import Loader from "./Loader";
import { useRouter } from "next/router";

export default function SignupForm() {
  const { currentUser } = useStateContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const { replace } = useRouter();

  const signUp = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      if (password !== confirmPassword) {
        throw new Error('Password do not match')
      }
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          setIsLoading(false)
          setPassword('')
          setEmail('')
          setConfirmPassword('')
        })
        .catch((error) => {
          setIsLoading(false)
          console.log(error)
        })
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }
  const logInWithGoogle = async () => {
    try {
      setIsLoading(true)
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }
  if (currentUser) replace('/home')

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
    </main>
  );
}
