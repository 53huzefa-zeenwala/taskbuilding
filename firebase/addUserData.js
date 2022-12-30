import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

export default async function addUserData(userEmail, userId) {
  try {
    const docRef = await setDoc(
      doc(db, `users`, userId),
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
