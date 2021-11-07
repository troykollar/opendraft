import { app } from "./firebase";
import {
  getFirestore,
  collection,
  getDoc,
  doc,
  setDoc,
  deleteDoc,
} from "@firebase/firestore";
import { User } from "@firebase/auth";

export const firestore = getFirestore(app);

const usersRef = collection(firestore, "/users");

export const getUserDoc = async (uid: string) => {
  return await (
    await getDoc(doc(firestore, `/users/${uid}`))
  ).data;
};

export const createUserDoc = async (uid: string, username: string) => {
  return await setDoc(doc(firestore, `/users/${uid}`), {
    username,
  });
};

export async function deleteUserDoc(user: User) {
  try {
    await deleteDoc(doc(firestore, `/users/${user.uid}`));
  } catch (err) {
    throw err;
  }
}
