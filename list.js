
import {deployLanguagesList, tagDeployedLanguageList, 
	removeDeployTagsFromTitleLanguageButtons, reverseLanguages, 
	languageListShowToggle, chooseLanguage} from './scripts/title'
// import './scripts/title'

import {
	googleAutentification, user, auth, onAuthStateChanged, onSnapshot, showTexts, 
	signingOut, createNewAccount, loginWithEmail, doc, db, collection, addDoc, serverTimestamp
} from './scripts/fbconfig'

import {copyToClipboard, rememberReds, deployTranslate} from './scripts/functions'

document.addEventListener('click', (e)=> {
	copyToClipboard(e, document.querySelector('.translated__area'))
})


const backButton = document.querySelector('.header__icon')
const homebutton = document.querySelector('.home-button')
const addButton = document.querySelector('.subtitle__add-button')
const savedTextsList = document.querySelector('.saved-texts__list')
const contacts = document.querySelector('.contacts')

contacts.addEventListener('click', ()=>{
	showTexts()
})
// const translationField = document.querySelector('.subtitle__add-button')

// back to main page
backButton.addEventListener('click', ()=>{
	backToMainPage()
})
homebutton.addEventListener('click', ()=> {
	backToMainPage()
})

// open transtalion[]
document.addEventListener('click', (e)=>{
	// openTranslation (e)
})

// deploy text
savedTextsList.addEventListener('click', (e)=>{
deployText(e)
})

savedTextsList.addEventListener('click', (e)=>{
	if (e.target.classList.contains('list__item-title') ) {
	closeTranslation(e)
	}
})

function backToMainPage () {
	window.location.href = 'index.html'
}

function openTranslation (e) {
	// if(e.target.classList.contains('subtitle__add-button')) {
	// 	e.target.closest('.subtitle').classList.remove('open')
	// 	e.target.closest('.list__item').querySelector('.subtitle-title').classList.add('open')
	// }
}

function deployText (e) {
	if (e.target.classList.contains('list__item-title') ) {
		// console.log(e.target.closest('.list__item').querySelector('.subtitle-title'))
		// if (e.target.closest('.list__item').querySelector('.subtitle-title').classList.contains('open')) {
		// 	e.target.closest('.list__item').querySelector('.subtitle-title').classList.remove('open')
		// }
		// else {
		closeTranslation(e)
			e.target.closest('.list__item').querySelector('.list__item-subtitle').classList.toggle('open')
		}
		
	}
	// 
// }

function closeTranslation(e) {
if (e.target.classList.contains('title__close-button')) {
	// console.log(e.taget.closest('.list__item-subtitle-add'))
	document.querySelector('.list__item-subtitle-add').remove()
	// e.target.closest('.list__item').querySelector('.subtitle-title').classList.remove('open')
	// e.target.closest('.list__item').querySelector('.subtitle').classList.add('open')

}
}


// onAuthStateChanged(auth, user => {
// 	if (user) {
// 		showTexts()
// 	}
// })

// deploy translate
document.addEventListener('click', (e)=>{
	deployTranslate(e)
	if (e.target.classList.contains('subtitle__add-button')) {
		e.target.closest('.list__item-subtitle').classList.remove('open')
	}
	// openTranslation(e)
})




const x =  `<li class="list__item"> <span class="list__item-title">ввОтрывок 167i  ук  ук из Гарриbvb v bbbbb Поттера</span>
			<div class="list__item-subtitle-add subtitle-title">


	<secton class="list-translate-title title ">
		<button class="title__close-button close-button">
			<img class="title__close-button close-button-line1" src="/img/input/1.svg" alt="line">
			<img class="title__close-button close-button-line2" src="/img/input/2.svg" alt="line">
		</button>
		<div class="title__language-buttons buttons">
			<button class="buttons__button buttons__source-button" data-language="en">english</button>
			<button class="buttons__reverse-button">
				<img class="buttons__reverse-button" src="img/header/2.svg" alt="strict">
				<img class="buttons__reverse-button" src="img/header/3.svg" alt="strict">
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
			<textarea class="input__textarea" placeholder="введи текст и выдели слова, которые ты хочешь выучить" name=input-text"></textarea>
			<button class="input__close-button close-button">
				<img class="close-button close-button-line1" src="/img/input/1.svg" alt="line">
				<img class="close-button close-button-line2" src="/img/input/2.svg" alt="line">
			</button>
		</div>
		<div class="input__wrapped-area"></div>
	</section>
	<section class="output">
		<div class="output__translated translated">
			<div class="translated__area">Список слов, <br/> которые ты хочешь <br/> выучить,  с <br/> переводом</div>
			<button class="translated__copy-button copy-button">
				<img class="copy-button copy-button__img1" src="/img/output/1.svg" alt="copy">
				<img class="copy-button copy-button__img2" src="/img/output/2.svg" alt="copy">
			</button>
		</div>
	</section>
	<section class="add-dictionary">
		<button class="add-dictionary__add-button">
			Сохранить
		</button>
	</section>



</div>
<div class="list__item-subtitle subtitle">
	<div class="subtitle__text-block">
		<div class="subtitle__title">Текст</div>
		<div class="subtitle__text">gdfgd</div>
	</div>
	<div class="subtitle__words-block">
		<div class="subtitle__title">Словарь</div>
		<div class="subtitle__words">fdgd </div>
	</div>
	<button class="subtitle__add-button">Ред.</button>
</div>
</li>
`