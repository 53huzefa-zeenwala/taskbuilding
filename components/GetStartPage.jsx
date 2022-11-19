import Link from 'next/link'
import style from '../styles/GetStart.module.css'

export default function GetStartPage() {
  return (
    <>
      <nav className={style.navbar}>
        <img src="/logoHalf.png" alt="" className="object-contain w-32" />
        <div>
          <Link href={'/login'}>Login</Link>
        </div>
      </nav>
      <main className={style.main}>
        <h1>
          Tsks, just tasks.
        </h1>
        <div className={style.buttons}>
          <button className={style.one}><Link href={'/signup'}>Get Started</Link></button>
          <button className={style.two}><Link href={'/learnmore'}>Learn more</Link></button>
        </div>
      </main>
    </>
  )
}

