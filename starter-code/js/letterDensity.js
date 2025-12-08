import { wordWrapper, btn } from "./dom.js";

wordWrapper.innerHTML = "<h3>Letter Density</h3>";

export function eachLetterLength(text) {
    let string = [...text];
    let container = [];

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
    let message = document.createElement("p");
    message.style.textAlign = "left";
    message.textContent =
        "No characters found. Start typing to see letter density.";

    wordWrapper.appendChild(message);
    btn.style.display = "none";
}
