import { fetchDataFromServer } from "./api.js";

document.getElementById("loading").classList.add("active");

function showMeal() {
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

fetchDataFromServer(
  "https://www.themealdb.com/api/json/v1/1/categories.php",
  function (data) {
    const contentSection = document.querySelector(".container.categories");

    for (const meal of data.categories) {
      const {
        idCategory: id,
        strCategory: name,
        strCategoryThumb: img,
        strCategoryDescription: description,
      } = meal;

      const boxContent = document.createElement("a");
      boxContent.classList.add("box");
      boxContent.setAttribute("href", "meal-list.html");

      boxContent.style.cssText =
        "border-radius: 8px; overflow: hidden; position: relative; cursor: pointer;";

      boxContent.innerHTML = `
      <img src="${img}" alt="" />
      <div class="text-info">${name}<p>${description}</p></div>
      `;

      boxContent.addEventListener("click", () => {
        localStorage.setItem("categoryName", name);
      });

      contentSection.appendChild(boxContent);

      document.getElementById("loading").classList.remove("active");
    }
  }
);
