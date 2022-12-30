import { getTaskForHome } from '../../firebase/getTask'
import style from '../../styles/HomeStyle.module.css'
import Tasks from '../tasks'

export default function MainContent({ nickName, userId }) {
  const isTime = new Date().getHours()
  const { documents: importantTask } = getTaskForHome(userId, true, false)
  const { documents: notImportantAndIncompleteTask } = getTaskForHome(userId, false, false)
  const { documents: completeTask } = getTaskForHome(userId, "both", true)

  return (
    <main className={style.main}>
      <h1>Good {isTime <= 12 ? 'Morning' : 'Evening'}, <br /> {nickName || <div className='skeletonLoader w-1/3 h-10'></div>}</h1>
      <h2 className={style.taskHeading}>Recently</h2>
      <div>
        {importantTask.length != 0 &&<Tasks tasks={importantTask} title="Important" />}
        {notImportantAndIncompleteTask.length != 0 && <Tasks tasks={notImportantAndIncompleteTask} title="Incomplete" />}
        {completeTask.length != 0 && <Tasks tasks={completeTask} title="Completed" />}
      </div>
      {/* {importantTask.length === 0 && notImportantAndIncompleteTask.length === 0 && completeTask.length === 0 && (
        <div className={style.tasks}>
          <h2 className='skeletonLoader h-10 mt-6 mb-2'></h2>
          <div className='skeletonLoader h-16 !rounded-2xl'></div>
          <div className='skeletonLoader h-16 !rounded-2xl'></div>
          <div className='skeletonLoader h-16 !rounded-2xl'></div>
          <div className='skeletonLoader h-16 !rounded-2xl'></div>
        </div>
      )} */}
    </main>
  )
}
