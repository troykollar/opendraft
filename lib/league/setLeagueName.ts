import { setDoc, doc } from "firebase/firestore";
import { firestore } from "lib/firebase/firestore";

async function setLeagueName(id: string, name: string) {
  try {
    await setDoc(
      doc(firestore, `/leagues/${id}`),
      {
        name,
      },
      { merge: true },
    );
  } catch (err) {
    throw err;
  }
}

export default setLeagueName;
