import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

function FirebaseConfig() {
  const firebaseConfig = {};

  const app = initializeApp(firebaseConfig);
  return getDatabase(app);
}

export default FirebaseConfig;
