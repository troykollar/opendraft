import { app } from "./firebase";
import {
  getFirestore,
  collection,
  getDoc,
  doc,
  setDoc,
} from "@firebase/firestore";

export const firestore = getFirestore(app);

const usersRef = collection(firestore, "/users");

export const getUserDoc = async (uid: string) => {
  return await (
    await getDoc(doc(firestore, `/users/${uid}`))
  ).data;
};

export const createUserDoc = async (
  uid: string,
  username: string,
  email: string
) => {
  return await setDoc(doc(firestore, `/users/${uid}`), {
    username,
    email,
  });
};
