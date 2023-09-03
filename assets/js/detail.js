import { fetchDataFromServer } from "./api.js";
import { showMeal } from "./global.js";

document.getElementById("loading").classList.add("active");

let getId = localStorage.getItem("mealId");

fetchDataFromServer(
  `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${getId}`,
  function (data) {
    for (const meals of data.meals) {
      const {
        strMeal: name,
        strCategory: category,
        strInstructions: instructions,
        strMealThumb: img,
        strTags,
        strYoutube: linkYoutube,
        strSource,
        strArea,
      } = meals;

      const detailsSection = document.querySelector(".details.container");

      detailsSection.innerHTML = `
        <div class="img">
          <img src="${img}" alt="" />

            <h3>${name}</h3>
          </div>
          <div class="text">
            <h2>Instructions</h2>
            <p>${instructions}</p>

            <div class="info">
              <h3>Area : ${strArea}</h3>
              <h3>Category : ${category}</h3>
            </div>

            <div class="recipes">
              <h3>Recipes :</h3>
              <div class="info">
                <ul>
                  <li>
                    <span>1 cup Lentils</span>
                  </li>
                  <li>
                    <span>1 cup Lentils</span>
                  </li>
                  <li>
                    <span>1 cup Lentils</span>
                  </li>
                  <li>
                    <span>1 cup Lentils</span>
                  </li>
                  <li>
                    <span>1 cup Lentils</span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="tags">
              <h3>Tags :</h3>
              

              <div class="link-info">
                <a href="${strSource}" target='_blank'>Source</a>
                <a href="${linkYoutube}" target='_blank'>Youtube</a>
              </div>
            </div>
          </div>
      `;

      if (strTags != null) {
        for (let i = 0; i < strTags.split(",").length; i++) {
          let span = document.createElement("span");

          span.innerHTML = strTags.split(",")[i];

          detailsSection
            .querySelector(".text .tags")
            .firstElementChild.appendChild(span);
        }
      }

      document.getElementById("loading").classList.remove("active");
    }
  }
);
