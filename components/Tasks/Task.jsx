import React, { useState } from 'react'
import { whichDateIsTaskAdded } from '../../utils/utilityFunctions'
import Star, { Arrow, CustomCheckbox } from '../StarAndCustomCheckbox'
import style from '../../styles/Tasks.module.css'
import { findUserCategories, getCategories } from '../../firebase/getCategories'
import { updateTaskImportant, updateTaskProgress } from '../../firebase/updateTask'
import { useStateContext } from '../../context/StateContext'

export default function Task({ task: { title, description, category, date, isImportant, progress }, taskId }) {
  const { currentUser } = useStateContext()
  const userId = currentUser?.uid
  const [isCompleted, setIsCompleted] = useState(progress)
  const [taskIsImportant, setTaskIsImportant] = useState(isImportant)
  const taskDate = whichDateIsTaskAdded(date)
  const [isOpen, setIsOpen] = useState(false)
  const taskCategory = findUserCategories([`${category}`], getCategories()?.documents)[0]?.data
  const updateProgress = () => {
    updateTaskProgress(taskId, isCompleted, setIsCompleted, userId)
  }
  const updateImportance = () => {
    updateTaskImportant(taskId, taskIsImportant, setTaskIsImportant, userId)
  }
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
  return (
    <article className={style.task} data-isopen={isOpen}>
      <span className={style.tick}>
        <CustomCheckbox isActive={isCompleted} onClickFunction={updateProgress} size="25px" />
      </span>
      <section className={style.middleDiv}>
        <div className={style.titleAndStar}>
          <h3 onClick={() => setIsOpen(!isOpen)}>{capitalizeFirstLetter(title)}</h3>
          <span>
            <Star isActive={taskIsImportant} onClickFunction={updateImportance} size="inherit" />
          </span>
        </div>
        <div className={style.descriptionAndDetail}>
          <p className={style.description}>{capitalizeFirstLetter(description)}</p>
          <div className={style.categoryAndDate}>
            {taskCategory && <span className={style.category} style={{ color: taskCategory.color }}>
              <span>
                <img src={taskCategory.image} alt="" />
              </span>
              {taskCategory.name}
            </span>}
            <span className={style.date}>
              <img src='/icons/DateIcon.svg' alt="" /> {taskDate}
            </span>
          </div>
        </div>
      </section>
      <span className={style.slideArrow} onClick={() => setIsOpen(!isOpen)}>
        <Arrow isActive={isOpen} size="15px" />
      </span>
    </article>
  )
}
