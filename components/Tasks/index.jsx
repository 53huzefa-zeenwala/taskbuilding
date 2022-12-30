import React from 'react'
import Task from './Task'
import style from '../../styles/Tasks.module.css'
import Link from 'next/link'

export default function Tasks({ tasks, title }) {
  return (
    <section className={style.main}>
      {title && <h2>• {title} <span><Link href={`/${title.toLowerCase()}`}>see more &#62;&#62;</Link></span></h2>}      
        <div className={style.tasks}>
          {tasks.map(({ data, id }) => (
            <Task {...{ task: data, taskId: id }} key={id} />
          ))}
        </div>
    </section>
  )
}
