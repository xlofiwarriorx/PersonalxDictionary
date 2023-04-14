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
import { rememberReds } from "./functions";

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

async function showTexts() {
	const file = await doc(db, "USERS", 'users collections')
	const col = await collection(file, `${auth.currentUser.email}`)
	await onSnapshot(col, (snapshot)=>{
		let texts = []
		snapshot.docs.forEach((doc)=>{
		texts.push({
			...doc.data(),id: doc.id
		})
	})
	const savedTextsList = document.querySelector('.saved-texts__list')
	savedTextsList.innerHTML = ''
	texts.forEach((elem)=>{
		let ulValue = savedTextsList.innerHTML 
		let rememberReds = elem.pickedWords
		let dataObject = JSON.stringify(elem)
		savedTextsList.innerHTML =  `${ulValue} <li class="list__item" data-id='${elem.id}' data-object='${dataObject}'> <span class="list__item-title">${elem.title} <button class="list__item-title-delete">delete</button> </span></button></span>
		<div class="list__container">
<div class="list__item-subtitle subtitle">
<div class="subtitle__text-block">
	<div class="subtitle__title">Текст</div>
	<div class="subtitle__text">${elem.text}</div>
</div>
<div class="subtitle__words-block">
	<div class="subtitle__title">Словарь</div>
	<div class="subtitle__words">${elem.pickedWords} </div>
</div>
<button class="subtitle__add-button">Ред.</button>
</div>
</div>
</li>
`
	})
} )}

// exports-----------------------------------------------------------------------------
export {
	googleAutentification, user, auth, onAuthStateChanged, onSnapshot, showTexts, updateDoc, deleteDoc,
	signingOut, createNewAccount, loginWithEmail, doc, db, collection, addDoc, serverTimestamp
}