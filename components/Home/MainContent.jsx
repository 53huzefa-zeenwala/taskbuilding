import { getTaskForHome } from '../../firebase/getTask'
import style from '../../styles/HomeStyle.module.css'
import Tasks from '../tasks'

export default function MainContent({ nickName, userId }) {
  const isTime = new Date().getHours()
  const { documents: importantTask, loading: importantLoading } = getTaskForHome(userId, true, false)
  const { documents: notImportantAndIncompleteTask, loading: notImportantAndIncompleteLoading } = getTaskForHome(userId, false, false)
  const { documents: completeTask, loading: completeLoading } = getTaskForHome(userId, "both", true)

  if (importantTask.length === 0 && !importantLoading && notImportantAndIncompleteTask.length === 0 && !notImportantAndIncompleteLoading && completeTask.length === 0 && !completeLoading) {
    return (
      <h1 className={style.taskHeading}>Tasks not available. Click brlow button to add first task</h1>
    )
  }
  return (
    <main className={style.main}>
      <h1>Good {isTime <= 12 ? 'Morning' : 'Evening'}, <br /> {nickName || <div className='skeletonLoader w-1/3 h-10'></div>}</h1>
      <h2 className={style.taskHeading}>Recently</h2>
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
