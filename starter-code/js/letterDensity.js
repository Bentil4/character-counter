import { wordWrapper, btn } from "./dom.js";

export function eachLetterLength(text) {
  let string = [...text];
  let container = [];

  if (text.length === 0) {
    showEmptyMessage();
    return;
  }

  wordWrapper.innerHTML = "<h3>Letter Density</h3>";

  for (let stringElement of string) {
    let lowerChar = stringElement.toLowerCase();
    container[lowerChar] = (container[lowerChar] || 0) + 1;
  }

  let totalCharacters = string.length;

  for (let key in container) {
    let characterValue = key.toUpperCase();
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
    percentage.innerHTML = `${count} (${percentageValue}%)`;
    wordDetails.append(letter, progressBar, percentage);
  }

  updateShowMore();
}

export function updateShowMore() {
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

export function showEmptyMessage() {
  wordWrapper.innerHTML = `<h3>Letter Density</h3><p style="text-align: left;">No characters found. Start typing to see letter density.</p>`;
  btn.style.display = "none";
}
