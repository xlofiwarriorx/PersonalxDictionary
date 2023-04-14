import { rememberReds, removeWords, clearAny } from "./functions"
import {outputField, outputSection } from './output'
import { sourceLanguageButton, targetLanguageButton } from './title'

const inputBlock = document.querySelector('.input')
const inputField = document.querySelector('.input__textarea')
const wrappedInputField = document.querySelector('.input__wrapped-area')


// make wrapped words block from input value
document.addEventListener('input', (e)=>{
	if(e.target.classList.contains('input__textarea')) {
		let inputField = e.target
		if(inputField.value == '') {
			clearAny(e)
			}
		else {
			document.querySelector('.input__wrapped-area').classList.add('open')
			makeArrayFromInputValue()
			keepSingled()
			checkIfWordsFromColoredArrayYetExist()
		}
	}
	
})

// inputField.addEventListener('input', (e)=>{
// 	if(inputField.value == '') {
// 		clearAny(e)
// 		}
// 	else {
// 		wrappedInputField.classList.add('open')
// 		makeArrayFromInputValue()
// 		keepSingled()
// 		checkIfWordsFromColoredArrayYetExist()
// 	}
// })



// delete input
document.addEventListener('click', (e)=>{
if (e.target.classList.contains('close-button') && e.target.closest('.input__textarea-block')) {
	clearAny(e)
}
})

// single out(dye) words
document.addEventListener('click', (e)=>{
	if(e.target.classList.contains('word') && e.target.closest('.input__wrapped-area')) {
		singleOut(e)
		makePickedList(wrappedInputField)
	}
})
// wrappedInputField.addEventListener('click', (e)=>{
// 	singleOut(e)
// 	makePickedList(wrappedInputField)
// })

// function makeArrayFromInputValue () {
// 	const inputValue = inputField.value
// 	const inputWordsArray = inputValue.split(' ')
// 	const additionalTag = ''
// 	wrapWords(inputWordsArray, wrappedInputField, additionalTag)
// 	makeSpacesInText(wrappedInputField)
// }

function makeArrayFromInputValue () {
	const inputValue = document.querySelector('.input__textarea').value
	const inputWordsArray = inputValue.split(' ')
	const additionalTag = ''
	wrapWords(inputWordsArray, document.querySelector('.input__wrapped-area'), additionalTag)
	makeSpacesInText(document.querySelector('.input__wrapped-area'))
}

function keepSingled() {
	let wordsArray = document.querySelector('.input__wrapped-area').querySelectorAll('.word')
	wordsArray.forEach((word)=>{
		rememberReds.forEach((colored)=>{
			if (colored.word == word.textContent){
				word.classList.add('colored')
			}
		})
	})
}

function checkIfWordsFromColoredArrayYetExist() {
	let inputWords = document.querySelector('.input__wrapped-area').querySelectorAll('.word')
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

function makeSpacesInText (field) {
	field.innerHTML = field.innerHTML.replace(/(\r\n|\n|\r)/g, '<br/> ')
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

async function makePickedList (field) {
	await makeTranstlation(document.querySelector('.translated__area'), rememberReds)
	if(rememberReds.length == 0) {
		document.querySelector('.translated__area').innerHTML = `Список слов, <br/> которые ты хочешь <br/> выучить,  с <br/> переводом`
	}
}

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
		let wordsArray = document.querySelector('.input__wrapped-area').querySelectorAll('.colored')
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


let translation = ''
async function makeTranstlation(field, array) {
	let words = ''

	for(const elem of array) {
		if(!elem.translation){
			await translateRequest (elem.word, document.querySelector('.buttons__source-button').dataset.language, document.querySelector('.buttons__target-button').dataset.language)
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

export { inputField, wrappedInputField }