import { doc } from "@firebase/firestore";
import leagueConverter from "lib/converters/leagueConverter";
import { firestore } from "lib/firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";

function useLeague(id: string) {
  return useDocumentData(
    doc(firestore, `/leagues/${id}`).withConverter(leagueConverter),
  );
}

export default useLeague;
