// imports============================

import {
	savedButton,languagePickButtonsWrapper, signOutButton,inputField,
	outputField,addToDictionaryButton,contactsFooter,popupsWrapper, authPopup, saveTextPopup, 
	authPopupCloseButton, saveTextPopupCloseButton, sourceLanguageButton, targetLanguageButton,
	languagesList,autoDetectLanguageOption, reverseLanguagesButon, wrappedInputField, 
	authPopupLoginButton ,authPopupSignupButton, loginPopup,
	registrationPopup, regPopupSigninButton, logPopupLoginButton, allPopups
} from './variables'

import {
	googleAutentification, user, auth, onAuthStateChanged
} from './fbconfig'

// functions
function showSignoutButton () {
	signOutButton.classList.add('open')
}
function hideSignoutButton () {
	signOutButton.classList.remove('open')
}
function goToSavedTextsPage () {
	window.location.href = 'list.html'
}

function deployLanguagesList (target) {
	if(target == sourceLanguageButton || target == targetLanguageButton){
		tagDeployedLanguageList(target,sourceLanguageButton, targetLanguageButton)
	}
	if(target == sourceLanguageButton) {
		autoDetectLanguageOption.classList.remove('hidden')
		languageListShowToggle ()
	}
	else if(target == targetLanguageButton) {
		autoDetectLanguageOption.classList.add('hidden')
		languageListShowToggle ()
	}
}

function tagDeployedLanguageList (target,sourceLanguageButton, targetLanguageButton) {
	if(languagesList.classList.contains('open')){
		removeDeployTagsFromTitleLanguageButtons ()
	}
	else {
		target.classList.add('deployed')
	}
}

function removeDeployTagsFromTitleLanguageButtons () {
	sourceLanguageButton.classList.remove('deployed')
	targetLanguageButton.classList.remove('deployed')
}

function reverseLanguages () {
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


function languageListShowToggle () {
	languagesList.classList.toggle('open')
}

function chooseLanguage (target) {
	const targetProperties = {
		languageName: target.textContent,
		languageCode: target.dataset.language
	}
	const depoyedLanguageButton = languagePickButtonsWrapper.querySelector('.deployed')
	depoyedLanguageButton.textContent = targetProperties.languageName
	depoyedLanguageButton.dataset.language = targetProperties.languageCode
}

function pickLanguage(target) {
	const languageName = target.textContent
	const languageCode = target.dataset.language
}

function makeArrayFromInputValue () {
	const inputValue = inputField.value
	const inputWordsArray = inputValue.split(' ')
	const additionalTag = ''
	wrapWords(inputWordsArray, wrappedInputField, additionalTag)
	makeSpacesInText(wrappedInputField)
}
function clearAny() {
	inputField.value = ''
	wrappedInputField.innerHTML = ''
	rememberReds = []
}

function wrapWords(array, output, additionalTag) {
	let words = ''
	array.forEach((elem) => {
		if(rememberReds.includes(elem)) {
			words += `<span class="word colored"> ${elem} </span> ${additionalTag}`
		}
		else{
			words += `<span class="word"> ${elem} </span> ${additionalTag}`
		}
		
		output.innerHTML = words
	})
}

let rememberReds = []

function singleOut (e) {
	const target = e.target
	if (target.classList.contains('word') && !target.classList.contains('colored')) {
		target.classList.add('colored')
		let doesContain = false
		rememberReds.forEach((elem)=>{
			if(elem.word == target.textContent){
				doesContain = true
			}
		})
		if(doesContain == false){
			rememberReds.push({word: target.textContent})
		}
	}
	else if(target.classList.contains('colored')) {
		target.classList.remove('colored')
		let wordsArray = wrappedInputField.querySelectorAll('.colored')
		let doesSameExist = false
		wordsArray.forEach((elem)=>{
			if(elem.textContent == target.textContent){
				doesSameExist = true
			}
		})
		if(doesSameExist == false) {
			removeWords(rememberReds, target.textContent)
		}
	}
}

function checkIfWordsFromColoredArrayYetExist() {
	let inputWords = wrappedInputField.querySelectorAll('.word')
	let cleanedWords = []
	inputWords.forEach((elem)=>{
		cleanedWords.push(elem.textContent)
	})
		rememberReds.forEach((elem)=>{
			if (!cleanedWords.includes(elem.word)) {
				removeWords(rememberReds, elem.word)
				makePickedList(wrappedInputField)
			}
		})
}

function keepSingled() {
	let wordsArray = wrappedInputField.querySelectorAll('.word')
	wordsArray.forEach((word)=>{
		rememberReds.forEach((colored)=>{
			if (colored.word == word.textContent){
				word.classList.add('colored')
			}
		})
	})
}

function removeWords(array, target) {
	let j = 0; // новое положение в массиве
	for (let i = 0; i < array.length; i++) {
		 if (array[i].word != target) {// если не нужно удалять элемент
			array[j++] = array[i]; // помещаем элемент в новое место
		 }
	}
	array.length = j; // обновляем размер массива
}

function makeSpacesInText (field) {
	field.innerHTML = field.innerHTML.replace(/(\r\n|\n|\r)/g, '<br/> ')
}

async function makePickedList (field) {
	await makeTranstlation(outputField, rememberReds)
	if(rememberReds.length == 0) {
		outputField.innerHTML = `Список слов, <br/> которые ты хочешь <br/> выучить,  с <br/> переводом`
	}
}

let translation = ''
async function makeTranstlation(field, array) {
	let words = ''

	for(const elem of array) {
		if(!elem.translation){
			await translateRequest (elem.word, sourceLanguageButton.dataset.language, targetLanguageButton.dataset.language)
			elem.translation = translation
			words += `<span class="word"> ${elem.word} -|- ${elem.translation}</span> </br>`
			field.innerHTML = words
			// console.log(array)
		}
		else {
			words += `<span class="word"> ${elem.word} -|- ${elem.translation}</span> </br>`
			field.innerHTML = words
			// console.log(array)
		}
	}
}

async function translateRequest (word, sourceLang, targetLang) {
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '58d3c58ab8msha13044a644a9922p1cefcdjsn43567980948d',
			'X-RapidAPI-Host': 'translated-mymemory---translation-memory.p.rapidapi.com',
		}
	};
	
	await fetch(`https://translated-mymemory---translation-memory.p.rapidapi.com/get?langpair=${sourceLang}%7C${targetLang}&q=${word}&mt=1&onlyprivate=0&de=a%40b.c`, options)
		.then(response => response.json())
		.then(response => {let translateValue = response.responseData.translatedText
				translation = translateValue})
		.catch(err => console.error(err));
		// Hello%20World!
}

// exports
export {showSignoutButton, goToSavedTextsPage, hideSignoutButton,
	 deployLanguagesList, reverseLanguages, pickLanguage, chooseLanguage, removeDeployTagsFromTitleLanguageButtons, 
	 makeArrayFromInputValue, wrapWords, singleOut, makePickedList, keepSingled, rememberReds, checkIfWordsFromColoredArrayYetExist, clearAny }