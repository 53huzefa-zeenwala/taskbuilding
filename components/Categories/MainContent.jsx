import { getTaskForSpecificCategory } from "../../firebase/getTask"
import Tasks from '../Tasks'
import style from '../../styles/Category.module.css'

export default function MainContent({ category, userId }) {
  const isTime = new Date().getHours()
  const { documents: importantTask, loading: importantLoading } = getTaskForSpecificCategory(userId, category, true, false)

  const { documents: notImportantAndIncompleteTask, loading: notImportantAndIncompleteLoading } = getTaskForSpecificCategory(userId, category, false, false)

  const { documents: completeTask, loading: completeLoading } = getTaskForSpecificCategory(userId, category, "both", true)
  return (
    <main className={style.main}>
      <div>
        {importantTask.length != 0 && <Tasks tasks={importantTask} title="Important" />}
        {notImportantAndIncompleteTask.length != 0 && <Tasks tasks={notImportantAndIncompleteTask} title="Incomplete" />}
        {completeTask.length != 0 && <Tasks tasks={completeTask} title="Completed" />}
      </div>
      {completeLoading && importantLoading && notImportantAndIncompleteLoading && (
        <div className={style.tasks}>
          <div className='skeletonLoader h-16 !rounded-2xl'></div>
          <div className='skeletonLoader h-16 !rounded-2xl'></div>
          <div className='skeletonLoader h-16 !rounded-2xl'></div>
          <div className='skeletonLoader h-16 !rounded-2xl'></div>
        </div>
      )}
    </main>
  )
}
