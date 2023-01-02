import Link from "next/link";
import { useState } from "react";
import style from "../styles/MajorForm.module.css";
import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useStateContext } from "../context/StateContext";
import { useRouter } from "next/router";
import Loader from "./Loader";

export default function LoginForm() {
    const { currentUser, setAlert } = useStateContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { replace } = useRouter();

    const logIn = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true)
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            setIsLoading(false)
            setAlert({type: "error", message: error.message, duration: 2000, isShow: true})
            console.log(error);
        }
    };
     console.log(currentUser)
    if (currentUser) replace("/home");
    return (
        <main className={style.main}>
            {isLoading && <Loader />}
            <section className={style.heading}>
                <h1>Login.</h1>
                <p>Welcome back! good to see you again.</p>
            </section>
            <form onSubmit={(e) => logIn(e)}>
                <section className={style.input}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ex: johndeo@xxxx.com"
                        required
                    />
                </section>
                <section className={style.input}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="**********"
                        minLength={8}
                        required
                    />
                </section>
                <button type="submit">Login</button>
            </form>

            <div className={style.isAccount}>
                Don't have a account?{" "}
                <span>
                    <Link href={"/signup"}>Create Account</Link>
                </span>
            </div>
            <a>Forgot Password?</a>
        </main>
    );
}
