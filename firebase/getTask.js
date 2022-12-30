import {
  collection,
  getCountFromServer,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase";

export function getTaskForHome(userId, isImportant, progress, taskLimit) {
  const [documents, setDocuments] = useState([]);
  const taskCount = 0;
  useEffect(() => {
    const q =
      isImportant != "both"
        ? query(
            collection(db, `users/${userId}/tasks`),
            orderBy("timestamp", "desc"),
            where("isImportant", "==", isImportant),
            where("progress", "==", progress),
            limit(taskLimit || 5)
          )
        : query(
            collection(db, `users/${userId}/tasks`),
            orderBy("timestamp", "desc"),
            where("progress", "==", progress),
            limit(taskLimit || 5)
          );
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
  }, [userId]);
  return { documents, taskCount };
}

export function getTaskForSpecificCategory(
  userId,
  category,
  isImportant,
  progress,
  taskLimit
) {
  const [loading, setLoading] = useState(true)
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    if (category) {
      const q =
        isImportant != "both"
          ? query(
              collection(db, `users/${userId}/tasks`),
              orderBy("timestamp", "desc"),
              where("isImportant", "==", isImportant),
              where("progress", "==", progress),
              where("category", "==", category),
            )
          : query(
              collection(db, `users/${userId}/tasks`),
              orderBy("timestamp", "desc"),
              where("progress", "==", progress),
              limit(taskLimit || 5)
            );
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const docs = [];
          snapshot.forEach((doc) => {
            docs.push({ id: doc.id, data: doc.data() });
          });
          setDocuments(docs);
          setLoading(false)
        },
        (error) => {
          console.log(error);
        }
      );
      console.log(category, documents, "getTask", loading)
      return () => unsubscribe();
    }
  }, [userId, category]);
  return { documents, loading };
}
