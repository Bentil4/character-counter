import { theme, logo, body } from "./dom.js";

let savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  body.classList.add("light-theme");
  theme.src = "./assets/images/icon-moon.svg";
  logo.src = "./assets/images/logo-light-theme.svg";
} else {
  body.classList.add("dark-theme");
  theme.src = "./assets/images/icon-sun.svg";
  logo.src = "./assets/images/logo-dark-theme.svg";
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
