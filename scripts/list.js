import {
	googleAutentification, user, auth, doc, db, collection, addDoc, serverTimestamp, onAuthStateChanged, signingOut, createNewAccount, loginWithEmail
} from './fbconfig'

import {
	showSignoutButton, goToSavedTextsPage, hideSignoutButton,
	deployLanguagesList, reverseLanguages,pickLanguage,chooseLanguage, removeDeployTagsFromTitleLanguageButtons,
	wrapWords,makeArrayFromInputValue, singleOut, makePickedList, keepSingled, rememberReds
} from './functions'

import {openAuthPopup, openRegistrationPopup, closePopup}
from './popups'

import {
	savedButton,languagePickButtonsWrapper, signOutButton,inputField,
	outputField,addToDictionaryButton,contactsFooter,popupsWrapper, authPopup, saveTextPopup, 
	authPopupCloseButton, saveTextPopupCloseButton, sourceLanguageButton, targetLanguageButton,
	languagesList,autoDetectLanguageOption, reverseLanguagesButon, wrappedInputField, authPopupLoginButton,
	authPopupSignupButton, registrationPopup, regPopupSigninButton, logPopupLoginButton, loginPopup
} from './variables'

const addToCol = ()=>{
	const file = doc(db, "USERS", 'users collections')
	const col = collection(file, `${auth.currentUser.email}`)
	addDoc(col, {
		text: wrappedInputField.innerHTML,
		createdAt: serverTimestamp(),
		pickedWords: rememberReds
	})
}
export {
	addToCol
}

async function showTexts() {
	const file = doc(db, "USERS", 'users collections')
	const col = collection(file, `${auth.currentUser.email}`)
	
}