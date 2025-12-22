const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const loadingSpinner = document.getElementById ('loading');
const errorDiv = document.getElementById ('error');
const foodsContainer = document.getElementById ('recipes');

async function fetchData () {
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.meals);

        if(!response.ok) {
            throw new Error ('Failed to fetch data from API');
        }
        loadingSpinner.style.display  = 'none';

        // Process and display the data 
        if (data.meals && data.meals.length > 0) {
            displayMeals(data.meals);
        } else {
            errorDiv.classList.remove('hidden');
            // errorDiv.innerText  = 'No meals found.';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
fetchData();
function displayMeals (meals) {
    meals.forEach (meal => {
        const mealDiv = document.createElement ('div');
        mealDiv.classList.add ('bg-white', 'rounded-lg', 'shadow-lg', 'overflow-hidden', 'hover:shadow-xl', 'transition-shadow');
        mealDiv.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full h-48 object-cover">
                <div class="p-5">
                    <h3 class="text-xl font-bold text-gray-800 mb-2">${meal.strMeal}</h3>
                    <p class="text-gray-600 text-sm mb-5">${meal.strInstructions.substring(0, 70)}...</p>
                    <div class="flex justify-end">
                    <button id="btnDetails" class="bg-orange-400 hover:bg-orange-500 text-white font-semibold py-1 px-5 rounded transition-colors cursor-pointer text-right" >VIEW DETAILS</button>
                    </div>
                </div>
        `;
        foodsContainer.appendChild (mealDiv);
    });
}