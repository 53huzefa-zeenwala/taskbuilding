import { useState } from "react";
import style from "../styles/MajorForm.module.css";
import { useStateContext } from '../context/StateContext'

export default function NewProfile() {
    const { currentUser } = useStateContext()
    const [fullName, setFullName] = useState("")
    const [nickName, setNickName] = useState("")
    const [profession, setProfession] = useState('')
    const [gender, setGender] = useState("other")
    const AVATAR = `https://api.multiavatar.com/${nickName || 'benny'}.svg`
    return (
        <main className={style.main}>
            <section className={style.profileAvatar}>
                <img src={AVATAR} alt="" />
            </section>
            <section className={style.heading}>
                <h5>Tell us about you.</h5>
            </section>
            <form className={style.profileForm}>
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
                <div className={style.checkBoxDiv}>
                    <h5>Your gender: </h5>
                    <div>
                        <input type="radio" name="Gender" value="male" checked={gender === "male"} onChange={e => setGender(e.target.value)}
                        />
                        <label htmlFor="inlineRadio10">Male</label>
                    </div>
                    <div>
                        <input type="radio" name="Gender" value="female" checked={gender === "female"} onChange={e => setGender(e.target.value)}
                        />
                        <label htmlFor="inlineRadio20">Female</label>
                    </div>
                    <div>
                        <input checked={gender === "other"} onChange={e => setGender(e.target.value)} type="radio" name="Gender" value="other"
                        />
                        <label htmlFor="inlineRadio20">other</label>
                    </div>
                </div>
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

                <button type="submit">Save Profile</button>
            </form>
        </main>
    );
}
