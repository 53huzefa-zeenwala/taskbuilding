import {
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";
// import { useEffect, useState } from "react";
import { db } from "../utils/firebase";

export const getTaskCountForHome = (userId, isImportant, progress, setTaskCount) => {
  //   const [taskCount, setTaskCount] = useState();
  let taskCount;
  const countQuery =
    isImportant != "both"
      ? query(
          collection(db, `users/${userId}/tasks`),
          where("isImportant", "==", isImportant),
          where("progress", "==", progress)
        )
      : query(
          collection(db, `users/${userId}/tasks`),
          where("progress", "==", progress)
        );
  const getTask = async () => {
    try {
      const count = await getCountFromServer(countQuery);
      setTaskCount(count.data().count)
    } catch (error) {
      console.log(error);
    }
  };
  console.log(taskCount)
  getTask();
  return taskCount;
};
