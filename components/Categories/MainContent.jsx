import { getTaskForSpecificCategory } from "../../firebase/getTask"
import Tasks from '../Tasks'
import style from '../../styles/Category.module.css'

export default function MainContent({ category, userId }) {
  const isTime = new Date().getHours()
  const { documents: importantTask, loading } = getTaskForSpecificCategory(userId, category, true, false)
  const { documents: notImportantAndIncompleteTask } = getTaskForSpecificCategory(userId, category, false, false)
  const { documents: completeTask } = getTaskForSpecificCategory(userId, category, "both", true)
  console.log(importantTask,category, loading)
  return (
    <main className={style.main}>
      <div>
        {importantTask.length != 0 && <Tasks tasks={importantTask} title="Important" />}
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
