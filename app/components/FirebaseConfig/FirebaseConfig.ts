import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

function FirebaseConfig() {
  const firebaseConfig = {
    apiKey: "AIzaSyCvbqwmKg3QZCywUZp9aRQ6Iiv-DQtdwrA",
    authDomain: "serverless-demo-22c43.firebaseapp.com",
    databaseURL: "https://serverless-demo-22c43-default-rtdb.firebaseio.com",
    projectId: "serverless-demo-22c43",
    storageBucket: "serverless-demo-22c43.appspot.com",
    messagingSenderId: "276629057336",
    appId: "1:276629057336:web:0b892240be97b3b47c9bcd",
  };

  const app = initializeApp(firebaseConfig);
  return getDatabase(app);
}

export default FirebaseConfig;
