let characterCount = document.querySelector(".character-count");
let wordCount = document.querySelector(".word-count");
let sentenceCount = document.querySelector(".sentence-count");
let textareaContent = document.querySelector(".textarea");
let limit = document.querySelector("#limit");
let characterLimitDisplay = document.querySelector(".hide-limit");
let setCharacterLimit = document.querySelector("#set-limit");


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
})

characterCount.textContent = "00";
wordCount.textContent = "00";
sentenceCount.textContent = "00";

// Getting length of character
function characterCounter(text) {
    characterCount.textContent = text.length;
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

