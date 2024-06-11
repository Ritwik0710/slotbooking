import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  setDoc,
  doc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";




import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/firestore";
//import image from "../public/
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8saT3k1inAUamYgYW3GZQ3pviawTuozk",
  authDomain: "slotbooking-ccf7f.firebaseapp.com",
  projectId: "slotbooking-ccf7f",
  storageBucket: "slotbooking-ccf7f.appspot.com",
  messagingSenderId: "926310151355",
  appId: "1:926310151355:web:320c327601708b37b3e59e",
};

// Initialize Firebase
let auth, app, db;
export const initFirebase = () => {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth();
};

export const userDetails = ()=>onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    //console.log(user);
    return user;
    // ...
  } else {
    // User is signed out
    // ...
  }
});
export async function getData(collection) {
  const docRef = doc(db, collection);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}
export const getQuery = async (path, field, operator, value) => {
  const q = query(collection(db, path), where(field, operator, value));
  let arr = [];
 
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    arr.push(doc.data());
    console.log(doc.id, " => ", doc.data());
  });

  return arr;
};

export const realtimeQuery = (path, field1, operator1, value1, field2, operator2, value2,onNext) => {
  const q = query(collection(db, path), where(field1, operator1, value1),where(field2, operator2, value2));
  const unsubscribe = onSnapshot(q, onNext);
  return unsubscribe;
};

export const createUser = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log(userCredential.user.uid);
      return userCredential.user.uid
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      // ..
    });

export const signIn = (email, password, href) =>
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      window.location.href = href;
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      alert(errorMessage);
    });
export const signout = () =>
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("signout");
    })
    .catch((error) => {
      // An error happened.
    });

// Initialize Cloud Firestore and get a reference to the service

export async function addData(data, path, id) {
  try {
    await setDoc(doc(db, path + id), data);
    console.log("Document written with ID: ", id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Add a new document with a generated id.
export async function addAuto (data,collec){
const docRef = await addDoc(collection(db, collec), data);
console.log("Document written with ID: ", docRef.id);}