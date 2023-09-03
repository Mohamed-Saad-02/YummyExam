import { fetchDataFromServer } from "./api.js";
import { showMeal } from "./global.js";

document.getElementById("loading").classList.add("active");

fetchDataFromServer(
  `https://www.themealdb.com/api/json/v1/1/search.php?s=`,
  function (data) {
    const contentSection = document.querySelector(".container.categories");

    for (const food of data.meals) {
      const { idMeal: id, strMeal: name, strMealThumb: img } = food;

      const meal = document.createElement("a");
      meal.classList.add("box");
      meal.setAttribute("href", "detail.html");

      meal.innerHTML = `
      <img src="${img}" alt="${name}" />
      <div class="text-info">${name}</div>
      `;

      meal.lastElementChild.style.cssText =
        "display: flex; align-items: center;";

      meal.onclick = (e) => {
        localStorage.setItem("mealId", id);
      };

      document.querySelector(".loading").classList.remove("active");

      contentSection.appendChild(meal);
    }
  }
);
