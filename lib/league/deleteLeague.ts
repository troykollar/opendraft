import { deleteDoc, doc } from "@firebase/firestore";

import { firestore } from "lib/firebase/firestore";

async function deleteLeague(id: string) {
  try {
    await deleteDoc(doc(firestore, `/leagues/${id}`));
  } catch (err) {
    throw err;
  }
}

export default deleteLeague;
