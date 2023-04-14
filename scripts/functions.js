// imports============================

import {
	savedButton,languagePickButtonsWrapper, signOutButton,
	addToDictionaryButton,contactsFooter,popupsWrapper, authPopup, saveTextPopup, 
	authPopupCloseButton, saveTextPopupCloseButton, sourceLanguageButton, targetLanguageButton,
	languagesList,autoDetectLanguageOption, reverseLanguagesButon, outputSection,
	authPopupLoginButton ,authPopupSignupButton, loginPopup, SaveTextButton, copyButton,
	registrationPopup, regPopupSigninButton, logPopupLoginButton, allPopups, saveTextInput
} from './variables'

import {
	googleAutentification, user, auth, onAuthStateChanged, doc, db, collection, addDoc, serverTimestamp
} from './fbconfig'

import {
	inputField, wrappedInputField
} from './input'

import {
	outputField
} from './output'

let rememberReds = []

// functions

const addToCol = ()=>{
	const file = doc(db, "USERS", 'users collections')
	const title = document.querySelector('.save-text-popup__input').value
	const input = document.querySelector('.input__textarea')
	const text = document.querySelector('.input__wrapped-area').innerHTML
	const coloredWords = document.querySelector('.translated__area').innerHTML
	const col = collection(file, `${auth.currentUser.email}`)
	addDoc(col, {
		input: input.value,
		title: title,
		pickedWords: coloredWords,
		text: text,
		createdAt: serverTimestamp(),
		pickedWordsArray: rememberReds
	})
}

function clearAny(e) {
	// const main = e.target.closest('body')
	document.querySelector('.input__textarea').value = ''
	document.querySelector('.input__wrapped-area').innerHTML = ''
	if(document.querySelector('.save-text-popup__input')) {
		document.querySelector('.save-text-popup__input').value = ''
	}
	rememberReds = []
	document.querySelector('.translated__area').innerHTML = `Список слов, <br/> которые ты хочешь <br/> выучить,  с <br/> переводом`
	document.querySelector('.input__wrapped-area').classList.remove('open')
}

async function copyToClipboard(e, field) {
	if(e.target.classList.contains('copy-button')) {
		let listForSave = ''
		const wordsArray = field.querySelectorAll('.word')
		wordsArray.forEach((elem)=> {
		listForSave += elem.textContent + "\r\n"; }
		)
		try {
			await navigator.clipboard.writeText(listForSave);
		} catch (err) {
			console.error('Не удалось скопировать: ', err);
		}
	}
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

async function deployTranslate (e) {
	if (e.target.classList.contains('subtitle__add-button')) {
		const li = e.target.closest('.list__item').querySelector('.list__container')
		const properties = await JSON.parse(e.target.closest('.list__item').dataset.object)
		rememberReds = await properties.pickedWordsArray
		let liValue = li.innerHTML
		li.innerHTML = `
		<div class="list__item-subtitle-add subtitle-title open">
		<secton class="list-translate-title title ">
			<button class="title__close-button close-button" style="font-weight: 800">
Х
			</button>
			<div class="title__language-buttons buttons">
				<button class="buttons__button buttons__source-button" data-language="en">english</button>
				<button class="buttons__reverse-button" style="font-weight: 600">
	rev.
				</button>
				<button class="buttons__button buttons__target-button" data-language="ru">russian</button>
				<button class="buttons__signout">Sign out</button>
			</div>
			<div class="languages-list">
				<ul class="languages-list__ul ul">
					<li class="ul__languages-group">
						<div class="ul__title-letter">A</div>
						<ul class="ul__group-ul">
							<li class="ul__li ul__li-auto" data-language="auto">Auto Detect</li>
							<li class="ul__li" data-language="ar">Arabic</li>
						</ul>
					</li>
					<li class="ul__languages-group">
						<div class="ul__title-letter">C</div>
						<ul class="ul__group-ul">
							<li class="ul__li" data-language="zh">Chinese</li>
						</ul>
					</li>
					<li class="ul__languages-group">
						<div class="ul__title-letter">E</div>
						<ul class="ul__group-ul">
							<li class="ul__li" data-language="en">English</li>
						</ul>
					</li>
					<li class="ul__languages-group">
						<div class="ul__title-letter">F</div>
						<ul class="ul__group-ul">
							<li class="ul__li" data-language="fr">French</li>
						</ul>
					</li>
					<li class="ul__languages-group">
						<div class="ul__title-letter">G</div>
						<ul class="ul__group-ul">
							<li class="ul__li" data-language="de">German</li>
						</ul>
					</li>
					<li class="ul__languages-group">
						<div class="ul__title-letter">H</div>
						<ul class="ul__group-ul">
							<li class="ul__li" data-language="hi">Hindi</li>
						</ul>
					</li>
					<li class="ul__languages-group">
						<div class="ul__title-letter">I</div>
						<ul class="ul__group-ul">
							<li class="ul__li" data-language="id">Indonesian</li>
							<li class="ul__li" data-language="ga">Irish</li>
							<li class="ul__li" data-language="it">Italian</li>
						</ul>
					</li>
					<li class="ul__languages-group">
						<div class="ul__title-letter">J</div>
						<ul class="ul__group-ul">
							<li class="ul__li" data-language="ja">Japanese</li>
						</ul>
					</li>
					<li class="ul__languages-group">
						<div class="ul__title-letter">K</div>
						<ul class="ul__group-ul">
							<li class="ul__li" data-language="ko">Korean</li>
						</ul>
					</li>
					<li class="ul__languages-group">
						<div class="ul__title-letter">P</div>
						<ul class="ul__group-ul">
							<li class="ul__li" data-language="pl">Polish</li>
							<li class="ul__li" data-language="pt">Portuguese</li>
						</ul>
					</li>
					<li class="ul__languages-group">
						<div class="ul__title-letter">R</div>
						<ul class="ul__group-ul">
							<li class="ul__li" data-language="ru">Russian</li>
						</ul>
					</li>
					<li class="ul__languages-group">
						<div class="ul__title-letter">S</div>
						<ul class="ul__group-ul">
							<li class="ul__li" data-language="es">Spanish</li>
						</ul>
					</li>
					<li class="ul__languages-group">
						<div class="ul__title-letter">T</div>
						<ul class="ul__group-ul">
							<li class="ul__li" data-language="tr">Turkish</li>
						</ul>
					</li>
					<li class="ul__languages-group">
						<div class="ul__title-letter">V</div>
						<ul class="ul__group-ul">
							<li class="ul__li" data-language="vi">Vietnamese</li>
						</ul>
					</li>
				</ul>
			</div>
		</secton>
		<section class="input">
			<div class="input__textarea-block">
				<textarea class="input__textarea" placeholder="введи текст и выдели слова, которые ты хочешь выучить" name=input-text">${properties.input}</textarea>
				<button class="input__close-button close-button" style="font-weight: 800">
Х
				</button>
			</div>
			<div class="input__wrapped-area open">${properties.text}</div>
		</section>
		<section class="output">
			<div class="output__translated translated">
				<div class="translated__area">${properties.pickedWords}</div>
				<button class="translated__copy-button copy-button" style="font-weight: 800">
[-]
				</button>
			</div>
		</section>
		<section class="add-dictionary">
			<button class="add-dictionary__add-button list-save-button">
				Сохранить
			</button>
		</section>
		</div>
		${liValue}
		`
		
		
	}
}
// exports
export { copyToClipboard, rememberReds, clearAny, removeWords, addToCol, deployTranslate }