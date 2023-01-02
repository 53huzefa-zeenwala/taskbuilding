import { doc, updateDoc } from "firebase/firestore"
import { db } from "../utils/firebase"


export const updateTaskProgress = async ( taskId, isCompleted, setIsCompleted, userId) => {    
    try {
        await updateDoc(doc(db, `users/${userId}/tasks`, taskId), {
            progress: !isCompleted
        })
        setIsCompleted(!isCompleted)
    } catch (error) {
        console.log(error, 'message')
    }
}

export const updateTaskImportant = async ( taskId, isImportant, setIsImportant, userId) => {    
    try {
        await updateDoc(doc(db, `users/${userId}/tasks`, taskId), {
            isImportant: !isImportant
        })
        setIsImportant(!isImportant)
    } catch (error) {
        console.log(error, 'message')
    }
}