import Link from 'next/link'
import style from '../styles/LoginAndupForm.module.css'

export default function LoginForm() {
    return (
        <main className={style.main}>
            <section className={style.heading}>
                <h1>Login.</h1>
                <p>Welcome back! good to see you again.</p>
            </section>
            <form>
                <section className={style.input}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' placeholder='johndeo@xxxx.com' required />
                </section>    
                <section className={style.input}>
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' placeholder='**********' minLength={8} required />
                </section>
                <button type='submit'>Login</button>
            </form>
            <div className={style.orOption}>
                <span></span> or <span></span>
            </div>
            <button className={style.googleButton}><img src="/icons/google-svgrepo-com.svg" alt="" /> Continue with google</button>
            <div className={style.isAccount}>Don't have a account? <span><Link href={'/signup'}>Create Account</Link></span></div>
            <a>Forgot Password?</a>
        </main>
    )
}
