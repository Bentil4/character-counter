import {
  characterCount,
  wordCount,
  sentenceCount,
  readingTime,
} from "./dom.js";

export function getElement(selectorName, type) {
  switch (type) {
    case "id":
      return document.getElementById(selectorName);
    case "class":
      return document.getElementsByClassName(selectorName);
    case "tag":
      return document.getElementsByTagName(selectorName);
  }
}

export function characterCounter(text) {
  let addSpaces = getElement("space", "id");
  let count = addSpaces.checked ? text.length : text.replace(/\s+/g, "").length;
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
