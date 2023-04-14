// imports

import './scripts/title'
import './scripts/input'
import './scripts/output'
import { outputField, outputSection } from './scripts/output'
import { wrappedInputField } from './scripts/input'

	import {
		googleAutentification, user, auth, onAuthStateChanged, signingOut, createNewAccount, loginWithEmail
	} from './scripts/fbconfig'

	import {
		showSignoutButton, goToSavedTextsPage, hideSignoutButton, deployLanguagesList, 
		reverseLanguages,pickLanguage,chooseLanguage, removeDeployTagsFromTitleLanguageButtons,
		wrapWords, makeArrayFromInputValue, singleOut, makePickedList, keepSingled, 
		checkIfWordsFromColoredArrayYetExist, rememberReds, clearAny, makeListForSave, copyToClipboard
	} from './scripts/functions'

	import {openAuthPopup, openPopup, closePopup} from './scripts/popups'

	import {
		addToCol }
	from './scripts/list'
	

	import {
		languagePickButtonsWrapper, signOutButton,inputField
		,addToDictionaryButton,contactsFooter,popupsWrapper, authPopup, saveTextPopup, 
		authPopupCloseButton, saveTextPopupCloseButton, sourceLanguageButton, targetLanguageButton,
		languagesList,autoDetectLanguageOption, reverseLanguagesButon, authPopupLoginButton,
		authPopupSignupButton, registrationPopup, regPopupSigninButton, copyButton,
		logPopupLoginButton, loginPopup, SaveTextButton, saveTextInput, inputBlock
	} from './scripts/variables'









// copy words

document.addEventListener('click', (e)=> {
	// if(e.target.classList.contains('copy-button')) {
		copyToClipboard(e, outputField)
		// listForSave = ''
	// }
})














