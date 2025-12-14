import {
  characterCount,
  wordCount,
  sentenceCount,
  readingTime,
  addSpaces,
} from "./dom.js";

export function characterCounter(text) {
  let excludeSpaces = addSpaces;
  let count = excludeSpaces.checked
    ? text.replace(/\s+/g, "").length
    : text.length;
  characterCount.textContent = count.toString().padStart(2, "0");
}

export function wordCounter(text) {
  let words = text
    .trim()
    .split(/\s+/)
    .filter((word) => word !== "");
  wordCount.textContent = words.length.toString().padStart(2, "0");
}

export function sentenceCounter(text) {
  let sentences = text.split(/[.!?]+/).filter((space) => space.trim() !== "");
  sentenceCount.textContent = sentences.length.toString().padStart(2, "0");
}

export function readingTimeCounter(wordCount) {
  if (wordCount === 0) {
    readingTime.textContent = "Approx. reading time: < 1 minute";
  } else {
    let minutes = Math.ceil(wordCount / 200);
    readingTime.textContent = `Approx. reading time: ${minutes} minute${
      minutes > 1 ? "s" : ""
    }`;
  }
}
