import { doc, updateDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useStateContext } from '../context/StateContext'
import { getCategories } from '../firebase/getCategories'
import style from "../styles/MajorForm.module.css";
import { db } from '../utils/firebase'
import Loader from './Loader'

export default function EditProfile() {
    const { currentUser, userProfileData, setAlert } = useStateContext()
    const [fullName, setFullName] = useState(userProfileData?.fullName)
    const [nickName, setNickName] = useState(userProfileData?.nickName)
    const [profession, setProfession] = useState(userProfileData.profession)
    const AVATAR = `https://api.multiavatar.com/${nickName}.svg`
    const [isLoading, setIsLoading] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(userProfileData.userCategories)
    const { push } = useRouter()
    const addUserProfile = async e => {
        e.preventDefault()
        if (selectedCategory.length < 3) {
            setAlert({ type: "warning", message: 'Choose at least three category', duration: 2000, isShow: true })
            return
        }
        if (!currentUser && userProfileData.isProfileDataAdded) {
            setAlert({ type: "error", message: 'Something went wrong', duration: 2000, isShow: true })
            return
        }
        if (fullName.length === 0 && nickName.length === 0 && profession.length === 0) {
            setAlert({ type: "warning", message: 'Fullfil all the requirement to continue', duration: 2000, isShow: true })
            return
        }
        setIsLoading(true)
        try {
            await updateDoc(doc(db, `users`, currentUser.uid), {
                isProfileDataAdded: true,
                fullName,
                nickName,
                profession,
                avatarUrl: AVATAR,
                email: currentUser.email,
                userCategories: selectedCategory
            }, { merge: true })
            push('/home')
        } catch (error) {
            setAlert({ type: "error", message: error.message, duration: 2000, isShow: true })
            console.log(error)
        }
        setIsLoading(false)
    }
    const addUserSelectedCategory = (name) => {
        if (isActive(name) === name) {
            setSelectedCategory(
                selectedCategory.filter(category => category != name)
            )
        } else {
            setSelectedCategory((perv) => [
                ...perv,
                name
            ])
        }
    }
    const isActive = (name) => {
        const category = selectedCategory.filter((category) => category === name)
        return category[0]
    }
    const categories = getCategories().documents
    return (
        <main className={style.main}>
            {isLoading && <Loader />}
            <section className={style.profileAvatar}>
                <img src={AVATAR} alt="" />
            </section>
            <section className={style.heading}>
                <h5>Tell us about you.</h5>
            </section>
            <form className={style.profileForm} onSubmit={e => addUserProfile(e)}>
                <section className={style.input}>
                    <label htmlFor="name">Full name</label>
                    <input
                        type="text"
                        name="name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="ex: john deo"
                        required
                    />
                </section>
                <section className={style.input}>
                    <label htmlFor="nickName">Nick name</label>
                    <input
                        type="text"
                        className="capitalize"
                        name="nickName"
                        value={nickName}
                        onChange={(e) => setNickName(e.target.value)}
                        placeholder="ex: benny"
                        required
                    />
                    <p className="text-red-600 text-sm font-medium">* Your avatar will generate according to nickname.</p>
                </section>
                <section className={style.input}>
                    <label htmlFor="profession">Choose your profession</label>
                    <select value={profession} onChange={e => setProfession(e.target.value)} name="profession" id="" required>
                        <option>Select Profession</option>
                        <option selected={profession === "student"} value="student" >Student</option>
                        <option value="employee" selected={profession === "employee"}>Employee</option>
                        <option value="businessman" selected={profession === "businessman"}>Businessman</option>
                        <option value="household" selected={profession === "household"}>Household Manager</option>
                    </select>
                </section>
                <section className={style.categoryList}>
                    <p>Select task categories <span>Cannot be updated after initial set</span></p>
                    {categories.length != 0 ? (
                        <ul>
                            {categories.map(({ data }, i) => (
                                <li key={i} className={isActive(data.name.toLowerCase()) ? style.active : style.notActive} onClick={() => addUserSelectedCategory(data.name.toLowerCase())} style={{cursor: 'not-allowed'}}>
                                    <img src={data.image} alt="" />
                                    {data.name}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <ul>
                            <li className='skeletonLoader w-14 aspect-square'></li>
                            <li className='skeletonLoader w-14 aspect-square'></li>
                            <li className='skeletonLoader w-14 aspect-square'></li>
                            <li className='skeletonLoader w-14 aspect-square'></li>
                        </ul>
                    )}
                </section>
                <button type="submit">Update Profile</button>
            </form>
        </main>
    );
}
