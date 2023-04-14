import { auth, signingOut, onAuthStateChanged } from './fbconfig'
import { openPopup } from './popups'
import { authPopup } from './popups'

const savedButton = document.querySelector('.header__icon')
const languagePickButtonsWrapper = document.querySelector('.title__language-buttons')
const sourceLanguageButton = document.querySelector('.buttons__source-button')
const targetLanguageButton = document.querySelector('.buttons__target-button')
const reverseLanguagesButon = document.querySelector('.buttons__reverse-button')
const languagesList = document.querySelector('.languages-list')
const autoDetectLanguageOption = document.querySelector('.ul__li-auto')
const signOutButton = document.querySelector('.buttons__signout')

//constantly checking if user logged in 
onAuthStateChanged(auth, user => {
	if(user) {
		showSignoutButton ()
	}
	else {
		hideSignoutButton ()
	}
})

// open language- list
document.addEventListener('click', (e)=> {
	const target = e.target
		deployLanguagesList(target)
})



// reverse languages(source and target)
document.addEventListener('click', (e)=>{
		reverseLanguages (e, document.querySelector('.buttons__source-button'), document.querySelector('.buttons__target-button'))
})

// pick language from deployed list
document.addEventListener('click', (e)=>{
	const target = e.target
	if(target.classList.contains('ul__li')) {
		chooseLanguage(target)
		document.querySelector('.languages-list').classList.remove('open')
		removeDeployTagsFromTitleLanguageButtons()
	}
})

// saved-button handler
savedButton.addEventListener('click', ()=>{
	if(auth.currentUser) {
		goToSavedTextsPage()
	}
	else {
		openPopup(authPopup)
	}
})

// sign out
signOutButton.addEventListener('click', ()=>{
	signingOut ()
})

function deployLanguagesList (target) {
	const body = target.closest('body')
	if(target.classList.contains('buttons__source-button')) {
		tagDeployedLanguageList (target, body)
		body.querySelector('.ul__li-auto').classList.remove('hidden')
		languageListShowToggle (body)
	}
	else if(target.classList.contains('buttons__target-button')) {
		tagDeployedLanguageList (target, body)
		body.querySelector('.ul__li-auto').classList.add('hidden')
		languageListShowToggle (body)
	}
}

function tagDeployedLanguageList (target, body) {
	if(body.querySelector('.languages-list').classList.contains('open')){
		sourceLanguageButton.classList.remove('deployed')
		targetLanguageButton.classList.remove('deployed')
		removeDeployTagsFromTitleLanguageButtons ()
	}
	else {
		target.classList.add('deployed')
	}
}

function removeDeployTagsFromTitleLanguageButtons () {
	const sourceLanguageButton = document.querySelector('.buttons__source-button')
	const targetLanguageButton = document.querySelector('.buttons__target-button')
	sourceLanguageButton.classList.remove('deployed')
	targetLanguageButton.classList.remove('deployed')
}

function reverseLanguages (e, sourceLanguageButton, targetLanguageButton) {
	if(e.target.classList.contains('buttons__reverse-button')) {
	const sourceLang = {
		value: sourceLanguageButton.textContent,
		dataset: sourceLanguageButton.dataset.language
	}
	const targetLang = {
		value: targetLanguageButton.textContent,
		dataset: targetLanguageButton.dataset.language
	}
	sourceLanguageButton.textContent = targetLang.value
	sourceLanguageButton.dataset.language = targetLang.dataset
	targetLanguageButton.textContent = sourceLang.value
	targetLanguageButton.dataset.language = sourceLang.dataset
}
}

function languageListShowToggle (body) {
	document.querySelector('.languages-list').classList.toggle('open')
}

function chooseLanguage (target) {
	const targetProperties = {
		languageName: target.textContent,
		languageCode: target.dataset.language
	}
	const depoyedLanguageButton = document.querySelector('.deployed')
	depoyedLanguageButton.textContent = targetProperties.languageName
	depoyedLanguageButton.dataset.language = targetProperties.languageCode
}

function showSignoutButton (e) {
	if(signOutButton.closest('body').dataset.type == 'title-page') {
		signOutButton.classList.add('open')
	}
}
function hideSignoutButton () {
	signOutButton.classList.remove('open')
}
function goToSavedTextsPage () {
	window.location.href = 'list.html'
}

export {sourceLanguageButton, targetLanguageButton, 
	deployLanguagesList, tagDeployedLanguageList, removeDeployTagsFromTitleLanguageButtons, reverseLanguages, languageListShowToggle, chooseLanguage
}