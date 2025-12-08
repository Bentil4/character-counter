import {
  textareaContent,
  btn,
  limitCheckbox,
  wordCount,
  characterCount,
  sentenceCount,
} from "./dom.js";
import {
  characterCounter,
  wordCounter,
  sentenceCounter,
  readingTimeCounter,
} from "./counters.js";
import { eachLetterLength } from "./letterDensity.js";
import { handleCharacterLimit, toggleLimitUI, showWarning } from "./limit.js";
import "./theme.js";

characterCount.textContent = "00";
wordCount.textContent = "00";
sentenceCount.textContent = "00";

textareaContent.addEventListener("input", () => {
  let inputValue = textareaContent.value;

  btn.style.display = inputValue.length === 0 ? "none" : "block";

  handleCharacterLimit(textareaContent);

  wordCounter(inputValue);
  characterCounter(inputValue);
  sentenceCounter(inputValue);
  readingTimeCounter(parseInt(wordCount.textContent));
  eachLetterLength(inputValue);

  showWarning(textareaContent);
});

limitCheckbox.addEventListener("click", toggleLimitUI);

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
