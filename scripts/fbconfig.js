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
	googleAutentification, user, auth, onAuthStateChanged, onSnapshot, showTexts, updateDoc,
	signingOut, createNewAccount, loginWithEmail, doc, db, collection, addDoc, serverTimestamp
}

// async function showTexts() {
// 	const file = await doc(db, "USERS", 'users collections')
// 	const col = await collection(file, `${auth.currentUser.email}`)
// 	await onSnapshot(col, (snapshot)=>{
// 		let texts = []
// 		snapshot.docs.forEach((doc)=>{
// 		texts.push({
// 			...doc.data(),id: doc.id
// 		})
// 	})
// 	const savedTextsList = document.querySelector('.saved-texts__list')
// 	savedTextsList.innerHTML = ''
// 	texts.forEach((elem)=>{
// 		let ulValue = savedTextsList.innerHTML 
// 		let rememberReds = elem.pickedWords
// 		savedTextsList.innerHTML =  `${ulValue} <li class="list__item" data-num = ${elem.id}> <span class="list__item-title">${elem.title}</span>
// 		<div class="list__item-subtitle-add subtitle-title">


// <secton class="list-translate-title title ">
// 	<button class="title__close-button close-button">
// 		<img class="title__close-button close-button-line1" src="/img/input/1.svg" alt="line">
// 		<img class="title__close-button close-button-line2" src="/img/input/2.svg" alt="line">
// 	</button>
// 	<div class="title__language-buttons buttons">
// 		<button class="buttons__button buttons__source-button" data-language="en">english</button>
// 		<button class="buttons__reverse-button">
// 			<img class="buttons__reverse-button" src="img/header/2.svg" alt="strict">
// 			<img class="buttons__reverse-button" src="img/header/3.svg" alt="strict">
// 		</button>
// 		<button class="buttons__button buttons__target-button" data-language="ru">russian</button>
// 		<button class="buttons__signout">Sign out</button>
// 	</div>
// 	<div class="languages-list">
// 		<ul class="languages-list__ul ul">
// 			<li class="ul__languages-group">
// 				<div class="ul__title-letter">A</div>
// 				<ul class="ul__group-ul">
// 					<li class="ul__li ul__li-auto" data-language="auto">Auto Detect</li>
// 					<li class="ul__li" data-language="ar">Arabic</li>
// 				</ul>
// 			</li>
// 			<li class="ul__languages-group">
// 				<div class="ul__title-letter">C</div>
// 				<ul class="ul__group-ul">
// 					<li class="ul__li" data-language="zh">Chinese</li>
// 				</ul>
// 			</li>
// 			<li class="ul__languages-group">
// 				<div class="ul__title-letter">E</div>
// 				<ul class="ul__group-ul">
// 					<li class="ul__li" data-language="en">English</li>
// 				</ul>
// 			</li>
// 			<li class="ul__languages-group">
// 				<div class="ul__title-letter">F</div>
// 				<ul class="ul__group-ul">
// 					<li class="ul__li" data-language="fr">French</li>
// 				</ul>
// 			</li>
// 			<li class="ul__languages-group">
// 				<div class="ul__title-letter">G</div>
// 				<ul class="ul__group-ul">
// 					<li class="ul__li" data-language="de">German</li>
// 				</ul>
// 			</li>
// 			<li class="ul__languages-group">
// 				<div class="ul__title-letter">H</div>
// 				<ul class="ul__group-ul">
// 					<li class="ul__li" data-language="hi">Hindi</li>
// 				</ul>
// 			</li>
// 			<li class="ul__languages-group">
// 				<div class="ul__title-letter">I</div>
// 				<ul class="ul__group-ul">
// 					<li class="ul__li" data-language="id">Indonesian</li>
// 					<li class="ul__li" data-language="ga">Irish</li>
// 					<li class="ul__li" data-language="it">Italian</li>
// 				</ul>
// 			</li>
// 			<li class="ul__languages-group">
// 				<div class="ul__title-letter">J</div>
// 				<ul class="ul__group-ul">
// 					<li class="ul__li" data-language="ja">Japanese</li>
// 				</ul>
// 			</li>
// 			<li class="ul__languages-group">
// 				<div class="ul__title-letter">K</div>
// 				<ul class="ul__group-ul">
// 					<li class="ul__li" data-language="ko">Korean</li>
// 				</ul>
// 			</li>
// 			<li class="ul__languages-group">
// 				<div class="ul__title-letter">P</div>
// 				<ul class="ul__group-ul">
// 					<li class="ul__li" data-language="pl">Polish</li>
// 					<li class="ul__li" data-language="pt">Portuguese</li>
// 				</ul>
// 			</li>
// 			<li class="ul__languages-group">
// 				<div class="ul__title-letter">R</div>
// 				<ul class="ul__group-ul">
// 					<li class="ul__li" data-language="ru">Russian</li>
// 				</ul>
// 			</li>
// 			<li class="ul__languages-group">
// 				<div class="ul__title-letter">S</div>
// 				<ul class="ul__group-ul">
// 					<li class="ul__li" data-language="es">Spanish</li>
// 				</ul>
// 			</li>
// 			<li class="ul__languages-group">
// 				<div class="ul__title-letter">T</div>
// 				<ul class="ul__group-ul">
// 					<li class="ul__li" data-language="tr">Turkish</li>
// 				</ul>
// 			</li>
// 			<li class="ul__languages-group">
// 				<div class="ul__title-letter">V</div>
// 				<ul class="ul__group-ul">
// 					<li class="ul__li" data-language="vi">Vietnamese</li>
// 				</ul>
// 			</li>
// 		</ul>
// 	</div>
// </secton>
// <section class="input">
// 	<div class="input__textarea-block">
// 		<textarea class="input__textarea" placeholder="введи текст и выдели слова, которые ты хочешь выучить" name=input-text">${elem.input}</textarea>
// 		<button class="input__close-button close-button">
// 			<img class="close-button close-button-line1" src="/img/input/1.svg" alt="line">
// 			<img class="close-button close-button-line2" src="/img/input/2.svg" alt="line">
// 		</button>
// 	</div>
// 	<div class="input__wrapped-area"></div>
// </section>
// <section class="output">
// 	<div class="output__translated translated">
// 		<div class="translated__area">${elem.text}</div>
// 		<button class="translated__copy-button copy-button">
// 			<img class="copy-button copy-button__img1" src="/img/output/1.svg" alt="copy">
// 			<img class="copy-button copy-button__img2" src="/img/output/2.svg" alt="copy">
// 		</button>
// 	</div>
// </section>
// <section class="add-dictionary">
// 	<button class="add-dictionary__add-button">
// 		Сохранить
// 	</button>
// </section>



// </div>
// <div class="list__item-subtitle subtitle">
// <div class="subtitle__text-block">
// 	<div class="subtitle__title">Текст</div>
// 	<div class="subtitle__text">${elem.text}</div>
// </div>
// <div class="subtitle__words-block">
// 	<div class="subtitle__title">Словарь</div>
// 	<div class="subtitle__words">${elem.pickedWords} </div>
// </div>
// <button class="subtitle__add-button">Ред.</button>
// </div>
// </li>
// `
	// })

// } )}



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
		savedTextsList.innerHTML =  `${ulValue} <li class="list__item" data-id='${elem.id}' data-object='${dataObject}'> <span class="list__item-title">${elem.title}</span>
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

