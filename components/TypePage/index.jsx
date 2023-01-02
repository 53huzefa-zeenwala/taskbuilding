import Tasks from '../Tasks'
import style from '../../styles/Category.module.css'
import { getTaskForSpecificType } from '../../firebase/getTask'

export default function TypePage({ category, userId }) {
    const { documents: task, loading } = getTaskForSpecificType(userId, category)
    console.log(task, loading)
    return (
        <main className={style.main}>
            <div>
                {task.length != 0 && !loading && <Tasks tasks={task} />}
            </div>
            {task.length === 0 && loading && (
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