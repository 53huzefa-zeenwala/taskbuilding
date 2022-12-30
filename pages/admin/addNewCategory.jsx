import { addDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../../utils/firebase'
import style from '../../styles/MajorForm.module.css'
import { Loader } from '../../components'

export default function addNewCategory() {
  const [categoryName, setCategoryName] = useState('')
  const [categoryImageUrl, setCategoryImageUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const addCategory = async (e) => {
    e.preventDefault()
    if (categoryName.length < 0 && categoryImageUrl.length < 0) {
      return console.log('fuck')
    }
    try {
      setIsLoading(true)
      await addDoc(
        collection(db, `categories`),
        {
          name: categoryName,
          image: categoryImageUrl
        }
      );
      setCategoryImageUrl('')
      setCategoryName('')
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }
  return (
    <>
      {isLoading && <Loader />}
      <div className={style.main}>
        <form onSubmit={e => addCategory(e)}>
          <section className={style.input}>
            <label htmlFor="name">Category Name</label>
            <input type="text" name="name" value={categoryName} onChange={e => setCategoryName(e.target.value)} id="" />
          </section>
          <section className={style.input}>
            <label htmlFor="imageUrl">Image Url</label>
            <input type="url" name="imageUrl" value={categoryImageUrl} onChange={e => setCategoryImageUrl(e.target.value)} id="" />
          </section>
          <button type='submit'>Add Category</button>
        </form>
      </div>
    </>
  )
}
