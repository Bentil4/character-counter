import { characterCount, wordCount, sentenceCount } from "./dom.js";

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
  if (addSpaces.checked) {
    characterCount.textContent = text.length;
  } else {
    characterCount.textContent = text.replace(/\s+/g, "").length;
  }
}

export function wordCounter(text) {
  let words = text
    .trim()
    .split(/\s+/)
    .filter((word) => word !== "");
  wordCount.textContent = words.length;
}

export function sentenceCounter(text) {
  let sentences = text.split(/[.!?]+/).filter((space) => space.trim() !== "");
  sentenceCount.textContent = sentences.length;
}
