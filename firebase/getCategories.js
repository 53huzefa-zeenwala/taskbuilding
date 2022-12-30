import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase";

export const getCategories = () => {
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    const q = query(collection(db, `categories`));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = [];
        snapshot.forEach((doc) => {
          docs.push({ id: doc.id, data: doc.data() });
        });
        setDocuments(docs);
      },
      (error) => {
        console.log(error);
      }
    );
      return () => unsubscribe();
  }, []);
  return { documents };
}

export const findUserCategories = (list, docs) => {
  let document = []
  list.map((item) => {
      document.push(
        docs.filter(
          (filterItem) => item === filterItem.data.name.toLowerCase()
        )[0]
      );
  });
   return document
}