import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import React, { useState } from 'react'
import { useStateContext } from '../context/StateContext'
import style from '../styles/AddTaskButtonAndModel.module.css'
import { db } from '../utils/firebase'
import Loader from './Loader'
import Star from './StarAndCustomCheckbox'

export default function AddTaskButtonAndModel() {
  const {currentUser, userProfileData, setAlert} = useStateContext()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isModelOpen, setIsModelOpen] = useState(false)
  const [isImportant, setIsImportant] = useState(false)
  const addTask = async (e) => {
    e.preventDefault()
    if (!currentUser && title.length < 8 && description.length < 15 && category.length === 0 && title.length > 40 && description.length > 100) {
      setAlert({type: "warning", message: 'Fullfil all the requirement to continue', duration: 2000, isShow: true}) 
      return 
    }
    const date = new Date().toString()
    try {
      setIsLoading(true)
      await addDoc(collection(db, `users/${currentUser.uid}/tasks`), {
        title,
        description,
        category,
        date,
        progress: false,
        isImportant,
        timestamp: serverTimestamp()
      })
      setTitle('')
      setDescription('')
      setIsModelOpen(false)
      setAlert({type: "info", message: 'Task is added successfully', duration: 2000, isShow: true})
    } catch (error) {
      setAlert({type: "error", message: error.message, duration: 2000, isShow: true})
      console.log(error)
    }
    setIsLoading(false)
  }
  const markTask = () => setIsImportant(!isImportant)
  return (
    <>
      {isLoading && <Loader />}
      <div className={style.buttonDiv}>
        <button onClick={() => setIsModelOpen(true)}>
          <img src="/icons/plus-svgrepo-com.svg" alt="plus icon" />
        </button>
      </div>
      <div data-is-visible={isModelOpen} className={style.model}>
        <form onSubmit={e => addTask(e)}>
          <h3 className={style.modelTitle}>Add New Task</h3>
          <img onClick={() => setIsModelOpen(false)} src="/icons/cross-svgrepo-com.svg" alt="" />
          <section className={style.input}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="ex: john deo"
              required
              minLength={8}
              maxLength={40}
            />
          </section>
          <section className={style.input}>
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="ex: benny"
              required
              minLength={15}
              maxLength={100}
            />
          </section>
          <section className={style.input}>
            <label htmlFor="category">Category</label>
            <select className='capitalize' value={category} onChange={e => setCategory(e.target.value)} name="category" id="" required>
              <option>Select category</option>
              {userProfileData?.userCategories?.map((category, i) => (
                <option key={i} value={category}>{category}</option>
              ))}
            </select>
          </section>
          <section className={style.checkBoxInput}>
            <Star isActive={isImportant} onClickFunction={markTask} size="30px" />
            <label htmlFor="checkbox">Mark to prioritize this task.</label>
          </section>
          <div className={style.modelButtonDiv}>
            <button className={style.buttonOne} type="submit">Add task</button>
            {/* <input onClick={() => setIsModelOpen(false)} type="button" value="Cancel" className={style.buttonTwo} /> */}
          </div>
        </form>

      </div>
    </>
  )
}
