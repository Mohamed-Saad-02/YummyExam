import { fetchDataFromServer } from "./api.js";
import { showMeal } from "./global.js";

document.getElementById("loading").classList.add("active");

function getNameCategory(nameCategory) {
  window.localStorage.setItem("categoryName", nameCategory);
}

fetchDataFromServer(
  "https://www.themealdb.com/api/json/v1/1/list.php?i=list",
  function (data) {
    const contentSection = document.querySelector(".container.categories");

    for (let i = 0; i < data.meals.length; i++) {
      const {
        idIngredient: id,
        strIngredient: name,
        strDescription: description,
      } = data.meals[i];

      if (i < 16) {
        const boxContent = document.createElement("a");
        boxContent.classList.add("box");
        boxContent.setAttribute("href", "meal-list.html");

        boxContent.style.cssText = "color: #fff;";

        boxContent.innerHTML = `
          <i style="font-size: 68px;" class="fa-solid fa-drumstick-bite"></i>
          <div style = "font-size: 15px;"><h3 style="margin: 10px 0; font-size: 24px;">${name}</h3><p style="line-height: 1.7;">${
          description.split(".")[0]
        }</p></div>
        `;

        boxContent.addEventListener("click", () => {
          localStorage.setItem("categoryName", name);
        });

        contentSection.appendChild(boxContent);

        document.getElementById("loading").classList.remove("active");
      }
    }
  }
);
