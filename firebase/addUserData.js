import { addDoc, collection } from "firebase/firestore";
import { db } from "../utils/firebase";

export default async function addUserData(userEmail, userId) {
  try {
    const docRef = await addDoc(
      collection(db, `users/${userId}/profile`),
      {
        email: userEmail,
      }
    );
    console.log(docRef);
    return docRef;
  } catch (error) {
    console.log(error);
  }
}
