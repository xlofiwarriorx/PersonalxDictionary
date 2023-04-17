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
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="title__close-button close-button-line1">
			<line x1="0.707107" y1="1.29289" x2="14.7071" y2="15.2929" stroke="black" stroke-width="2"/>
			</svg>
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="title__close-button close-button-line2">
			<line y1="-1" x2="19.799" y2="-1" transform="matrix(-0.707107 0.707107 0.707107 0.707107 16 2)" stroke="black" stroke-width="2"/>
			</svg>
			</button>
			<div class="title__language-buttons buttons">
				<button class="buttons__button buttons__source-button" data-language="en">english</button>
				<button class="buttons__reverse-button">
				<svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="buttons__reverse-button">
				<path d="M14.7071 8.70711C15.0976 8.31658 15.0976 7.68342 14.7071 7.29289L8.34315 0.928932C7.95262 0.538408 7.31946 0.538408 6.92893 0.928932C6.53841 1.31946 6.53841 1.95262 6.92893 2.34315L12.5858 8L6.92893 13.6569C6.53841 14.0474 6.53841 14.6805 6.92893 15.0711C7.31946 15.4616 7.95262 15.4616 8.34315 15.0711L14.7071 8.70711ZM0 9L14 9V7L0 7L0 9Z" fill="black"/>
				</svg>
				<svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M0.292893 8.70711C-0.0976315 8.31658 -0.0976315 7.68342 0.292893 7.29289L6.65685 0.928932C7.04738 0.538408 7.68054 0.538408 8.07107 0.928932C8.46159 1.31946 8.46159 1.95262 8.07107 2.34315L2.41421 8L8.07107 13.6569C8.46159 14.0474 8.46159 14.6805 8.07107 15.0711C7.68054 15.4616 7.04738 15.4616 6.65685 15.0711L0.292893 8.70711ZM15 9L1 9V7L15 7V9Z" fill="black"/>
				</svg>
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
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="close-button close-button-line1">
				<line x1="0.707107" y1="1.29289" x2="14.7071" y2="15.2929" stroke="black" stroke-width="2"/>
				</svg>
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="close-button close-button-line2">
				<line y1="-1" x2="19.799" y2="-1" transform="matrix(-0.707107 0.707107 0.707107 0.707107 16 2)" stroke="black" stroke-width="2"/>
				</svg>
				</button>
			</div>
			<div class="input__wrapped-area open">${properties.text}</div>
		</section>
		<section class="output">
			<div class="output__translated translated">
				<div class="translated__area">${properties.pickedWords}</div>
				<button class="translated__copy-button copy-button" style="font-weight: 800">
				<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" class="copy-button copy-button__img1">
<path d="M2.60688 2.60689C2.75535 2.45843 2.95671 2.37502 3.16667 2.37502H10.2917C10.5016 2.37502 10.703 2.45843 10.8515 2.60689C10.9999 2.75536 11.0833 2.95673 11.0833 3.16669V3.95835C11.0833 4.39558 11.4378 4.75002 11.875 4.75002C12.3122 4.75002 12.6667 4.39558 12.6667 3.95835V3.16669C12.6667 2.5368 12.4164 1.93271 11.971 1.48731C11.5256 1.04191 10.9215 0.791687 10.2917 0.791687H3.16667C2.53678 0.791687 1.93269 1.04191 1.48729 1.48731C1.04189 1.93271 0.791672 2.5368 0.791672 3.16669V10.2917C0.791672 10.9215 1.04189 11.5257 1.48729 11.971C1.93269 12.4164 2.53678 12.6667 3.16667 12.6667H3.95834C4.39556 12.6667 4.75001 12.3123 4.75001 11.875C4.75001 11.4378 4.39556 11.0834 3.95834 11.0834H3.16667C2.95671 11.0834 2.75535 10.9999 2.60688 10.8515C2.45842 10.703 2.37501 10.5016 2.37501 10.2917V3.16669C2.37501 2.95672 2.45842 2.75536 2.60688 2.60689Z" fill="black"/>
</svg>
<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" class="copy-button copy-button__img2">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.70833 0.333313C1.39666 0.333313 0.333328 1.39664 0.333328 2.70831V9.83331C0.333328 11.145 1.39666 12.2083 2.70833 12.2083H9.83333C11.145 12.2083 12.2083 11.145 12.2083 9.83331V2.70831C12.2083 1.39664 11.145 0.333313 9.83333 0.333313H2.70833ZM1.91666 2.70831C1.91666 2.27108 2.27109 1.91665 2.70833 1.91665H9.83333C10.2706 1.91665 10.625 2.27108 10.625 2.70831V9.83331C10.625 10.2706 10.2706 10.625 9.83333 10.625H2.70833C2.27109 10.625 1.91666 10.2706 1.91666 9.83331V2.70831Z" fill="black"/>
</svg>
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