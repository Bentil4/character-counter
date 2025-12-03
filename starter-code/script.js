let characterCount = document.querySelector(".character-count");
let wordCount = document.querySelector(".word-count");
let sentenceCount = document.querySelector(".sentence-count");
let textareaContent = document.querySelector(".textarea");
let limit = document.querySelector("#limit");
let characterLimitDisplay = document.querySelector(".hide-limit");
let setCharacterLimit = document.querySelector("#set-limit");

function getElement(selectorName, type) {
    switch (type) {
        case 'id':
            return document.getElementById(selectorName);
        case 'class':
            return document.getElementsByClassName(selectorName);
        case 'tag':
            return document.getElementsByTagName(selectorName);
    }
}

textareaContent.addEventListener('input', ()=> {
    let inputValue = textareaContent.value;

    let limitNumber = parseInt(setCharacterLimit.value);

    if (limit.checked && limitNumber && inputValue.length > limitNumber) {
        textareaContent.value = inputValue.substring(0, limitNumber);
        inputValue = textareaContent.value;
    }

    
    wordCounter(inputValue);
    characterCounter(inputValue);
    sentenceCounter(inputValue);
    eachLetterLength(inputValue);


})



characterCount.textContent = "00";
wordCount.textContent = "00";
sentenceCount.textContent = "00";

// Getting length of character
function characterCounter(text) {
    let addSpaces = getElement('space', 'id')
    if (addSpaces.checked){
        characterCount.textContent = text.length
    }else{
        characterCount.textContent = text.replace(/\s+/g, '').length;
    }
}

// Getting number of words
function wordCounter(text) {
    let words = text.trim().split(/\s+/).filter(word => word !== "");
    wordCount.textContent = words.length;
}

// Getting number of sentence
function sentenceCounter(text) {
    let sentences = text.split(/[.!?]+/).filter(space => space.trim() !== "");
    sentenceCount.textContent = sentences.length;
}


// Set character limit
limit.addEventListener("click",()=> {
    characterLimitDisplay.classList.toggle("hide-limit");
    characterLimitDisplay.classList.toggle("show-limit");
})


function eachLetterLength(text){
    let string = [...text];
    let container = []

    // let wordWrapper = getElement('word-wrapper', 'class');
    let wordWrapper = document.querySelector('.word-wrapper');

    wordWrapper.innerHTML = "";


    for (let stringElement of string) {

        container[stringElement] = (container[stringElement] || 0)  + 1;
    }
    let totalCharacters = string.length

    for (let  key in container ){
        let characterValue = key.valueOf().toLocaleUpperCase() ;
        let count = container[key];
        let percentageValue = ((count / totalCharacters) * 100).toFixed(2);

        let wordDetails = document.createElement("article")
        wordDetails.setAttribute("class", "word-details");
        wordWrapper.appendChild(wordDetails);

        let letter = document.createElement('p')
        let progressBar = document.createElement('div')
        progressBar.setAttribute('class', 'progress-bar');
        progressBar.style.setProperty('--fill-width', `${percentageValue}%`);

        let percentage = document.createElement("p")

        console.log("Character " + " " + characterValue +" -- "+ container[key] + percentageValue);


        letter.innerHTML = characterValue
        percentage.innerHTML = `${container[key]} (${percentageValue}%)`;
        wordDetails.append(letter,progressBar, percentage);
    }
}







