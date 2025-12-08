import {
    limitCheckbox,
    characterLimitDisplay,
    setCharacterLimit,
    popup,
    closePopupBtn,
    warning,
    wordsLimit,
    textAreaBox
} from "./dom.js";

export function toggleLimitUI() {
    characterLimitDisplay.classList.toggle("hide-limit");
    characterLimitDisplay.classList.toggle("show-limit");
}

export function handleCharacterLimit(textareaContent) {
    let inputValue = textareaContent.value;
    let limitNumber = parseInt(setCharacterLimit.value);

    if (limitCheckbox.checked && limitNumber && inputValue.length > limitNumber) {
        textareaContent.value = inputValue.substring(0, limitNumber);
        popup.style.display = "flex";
    }
}

export function showWarning(textArea) {
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
}

closePopupBtn.addEventListener("click", () => {
    popup.style.display = "none";
});
