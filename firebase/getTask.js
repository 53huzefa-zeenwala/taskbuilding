import {
  collection,
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
  const [loading, setLoading] = useState(true);
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
          setLoading(false);
          setDocuments(docs);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => unsubscribe();
  }, [userId]);
  return { documents, loading };
}

export function getTaskForSpecificCategory(
  userId,
  category,
  isImportant,
  progress
) {
  const [loading, setLoading] = useState(true);
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
              where("category", "==", category)
            )
          : query(
              collection(db, `users/${userId}/tasks`),
              orderBy("timestamp", "desc"),
              where("progress", "==", progress)
            );
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const docs = [];
          snapshot.forEach((doc) => {
            docs.push({ id: doc.id, data: doc.data() });
          });
          setDocuments(docs);
          setLoading(false);
        },
        (error) => {
          console.log(error);
        }
      );
      return () => unsubscribe();
    }
  }, [userId, category]);
  return { documents, loading };
}

export function getTaskForSpecificType(userId, type) {
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    if (type) {
      let q;
      if (type === "important") {
        q = query(
          collection(db, `users/${userId}/tasks`),
          orderBy("timestamp", "desc"),
          where("isImportant", "==", true)
        );
      } else if (type === "incomplete") {
        q = query(
          collection(db, `users/${userId}/tasks`),
          orderBy("timestamp", "desc"),
          where("progress", "==", false)
        );
      } else {
        q = query(
          collection(db, `users/${userId}/tasks`),
          orderBy("timestamp", "desc"),
          where("progress", "==", true)
        );
      }
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const docs = [];
          snapshot.forEach((doc) => {
            docs.push({ id: doc.id, data: doc.data() });
          });
          setDocuments(docs);
          setLoading(false);
        },
        (error) => {
          console.log(error);
        }
      );
      return () => unsubscribe();
    }
  }, [userId, type]);
  return { documents, loading };
}
