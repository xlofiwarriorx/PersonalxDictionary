
import {
	savedButton,languagePickButtonsWrapper, signOutButton,inputField,
	outputField,addToDictionaryButton,contactsFooter,  
	authPopupCloseButton, sourceLanguageButton, targetLanguageButton,
	languagesList,autoDetectLanguageOption, reverseLanguagesButon,
} from './variables'

import {
auth, googleAutentification, createNewAccount, loginWithEmail
} from './fbconfig'

import {
	addToCol, clearAny
	} from './functions'
	

import {
	wrappedInputField
	} from './input'

	const allPopups = document.querySelectorAll('.popup')
	const popupsWrapper = document.querySelector('.popups')
	const authPopup = document.querySelector('.auth-popup')
	const authPopupLoginButton = document.querySelector('.auth-buttons__login')
	const authPopupSignupButton = document.querySelector('.auth-buttons__signup')
	const registrationPopup = document.querySelector('.registration-popup')
	const loginPopup = document.querySelector('.login-popup')
	const regPopupSigninButton = document.querySelector('.registration-popup__signin')
	const logPopupLoginButton = document.querySelector('.login-popup__login')
	const saveTextPopup = document.querySelector('.save-text-popup')
	const saveTextInput = document.querySelector('.save-text-popup__input')
	const SaveTextButton = document.querySelector('.save-text-popup__save-button')
	// const saveTextPopupCloseButton = saveTextPopup.querySelector('.close-button')

// add too dictionary or open auth
addToDictionaryButton.addEventListener('click', (e)=> {
	if(!auth.currentUser){
		openPopup(authPopup)
	}
	else {
		openPopup(saveTextPopup)
	}
})

function openPopup(popup) {
if(document.querySelector('.popups')) {
	closePopup()
	document.querySelector('.popups').classList.add('open')
	popup.classList.add('open')
}
}

function closePopup () {
	if(document.querySelector('.popups')) {
		document.querySelector('.popups').classList.add('open')
		allPopups.forEach((elem)=>{
				elem.classList.remove('open')
		})
		popupsWrapper.classList.remove('open')
	}
}

// google auth
document.addEventListener('click', (e)=>{
	const target = e.target
	if(target.classList.contains('form__google-in')){
		googleAutentification()
		closePopup()
	}
})

// close any popup
document.addEventListener('click', (e)=>{
	
	if(e.target == popupsWrapper || e.target.classList.contains('close-button') && e.target.closest('body').dataset.type == 'title-page'){
		closePopup()
	}
	
})

// open signin form
document.addEventListener('click', (e)=>{
	const target = e.target
	if (target == authPopupSignupButton) {
		closePopup()
		openPopup(registrationPopup)
	}
	else if (target == authPopupLoginButton) {
		closePopup()
		openPopup(loginPopup)
	}
})

// create account or sign in(email)
document.addEventListener('click', (e) => {
	const target = e.target
	if(target.classList.contains('form__submit')) {
		const email = target.closest('.popup').querySelector('.form__login')
		const password = target.closest('.popup').querySelector('.form__password')
		if(email != '' && password != '') {
			if(target == regPopupSigninButton) {
				createNewAccount(email.value, password.value)
				closePopup()
			}
			else if(target == logPopupLoginButton) {
				loginWithEmail(email.value, password.value)
				closePopup()
			}
		}
		email.value = ''
		password.value = ''
	}
}) 

// save text
document.addEventListener('click', (e)=>{
	if(e.target.classList.contains('save-text-popup__save-button')) {
		addToCol()
		closePopup()
		clearAny(e)
	}
	
})

// function closePopup (e) {
// 	if(e.target.classList.contains('popups') || e.target.classList.contains('close-button') || e.target.classList.contains('form__submit') || e.target.classList.contains('form__google-in'))  {
// 		let popups = e.target.closest('.popups').querySelectorAll('.popup')
// 		popups.forEach((elem)=>{
// 			if(elem.classList.contains('open')) {
// 				elem.classList.remove('open')
// 			}
// 		})
// 		popupsWrapper.classList.remove('open')
// 	}
	
// }

export { openPopup, closePopup, authPopup}