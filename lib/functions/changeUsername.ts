import { firestore } from "lib/firebase/firestore";
import { auth } from "lib/firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
export default async function changeUsername(newUsername: string) {
  const uid = auth.currentUser?.uid;
  if (uid) {
    const userRef = doc(firestore, `/users/${uid}`);
    try {
      await updateDoc(userRef, { username: newUsername });
    } catch (err) {
      throw err;
    }
  }
}
