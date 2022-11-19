import React from "react";
import style from "../styles/LoginAndupForm.module.css";
import Link from 'next/link'
export default function SignupForm() {
  return (
    <main className={style.main}>
      <section className={style.heading}>
        <h1>Sign up.</h1>
      </section>
      <form>
        <section className={style.input}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="johndeo@xxxx.com"
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
            required
          />
        </section>
        <button type="submit">Create Account</button>
      </form>
      <div className={style.orOption}>
        <span></span> or <span></span>
      </div>
      <button className={style.googleButton}>
        <img src="/icons/google-svgrepo-com.svg" alt="" /> Sign up with google
      </button>
      <div className={style.isAccount}>
        Already have a account?
        <span>
          <Link href={"/signup"}>Log in</Link>
        </span>
      </div>
    </main>
  );
}
