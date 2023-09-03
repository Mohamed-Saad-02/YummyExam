"use strict";

import { fetchDataFromServer } from "./api.js";

searchNameAndLetter();

showMeal();

const aside = document.querySelector("aside");
const links = document.querySelectorAll("aside .content nav .links li");
const iconBars = document.querySelector("aside .content .logo .bars");

iconBars.addEventListener("click", (e) => {
  if (!aside.classList.contains("active")) {
    aside.classList.add("active");
    iconBars.classList.replace("fa-bars", "fa-xmark");

    links.forEach((li) => {
      li.style.top = "0";
    });
  } else {
    aside.classList.remove("active");
    iconBars.classList.replace("fa-xmark", "fa-bars");

    links.forEach((li) => {
      li.style.top = "300px";
    });
  }
});

// Search Container

const searchContainer = document.querySelector(".search.container");
const searchLink = document.querySelector(".search-link");

searchLink.addEventListener("click", (e) => {
  if (searchContainer.classList.contains("active")) {
    searchContainer.classList.remove("active");

    document.querySelector(".container.grid-system").style.display = "grid";
    document.querySelector("aside").classList.remove("active");
    iconBars.classList.replace("fa-xmark", "fa-bars");
  } else {
    searchContainer.classList.add("active");
    document.querySelector("aside").classList.remove("active");
    iconBars.classList.replace("fa-xmark", "fa-bars");
    document.querySelector(".container.grid-system").style.display = "none";
  }
});

function searchNameAndLetter() {
  const content = document.createElement("div");
  const input = document.querySelectorAll(".search.container form input");

  const searchNameElement = document.getElementById("search-name");
  const searchLetterElement = document.getElementById("search-letter");

  input.forEach((el) => {
    el.addEventListener("keydown", function (e) {
      document.getElementById("loading").classList.add("active-search");

      const searchContainer = document.querySelector(".search.container");

      content.classList.add("grid-system");

      searchContainer.appendChild(content);

      content.innerHTML = "";

      let searchTimeout;

      searchLetterElement.addEventListener("keydown", (e) => {
        if (searchLetterElement.value.length >= 1) {
          e.preventDefault();
        }
      });

      searchTimeout = setTimeout(function () {
        fetchDataFromServer(
          `${
            el.id == "search-name"
              ? "https://www.themealdb.com/api/json/v1/1/search.php?s=" +
                searchNameElement.value
              : "https://www.themealdb.com/api/json/v1/1/search.php?f=" +
                searchLetterElement.value
          }`,
          function (data) {
            content.innerHTML = "";

            for (const meal of data.meals) {
              const { idMeal: id, strMeal: name, strMealThumb: img } = meal;

              const box = document.createElement("a");
              box.classList.add("box");
              box.href = "detail.html";

              box.innerHTML = `
              <img src="${img}" alt="${name}" />
              <div class="text-info">${name}</div>
            `;

              box.lastElementChild.style.cssText =
                "display: flex; align-items: center;";

              box.onclick = (e) => {
                localStorage.setItem("mealId", id);
              };

              content.appendChild(box);

              document
                .getElementById("loading")
                .classList.remove("active-search");
            }
          }
        );
      }, 500);
    });
  });
}

export function showMeal() {
  const links = document.querySelectorAll(".links li a");

  links.forEach((el) => {
    el.addEventListener("click", (e) => {
      if (
        e.target.textContent.startsWith("A") ||
        e.target.textContent.startsWith("C") ||
        e.target.textContent.startsWith("I")
      ) {
        localStorage.setItem(
          "categoryKind",
          e.target.textContent.slice(0, 1).toLowerCase()
        );
      }
    });
  });
}

// reg expression

function validate() {
  if (nameValidate()) {
    document
      .getElementById("name")
      .nextElementSibling.classList.remove("active");
  } else {
    document.getElementById("name").nextElementSibling.classList.add("active");
  }

  if (emailValidate()) {
    document
      .getElementById("email")
      .nextElementSibling.classList.remove("active");
  } else {
    document.getElementById("email").nextElementSibling.classList.add("active");
  }

  if (phoneValidate()) {
    document
      .getElementById("phone")
      .nextElementSibling.classList.remove("active");
  } else {
    document.getElementById("phone").nextElementSibling.classList.add("active");
  }

  if (ageValidate()) {
    document
      .getElementById("age")
      .nextElementSibling.classList.remove("active");
  } else {
    document.getElementById("age").nextElementSibling.classList.add("active");
  }

  if (passwordValidate()) {
    document
      .getElementById("password")
      .nextElementSibling.classList.remove("active");
  } else {
    document
      .getElementById("password")
      .nextElementSibling.classList.add("active");
  }

  if (rePasswordValidate()) {
    document
      .getElementById("repassword")
      .nextElementSibling.classList.remove("active");
  } else {
    document
      .getElementById("repassword")
      .nextElementSibling.classList.add("active");
  }

  if (
    nameValidate() &&
    emailValidate() &&
    phoneValidate() &&
    ageValidate() &&
    passwordValidate() &&
    rePasswordValidate()
  ) {
    document.querySelector(".content form button").classList.add("active");
  } else {
    document.querySelector(".content form button").classList.remove("active");
  }
}

function nameValidate() {
  let check = /^[a-zA-Z ]+$/gi;
  const name = document.getElementById("name");

  return check.test(name.value);
}

function emailValidate() {
  let check =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi;

  const email = document.getElementById("email");

  return check.test(email.value);
}

function phoneValidate() {
  let check = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gi;
  const phone = document.getElementById("phone");

  return check.test(phone.value);
}

function ageValidate() {
  let check = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/gi;
  const age = document.getElementById("age");

  return check.test(age.value);
}

function passwordValidate() {
  let check = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/gi;
  const password = document.getElementById("password");

  return check.test(password.value);
}

function rePasswordValidate() {
  return (
    document.getElementById("password").value ===
    document.getElementById("repassword").value
  );
}

const input = document.querySelectorAll(".container.content");

input.forEach((el) => {
  el.addEventListener("input", (e) => {
    validate();
  });
});
