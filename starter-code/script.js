let characterCount = document.querySelector(".character-count");
let wordCount = document.querySelector(".word-count");
let sentenceCount = document.querySelector(".sentence-count");
let textareaContent = document.querySelector(".textarea");
let limit = document.querySelector("#limit");
let characterLimitDisplay = document.querySelector(".hide-limit");
let setCharacterLimit = document.querySelector("#set-limit");
let popup = document.getElementById("limit-popup");
let closePopupBtn = document.getElementById("close-popup");
let wordWrapper = document.querySelector(".word-wrapper");
let wordsLimit = document.querySelector("#set-limit");
let textAreaBox = document.querySelector('.textarea-box')


wordWrapper.innerHTML = "<h3>Letter Density</h3>";
function getElement(selectorName, type) {
  switch (type) {
    case "id":
      return document.getElementById(selectorName);
    case "class":
      return document.getElementsByClassName(selectorName);
    case "tag":
      return document.getElementsByTagName(selectorName);
  }
}

let btn = document.querySelector(".btn");

textareaContent.addEventListener("input", () => {
  let inputValue = textareaContent.value;
  if (inputValue.length === 0) {
    btn.style.display = "none";
  } else {
    btn.style.display = "block";
  }

  let limitNumber = parseInt(setCharacterLimit.value);

  if (limit.checked && limitNumber && inputValue.length > limitNumber) {
    textareaContent.value = inputValue.substring(0, limitNumber);
    inputValue = textareaContent.value;

    popup.style.display = "flex";
  }

  wordCounter(inputValue);
  characterCounter(inputValue);
  sentenceCounter(inputValue);
  eachLetterLength(inputValue);
});

characterCount.textContent = "00";
wordCount.textContent = "00";
sentenceCount.textContent = "00";

// Getting length of character
function characterCounter(text) {
  let addSpaces = getElement("space", "id");
  if (addSpaces.checked) {
    characterCount.textContent = text.length;
  } else {
    characterCount.textContent = text.replace(/\s+/g, "").length;
  }
}

// Getting number of words
function wordCounter(text) {
  let words = text
    .trim()
    .split(/\s+/)
    .filter((word) => word !== "");
  wordCount.textContent = words.length;
}

// Getting number of sentence
function sentenceCounter(text) {
  let sentences = text.split(/[.!?]+/).filter((space) => space.trim() !== "");
  sentenceCount.textContent = sentences.length;
}

// Set character limit
limit.addEventListener("click", () => {
  characterLimitDisplay.classList.toggle("hide-limit");
  characterLimitDisplay.classList.toggle("show-limit");
});

function eachLetterLength(text) {
  let string = [...text];
  let container = [];

  let wordWrapper = document.querySelector(".word-wrapper");
  wordWrapper.innerHTML = "<h3>Letter Density</h3>";
  if (text.length === 0) {
    showEmptyMessage();
    return;
  }

  for (let stringElement of string) {
    container[stringElement] = (container[stringElement] || 0) + 1;
  }

  let totalCharacters = string.length;

  for (let key in container) {
    let characterValue = key.valueOf().toLocaleUpperCase();
    let count = container[key];
    let percentageValue = ((count / totalCharacters) * 100).toFixed(2);

    let wordDetails = document.createElement("article");
    wordDetails.setAttribute("class", "word-details letter-row");
    wordWrapper.appendChild(wordDetails);
    let letter = document.createElement("p");
    let progressBar = document.createElement("div");
    progressBar.setAttribute("class", "progress-bar");
    progressBar.style.setProperty("--fill-width", `${percentageValue}%`);

    let percentage = document.createElement("p");

    letter.innerHTML = characterValue;
    percentage.innerHTML = `${container[key]} (${percentageValue}%)`;
    wordDetails.append(letter, progressBar, percentage);
  }

  updateShowMore();
}

btn.addEventListener("click", () => {
  let letterRow = document.querySelectorAll(".letter-row");
  if (btn.textContent === "See More") {
    letterRow.forEach((letter) => (letter.style.display = "flex"));
    btn.textContent = "See Less";
  } else {
    letterRow.forEach((letter, index) => {
      letter.style.display = index < 5 ? "flex" : "none";
    });
    btn.textContent = "See More";
  }
});

function updateShowMore() {
  let letterRow = document.querySelectorAll(".letter-row");
  if (letterRow.length > 5) {
    letterRow.forEach((letter, index) => {
      letter.style.display = index < 5 ? "flex" : "none";
    });
    btn.style.display = "block";
    btn.textContent = "See More";
  } else {
    btn.style.display = "none";
  }
}

closePopupBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

function showEmptyMessage() {
  let wordWrapper = document.querySelector(".word-wrapper");

  let message = document.createElement("p");
  message.style.textAlign = "left";
  message.textContent =
    "No characters found. Start typing to see letter density.";

  wordWrapper.appendChild(message);

  btn.style.display = "none";
}

showEmptyMessage();

let warning = document.querySelector(".max");
let textArea = document.querySelector(".textarea");


textArea.addEventListener("input", (e) => {
  const text = textArea.value;
  let userLimit = Number(wordsLimit.value);

  if (userLimit <= 0) {
    warning.style.display = "none";
    return;
  }

  if (text.length >= userLimit) {
    warning.textContent = `Limit reached! Your text exceeds ${userLimit} characters.`;
    warning.style.display = "block";
    textAreaBox.classList.add("limit-exceeded");
  } else {
    warning.style.display = "none";
    textAreaBox.classList.remove("limit-exceeded");
  }
});

// Toggle Themes
let theme = document.querySelector(".theme");
let logo = document.querySelector(".logo");
let body = document.body;
let savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  body.classList.add("light-theme");
  theme.src = "./assets/images/icon-moon.svg";
  logo.src = "./assets/images/logo-dark-theme.svg";
} else {
  body.classList.add("dark-theme");
  theme.src = "./assets/images/icon-sun.svg";
  logo.src = "./assets/images/logo-light-theme.svg";
}

theme.addEventListener("click", () => {
  body.classList.toggle("light-theme");
  body.classList.toggle("dark-theme");

  if (body.classList.contains("dark-theme")) {
    localStorage.setItem("theme", "dark");
    theme.src = "./assets/images/icon-sun.svg";
    logo.src = "./assets/images/logo-dark-theme.svg";
  } else {
    localStorage.setItem("theme", "light");
    theme.src = "./assets/images/icon-moon.svg";
    logo.src = "./assets/images/logo-light-theme.svg";
  }
});
