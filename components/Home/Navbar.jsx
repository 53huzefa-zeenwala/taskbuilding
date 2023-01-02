import { useState } from 'react'
import style from '../../styles/HomeStyle.module.css'
import { signOut } from 'firebase/auth'
import MenuIcon from './MenuIcon'
import { auth } from '../../utils/firebase'
import { useRouter } from 'next/router'
import Link from 'next/link'


export default function Navbar({ avatarUrl, setOpenCategoryMenu }) {
    const [isDropDown, setIsDropDown] = useState(false)
    const { replace } = useRouter()
    const signOutFunction = () => {
        signOut(auth)
        setIsDropDown(false)
        replace("/login");
    }
    return (
        <nav className={style.navbar}>
            <button className={style.menu} onClick={() => setOpenCategoryMenu(true)}>
                <MenuIcon />
            </button>
            <div className={style.logoDiv}><img src="/logoHalf.png" alt="" className="object-contain w-24" /></div>
            <div className={style.userProfile} onClick={() => setIsDropDown(!isDropDown)}>
                <img src={avatarUrl || '/mashupmath.jpeg'} alt="" />
            </div>
            <div data-isdrop={isDropDown} className={style.dropDownMenu}>
                <Link href={'/editprofile'} className={style.dropDownItems}>
                    Edit Profile
                </Link>
                <a href='https://huzefazeenwala.vercel.app/' target="_blank" rel="noreferrer" style={{ transitionDelay: '0.1s' }} className={style.dropDownItems}>
                    Developer
                </a>
                <a className={style.dropDownItems} style={{ transitionDelay: "0.2s", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} onClick={() => signOutFunction()}>Logout
                    <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path fill="none" stroke="inherit" strokeWidth="2" d="M13,9 L13,2 L1,2 L1,22 L13,22 L13,15 M22,12 L5,12 M17,7 L22,12 L17,17" />
                    </svg>
                </a>
            </div>
        </nav >
    )
}
