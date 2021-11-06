import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  reauthenticateWithCredential,
  AuthCredential,
  EmailAuthProvider,
  EmailAuthCredential,
  UserCredential,
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
  password: string,
) {
  if (username && email && password) {
    try {
      const userCredential = createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const userDoc = await createUserDoc(
        (
          await userCredential
        ).user.uid,
        username,
        email,
      );
    } catch (err) {
      throw err;
    }
  }
}

export async function logOut() {
  return await signOut(auth);
}

export async function changePassword(
  currentPassword: string,
  newPassword: string,
) {
  const user = auth.currentUser;
  let credential: EmailAuthCredential;
  if (user && user.email) {
    try {
      credential = EmailAuthProvider.credential(user.email, currentPassword);
      reauthenticateWithCredential(user, credential);
      return updatePassword(user!, newPassword);
    } catch (err) {
      throw err;
    }
  }
}
