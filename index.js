// imports
	import {
		googleAutentification, user, auth, onAuthStateChanged, signingOut, createNewAccount, loginWithEmail
	} from './scripts/fbconfig'

	import {
		showSignoutButton, goToSavedTextsPage, hideSignoutButton, deployLanguagesList, reverseLanguages,pickLanguage,chooseLanguage, removeDeployTagsFromTitleLanguageButtons,
		wrapWords, makeArrayFromInputValue, singleOut, makePickedList, keepSingled, checkIfWordsFromColoredArrayYetExist, rememberReds, clearAny
	} from './scripts/functions'

	import {openAuthPopup, openPopup, closePopup} from './scripts/popups'

	import {
		addToCol }
	from './scripts/list'
	

	import {
		savedButton,languagePickButtonsWrapper, signOutButton,inputField,
		outputField,addToDictionaryButton,contactsFooter,popupsWrapper, authPopup, saveTextPopup, 
		authPopupCloseButton, saveTextPopupCloseButton, sourceLanguageButton, targetLanguageButton,
		languagesList,autoDetectLanguageOption, reverseLanguagesButon, wrappedInputField, authPopupLoginButton,
		authPopupSignupButton, registrationPopup, regPopupSigninButton, logPopupLoginButton, loginPopup
	} from './scripts/variables'

//constantly checking if user logged in 
onAuthStateChanged(auth, user => {
	if(user) {
		showSignoutButton ()
	}
	else {
		hideSignoutButton ()
	}
})

// google auth
popupsWrapper.addEventListener('click', (e)=>{
	const target = e.target
	if(target.classList.contains('form__google-in')){
		googleAutentification()
		closePopup()
	}
})

// saved-button handler
savedButton.addEventListener('click', ()=>{
	if(auth.currentUser) {
		goToSavedTextsPage()
	}
	else {
		openAuthPopup()
	}
})

// close any popup
popupsWrapper.addEventListener('click', (e)=>{
	closePopup(e)
})

// sign out
signOutButton.addEventListener('click', ()=>{
	signingOut ()
})

// open language- list
languagePickButtonsWrapper.addEventListener('click', (e)=> {
	const target = e.target
		deployLanguagesList(target)
})

// pick language
languagesList.addEventListener('click', (e)=>{
	const target = e.target
	pickLanguage(target)
}
)

// reverse languages(source and target)
reverseLanguagesButon.addEventListener('click', ()=>{
	reverseLanguages ()
})

// authentification
addToDictionaryButton.addEventListener('click', (e)=> {
	if(!auth.currentUser){
		openPopup(authPopup)
	}
	else {
		console.log('check')
		addToCol()

	}
})

// open signin form
authPopup.addEventListener('click', (e)=>{
	const target = e.target
	if (target == authPopupSignupButton) {
		openPopup(registrationPopup)
	}
	else if (target == authPopupLoginButton)
		openPopup(loginPopup)
})

// create account or sign in(email)
popupsWrapper.addEventListener('click', (e) => {
	const target = e.target
	if(target.classList.contains('form__submit')) {
		const email = target.closest('.popup').querySelector('.form__login')
		const password = target.closest('.popup').querySelector('.form__password')
		if(email != '' && password != '') {
			if(target == regPopupSigninButton) {
				createNewAccount(email.value, password.value)
			}
			else if(target == logPopupLoginButton) {
				loginWithEmail(email.value, password.value)
			}
		}
		email.value = ''
		password.value = ''
	}
}) 

// pick language from deployed list
languagesList.addEventListener('click', (e)=>{
	const target = e.target
	if(target.classList.contains('ul__li')) {
		chooseLanguage(target)
		languagesList.classList.remove('open')
		removeDeployTagsFromTitleLanguageButtons()
	}
})

// make wrapped words block from input value
inputField.addEventListener('input', ()=>{
	if(inputField.value == '') {
		clearAny()
		wrappedInputField.classList.remove('open')
		outputField.innerHTML = `Список слов, <br/> которые ты хочешь <br/> выучить,  с <br/> переводом`	}
	else {
		wrappedInputField.classList.add('open')
		makeArrayFromInputValue()
		keepSingled()
		checkIfWordsFromColoredArrayYetExist()
	}
})

// single out(dye) words
wrappedInputField.addEventListener('click', (e)=>{
	singleOut(e)
	makePickedList(wrappedInputField)
})

