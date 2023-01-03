import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { findUserCategories, getCategories } from '../firebase/getCategories'
import style from '../styles/CategoryMenu.module.css'
import Blob from './Blob'

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
                    <img src="/icons/cross-svgrepo-com.svg" alt="" />
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
                <Blob size={125} type="light" fromX={-5} fromY={650} rotate={300} />
            </div>
        </>
    )
}
