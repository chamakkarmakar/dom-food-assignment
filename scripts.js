const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const loadingSpinner = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const foodsContainer = document.getElementById("recipes");
const searchInput = document.getElementById("search-input");

// Fetch data
async function fetchData(searchMeal = "") {
  try {
    const response = await fetch(url + searchMeal);
    const data = await response.json();
    // console.log(data.meals);

    if (!response.ok) {
      throw new Error("Failed to fetch data from API");
    }
    loadingSpinner.style.display = "none";

    // Process and display the data
    if (data.meals && data.meals.length > 0) {
      displayMeals(data.meals);
    } else {
      errorDiv.textContent = searchMeal
        ? `No meals found for "${searchMeal}" `
        : "No meals found";
      foodsContainer.innerHTML = "";
      errorDiv.classList.remove("hidden");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
fetchData();

// Display Meals
function displayMeals(meals) {
  foodsContainer.innerHTML = "";
  errorDiv.classList.add("hidden");
  meals.forEach((meal) => {
    const mealDiv = document.createElement("div");
    mealDiv.classList.add(
      "bg-white",
      "rounded-lg",
      "shadow-lg",
      "overflow-hidden",
      "hover:shadow-xl",
      "transition-shadow"
    );
    mealDiv.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${
      meal.strMeal
    }" class="w-full h-48 object-cover">
                <div class="p-5">
                    <h3 class="text-xl font-bold text-gray-800 mb-2">${
                      meal.strMeal.toUpperCase()
                    }</h3>
                    <p class="text-gray-600 text-sm mb-5">${meal.strInstructions.substring(
                      0,
                      100
                    )}...</p>
                     <div class="flex justify-end">
                <button id="btnDetails" onclick="showMealDetails('${
                      meal.idMeal
                    }')" 
                class="w-[60%] rounded-lg py-2 font-medium text-orange-400 shadow-[0px_0px_10px_#E2DADA] duration-500 hover:scale-95 hover:bg-orange-500 hover:text-white hover:shadow-xl cursor-pointer dark:shadow-[0px_2px_8px_0px_rgba(0,0,0,0.8)]">
                    View Details
                </button>
            </div>
                </div>
        `;
    foodsContainer.appendChild(mealDiv);
  });
}

// Search meals function
function searchMeals() {
  const query = searchInput.value.toLowerCase().trim();
  fetchData(query);
}

// Show Modal
async function showMealDetails(mealId) {
  // console.log(mealId);
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalContent = document.getElementById("modal-content");

  modal.classList.remove("hidden");
  modalContent.innerHTML =
    '<div class="flex justify-center items-center py-12"></div>';

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    const data = await response.json();
    const meal = data.meals[0];

    modalTitle.textContent = meal.strMeal.toUpperCase();

    modalContent.innerHTML = `
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full rounded-lg shadow-lg">
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-gray-800 mb-3">Instructions</h3>
                            <p class="text-gray-700 leading-relaxed whitespace-pre-line">${meal.strInstructions}</p>
                        </div>
                    </div>
                 `;
  } catch (error) {
    modalContent.innerHTML = `<p class="text-red-600 text-center py-12">Error loading meal details: ${error.message}</p>`;
  }
}

// Close modal
function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

// Scroll to top functionality
const scrollTopBtn = document.getElementById("scroll-top-btn");

// Show/hide scroll button based on scroll position
window.addEventListener("scroll", function () {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.remove("hidden");
  } else {
    scrollTopBtn.classList.add("hidden");
  }
});

// Smooth scroll to top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
