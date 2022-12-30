import { useState } from "react";
import style from "../styles/MajorForm.module.css";
import { useStateContext } from '../context/StateContext'
import { doc, setDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import Loader from "./Loader";
import { useRouter } from "next/router";
import { getCategories } from "../firebase/getCategories";

export default function NewProfile() {
    const { currentUser, userProfileData } = useStateContext()
    const [fullName, setFullName] = useState("")
    const [nickName, setNickName] = useState("")
    const [profession, setProfession] = useState('')
    const AVATAR = `https://api.multiavatar.com/${nickName || 'benny'}.svg`
    const [isLoading, setIsLoading] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState([])
    const { push } = useRouter()

    const addUserProfile = async e => {
        e.preventDefault()
        if (selectedCategory.length < 3) {
            console.log('choose atleast three category')
            return
        }
        if (!currentUser && userProfileData.isProfileDataAdded) {
            return
        }
        if (fullName.length === 0 && nickName.length === 0 && profession.length === 0) {
            return
        }
        setIsLoading(true)
        try {
            await setDoc(doc(db, `users`, currentUser.uid), {
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
                        <option value="student">Student</option>
                        <option value="employee">Employee</option>
                        <option value="businessman">Businessman</option>
                        <option value="household">Household Manager</option>
                    </select>
                </section>
                <section className={style.categoryList}>
                    <p>Select task categories <span>* &#40; minimum: 3 &#41;</span></p>
                    {categories.length != 0 ? (
                        <ul>
                            {categories.map(({ data }, i) => (
                                <li key={i} className={isActive(data.name.toLowerCase()) ? style.active : style.notActive} onClick={() => addUserSelectedCategory(data.name.toLowerCase())}>
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
                <button type="submit">Save Profile</button>
            </form>
        </main>
    );
}
