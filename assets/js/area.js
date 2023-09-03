import { fetchDataFromServer } from "./api.js";
import { showMeal } from "./global.js";

document.getElementById("loading").classList.add("active");

fetchDataFromServer(
  `https://www.themealdb.com/api/json/v1/1/list.php?a=list`,
  function (data) {
    const containerCategory = document.querySelector(".container.categories");

    for (const meal of data.meals) {
      const { strArea: name } = meal;

      let boxContent = document.createElement("a");
      boxContent.classList.add("box");
      boxContent.setAttribute("href", "meal-list.html");

      boxContent.style.cssText +=
        "color: #fff; font-size: 26px; font-weight: bold; margin-bottom: 30px;";

      boxContent.innerHTML = `
        <i style="font-size: 40px;" class="fa-solid fa-house"></i>
        <p>${name}</p>
      `;

      boxContent.addEventListener("click", () => {
        localStorage.setItem("categoryName", name);
      });

      containerCategory.appendChild(boxContent);

      document.getElementById("loading").classList.remove("active");
    }
  }
);
