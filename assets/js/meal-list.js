import { fetchDataFromServer } from "./api.js";
import { showMeal } from "./global.js";

document.getElementById("loading").classList.add("active");

let getCategoryName = localStorage.getItem("categoryName");
let categoryKind = localStorage.getItem("categoryKind");

fetchDataFromServer(
  `https://www.themealdb.com/api/json/v1/1/filter.php?${categoryKind}=${getCategoryName}`,
  function (data) {
    const contentSection = document.querySelector(".container.categories");

    for (const meal of data.meals) {
      const { idMeal: id, strMeal: name, strMealThumb: img } = meal;

      const boxContent = document.createElement("a");
      boxContent.classList.add("box");
      boxContent.setAttribute("href", "detail.html");

      boxContent.style.cssText =
        "border-radius: 8px; overflow: hidden; position: relative; cursor: pointer;";

      boxContent.innerHTML = `
      <img src="${img}" alt="" />
      <div class="text-info" style="display: flex; align-items: center; justify-content: center;">${name}</div>
      `;

      boxContent.addEventListener("click", function () {
        localStorage.setItem("mealId", id);
      });

      contentSection.appendChild(boxContent);

      document.getElementById("loading").classList.remove("active");
    }
  }
);
