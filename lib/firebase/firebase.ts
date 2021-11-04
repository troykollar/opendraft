import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCw2T2D7t02G_Dg9bjA8gq8GiG3x1ztMsY",
  authDomain: "opendraft-98b73.firebaseapp.com",
  projectId: "opendraft-98b73",
  storageBucket: "opendraft-98b73.appspot.com",
  messagingSenderId: "703783208455",
  appId: "1:703783208455:web:f6c40755d7fcb740490ca2",
  measurementId: "G-9QNM097QCN",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

/* import { getAnalytics } from "firebase/analytics";
const analytics = getAnalytics(app); */
