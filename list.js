
import {deployLanguagesList, tagDeployedLanguageList, 
	removeDeployTagsFromTitleLanguageButtons, reverseLanguages, 
	languageListShowToggle, chooseLanguage} from './scripts/title'
// import './scripts/title'

import {
	googleAutentification, user, auth, onAuthStateChanged, onSnapshot, showTexts, updateDoc, deleteDoc,
	signingOut, createNewAccount, loginWithEmail, doc, db, collection, addDoc, serverTimestamp
} from './scripts/fbconfig'

import {copyToClipboard, rememberReds, deployTranslate, addToCol} from './scripts/functions'

document.addEventListener('click', (e)=> {
	copyToClipboard(e, document.querySelector('.translated__area'))
})


const backButton = document.querySelector('.header__icon')
const homebutton = document.querySelector('.home-button')
const addButton = document.querySelector('.subtitle__add-button')
const savedTextsList = document.querySelector('.saved-texts__list')
const contacts = document.querySelector('.contacts')




		setTimeout(() => {
			if(auth.currentUser){
				showTexts()
			}
			else {
				setTimeout(()=>{
					showTexts()
				}, 3000)
			}
			
		}, 1000);
		

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

// delete doc
document.addEventListener('click', async (e)=>{
	if(e.target.classList.contains('list__item-title-delete')){
		await deleteDoc (doc(db, "USERS", 'users collections', `${auth.currentUser.email}`, `${e.target.closest('.list__item').dataset.id}`))
	}
})



// save new text
document.addEventListener('click', async (e)=>{
	if(e.target.classList.contains('list-save-button')) {
		const docName = e.target.closest('.list__item').dataset.id
		const file = await doc(db, "USERS", 'users collections', `${auth.currentUser.email}`, `${docName}`)
		const input = document.querySelector('.input__textarea')
		const text = document.querySelector('.input__wrapped-area').innerHTML
		const coloredWords = document.querySelector('.translated__area').innerHTML
		const data = {
			input: input.value,
			pickedWords: coloredWords,
			text: text,
			pickedWordsArray: rememberReds
		}
		updateDoc(file, data)
	}
})

savedTextsList.addEventListener('click', (e)=>{
	// if (e.target.classList.contains('list__item-title') && e.target.closest('.list__item').querySelector('.list__item-subtitle-add') || e.target.classList.contains('title__close-button')) {
		if (e.target.classList.contains('title__close-button')) {
	closeTranslation(e)
	}
	else if(e.target.classList.contains('list__item-title') && e.target.closest('.list__item').querySelector('.list__item-subtitle-add')){
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
	if (e.target.classList.contains('list__item-title')) {
		// console.log(e.target.closest('.list__item').querySelector('.subtitle-title'))
		// if (e.target.closest('.list__item').querySelector('.subtitle-title').classList.contains('open')) {
		// 	e.target.closest('.list__item').querySelector('.subtitle-title').classList.remove('open')
		// }
		// else {
		// closeTranslation(e)
		document.querySelectorAll('.list__item-subtitle').forEach((elem)=>{
			if(elem != e.target.closest('.list__item').querySelector('.list__item-subtitle')){
				elem.classList.remove('open')
			}
		})
			e.target.closest('.list__item').querySelector('.list__item-subtitle').classList.toggle('open')
		}
		
	}
	// 
// }

function closeTranslation(e) {
// if (e.target.classList.contains('title__close-button')) {
	// console.log(e.taget.closest('.list__item-subtitle-add'))
	document.querySelector('.list__item-subtitle-add').remove()
	// e.target.closest('.list__item').querySelector('.subtitle-title').classList.remove('open')
	// e.target.closest('.list__item').querySelector('.subtitle').classList.add('open')

// }
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




