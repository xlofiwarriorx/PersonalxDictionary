// page-sections(buttons):
	// header
	const savedButton = document.querySelector('.title__header').querySelector('.header__icon')
	const languagePickButtonsWrapper = document.querySelector('.title__language-buttons')
	const sourceLanguageButton = languagePickButtonsWrapper.querySelector('.buttons__source-button')
	const targetLanguageButton = languagePickButtonsWrapper.querySelector('.buttons__target-button')
	const reverseLanguagesButon = languagePickButtonsWrapper.querySelector('.buttons__reverse-button')
	const signOutButton = document.querySelector('.buttons__signout')
// languages-list
	const languagesList = document.querySelector('.languages-list')
	const autoDetectLanguageOption = languagesList.querySelector('.ul__li-auto')
// input-section
	const inputField = document.querySelector('.input__textarea')
	const wrappedInputField = document.querySelector('.input__wrapped-area')
// output-section
	const outputField = document.querySelector('.translated__area')
// add-dictionary-section(button)
	const addToDictionaryButton = document.querySelector('.add-dictionary__add-button')
// contacts footer
	const contactsFooter = document.querySelector('.contacts')
// popups
	const allPopups = document.querySelectorAll('.popup')
	const popupsWrapper = document.querySelector('.popups')
	const authPopup = popupsWrapper.querySelector('.auth-popup')
	const authPopupCloseButton = authPopup.querySelector('.close-button')
	const authPopupLoginButton = authPopup.querySelector('.auth-buttons__login')
	const authPopupSignupButton = authPopup.querySelector('.auth-buttons__signup')
	const registrationPopup = document.querySelector('.registration-popup')
	const loginPopup = document.querySelector('.login-popup')
	const regPopupSigninButton = registrationPopup.querySelector('.registration-popup__signin')
	const logPopupLoginButton = loginPopup.querySelector('.login-popup__login')
	const saveTextPopup = popupsWrapper.querySelector('.save-text-popup')
	const saveTextPopupCloseButton = saveTextPopup.querySelector('.close-button')

export {
	savedButton,languagePickButtonsWrapper, signOutButton,inputField,
	outputField,addToDictionaryButton,contactsFooter,popupsWrapper, authPopup, saveTextPopup, 
	authPopupCloseButton, saveTextPopupCloseButton, sourceLanguageButton, targetLanguageButton,languagesList, 
	autoDetectLanguageOption, reverseLanguagesButon, wrappedInputField, authPopupLoginButton, authPopupSignupButton,
	registrationPopup, logPopupLoginButton, loginPopup,
	regPopupSigninButton, allPopups
}