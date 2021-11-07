import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  EmailAuthCredential,
  User,
  deleteUser,
} from "firebase/auth";
import { app } from "./firebase";
import { createUserDoc, deleteUserDoc } from "./firestore";

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

async function reauthenticateWithPassword(user: User, password: string) {
  try {
    const credential = EmailAuthProvider.credential(user.email!, password);
    await reauthenticateWithCredential(user, credential);
  } catch (err) {
    throw err;
  }
}

export async function changePassword(
  currentPassword: string,
  newPassword: string,
) {
  const user = auth.currentUser;
  if (user && user.email) {
    try {
      await reauthenticateWithPassword(user, currentPassword);
      return updatePassword(user!, newPassword);
    } catch (err) {
      throw err;
    }
  }
}

export async function deleteAccount(password: string) {
  const user = auth.currentUser;
  if (user) {
    try {
      await reauthenticateWithPassword(user, password);
      await deleteUserDoc(user);
      await deleteUser(user);
    } catch (err) {
      throw err;
    }
  } else {
    throw new Error("auth/no-user");
  }
}
