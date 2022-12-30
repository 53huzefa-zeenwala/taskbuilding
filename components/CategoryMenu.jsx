import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { findUserCategories, getCategories } from '../firebase/getCategories'
import style from '../styles/CategoryMenu.module.css'

export default function CategoryMenu({ openCategoryMenu, setOpenCategoryMenu, userProfileData }) {
    const allCategories = getCategories().documents
    const [categories, setCategories] = useState([])
    useEffect(() => {
        if (allCategories.length != 0 && userProfileData?.userCategories) {
            setCategories(findUserCategories(userProfileData.userCategories, allCategories))
        }
    }, [allCategories, userProfileData])
    return (
        <>
            <div className={style.lowerCategoryDiv} onClick={() => setOpenCategoryMenu(false)} data-isopen={openCategoryMenu} ></div>
            <div className={style.main} data-isopen={openCategoryMenu}>
                <h4 className={style.title}>Collections</h4>
                <button className={style.closeButton} onClick={() => setOpenCategoryMenu(false)}>
                    <img src="/icons/close-svgrepo-com.svg" alt="" />
                </button>
                {categories.length != 0 ? (
                    <ul>
                        {categories.map(({ id, data }) => (
                            <Link href={`/category/${data.name.toLowerCase()}`} passHref key={id} onClick={() => setOpenCategoryMenu(false)}>
                                <li style={{ color: data.color }} className={style.category}><span><img src={data.image} alt="" /></span> {data.name}</li>
                            </Link>
                        ))}
                    </ul>
                ) : (
                    <ul>
                        <li className='skeletonLoader h-16'></li>
                        <li className='skeletonLoader h-16'></li>
                        <li className='skeletonLoader h-16'></li>
                    </ul>
                )}
                {/* <button className={style.logoutButton} onClick={() => {signOutFunction()}}>Logout
                    <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path fill="none" stroke="inherit" strokeWidth="2" d="M13,9 L13,2 L1,2 L1,22 L13,22 L13,15 M22,12 L5,12 M17,7 L22,12 L17,17" />
                    </svg>
                </button> */}
            </div>
        </>
    )
}
