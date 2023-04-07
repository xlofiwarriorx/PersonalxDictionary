// Config from firebase------------------------------------------------

const firebaseConfig = {
	apiKey: "AIzaSyDYZJdbQM5ZsxygxOvJb5bEcjbgWf44Dac",
	authDomain: "personalxdictionary.firebaseapp.com",
	projectId: "personalxdictionary",
	storageBucket: "personalxdictionary.appspot.com",
	messagingSenderId: "932681927852",
	appId: "1:932681927852:web:825c1c41417ed2e9b12309",
	measurementId: "G-QH23TPSSEG"
};

// import initialisation------------------------------------------------

import { initializeApp } from "firebase/app";

// init firebase app------------------------------------------------------

initializeApp(firebaseConfig)

// import firestore functions------------------------------------------------

import {
	getFirestore, collection, getDocs, onSnapshot, addDoc, deleteDoc, doc, query, where, orderBy, serverTimestamp, getDoc, updateDoc, QueryLimitConstraint, setDoc, getString
} from 'firebase/firestore'

// import auth functions------------------------

import {
	signInWithPopup, GoogleAuthProvider, getAuth, onAuthStateChanged,
	setPersistence, inMemoryPersistence, browserLocalPersistence, signOut,
	createUserWithEmailAndPassword, signInWithEmailAndPassword
} from 'firebase/auth'

// init services------------------------------------------
const db = getFirestore()
const auth = getAuth()
const colRef = collection(db, `USERS`)
const user = auth.currentUser;

// Auth provider------------------------------------------------

const provider = new GoogleAuthProvider()

// auth function------------------------------------------------

function googleAutentification (e) {
	signInWithPopup(auth, provider)
	.then((result) => {
		// This gives you a Google Access Token. You can use it to access the Google API.
		const credential = GoogleAuthProvider.credentialFromResult(result);
		const token = credential.accessToken;
		// The signed-in user info.
		const user = result.user;
	})
//   .then(()=>{
// 	showTexts()
// })
	.catch((error) => {
		// Handle Errors here.
		const errorCode = error.code;
		const errorMessage = error.message;
		// The email of the user's account used.
		const email = error.customData.email;
		// The AuthCredential type that was used.
		const credential = GoogleAuthProvider.credentialFromError(error);
		// ...
		alert(errorMessage)
	});
}

function signingOut () {
	signOut(auth)
	.then(() => {
		console.log('Sign-out successful.')
	 })
	 .catch((error) => {
		// An error happened.
	 });
}

function createNewAccount(email, password) {
	createUserWithEmailAndPassword(auth, email, password)
	.then((userCredential) => {
	  // Signed in 
	  const user = userCredential.user;
	  // ...
	})
	.catch((error) => {
	  const errorCode = error.code;
	  const errorMessage = error.message;
	  alert(errorMessage)
	  // ..
	});
}

function loginWithEmail (email, password) {
	signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
	 alert (errorMessage)
  });
}
// exports-----------------------------------------------------------------------------
export {
	googleAutentification, user, auth, onAuthStateChanged,
	signingOut, createNewAccount, loginWithEmail, doc, db, collection, addDoc, serverTimestamp
}


