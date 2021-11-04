import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "./firebase";
import { createUserDoc } from "./firestore";

export const auth = getAuth(app);

export async function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signUp(
  username: string,
  email: string,
  password: string
) {
  if (username && email && password) {
    try {
      const userCredential = createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userDoc = await createUserDoc(
        (
          await userCredential
        ).user.uid,
        username,
        email
      );
    } catch (err) {
      throw err;
    }
  }
}
