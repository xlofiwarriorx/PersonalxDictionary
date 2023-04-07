
import {
	savedButton,languagePickButtonsWrapper, signOutButton,inputField,
	outputField,addToDictionaryButton,contactsFooter,popupsWrapper, authPopup, saveTextPopup, 
	authPopupCloseButton, saveTextPopupCloseButton, sourceLanguageButton, targetLanguageButton,
	languagesList,autoDetectLanguageOption, reverseLanguagesButon, wrappedInputField, 
	authPopupLoginButton ,authPopupSignupButton, loginPopup,
	registrationPopup, regPopupSigninButton, logPopupLoginButton, allPopups
} from './variables'

function openPopup(popup) {
	popupsWrapper.classList.add('open')
	allPopups.forEach((elem)=>{
			elem.classList.remove('open')
	})
	popup.classList.add('open')
}

function closePopup (e) {
	if(e.target.classList.contains('popups') || e.target.classList.contains('close-button') || e.target.classList.contains('form__submit') || e.target.classList.contains('form__google-in'))  {
		let popups = e.target.closest('.popups').querySelectorAll('.popup')
		popups.forEach((elem)=>{
			if(elem.classList.contains('open')) {
				elem.classList.remove('open')
			}
		})
		popupsWrapper.classList.remove('open')
	}
	
}

export { openPopup, closePopup}