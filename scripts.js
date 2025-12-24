const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const loadingSpinner = document.getElementById ('loading');
const errorDiv = document.getElementById ('error');
const foodsContainer = document.getElementById ('recipes');

// Fetch data 
async function fetchData (searchMeal = '') {

    try {
        const response = await fetch(url + searchMeal);
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
             errorDiv.textContent = searchMeal 
            ? `No meals found for "${searchMeal}". Try a different search term.`
            : 'No meals found';
            errorDiv.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
fetchData();

// Display Meals
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
                    <button id="btnDetails" onclick="showMealDetails('${meal.idMeal}')" class="bg-orange-400 hover:bg-orange-500 text-white font-semibold py-1 px-5 rounded transition-colors cursor-pointer text-right" >VIEW DETAILS</button>
                    </div>
                </div>
        `;
        foodsContainer.appendChild (mealDiv);
    });
}

// Show Modal 
async function showMealDetails(mealId) {
            // console.log(mealId);
            const modal = document.getElementById('modal');
            const modalTitle = document.getElementById('modal-title');
            const modalContent = document.getElementById('modal-content');
            
            modal.classList.remove('hidden');
            modalContent.innerHTML = '<div class="flex justify-center items-center py-12"></div>';
            
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
                const data = await response.json();
                const meal = data.meals[0];
                
                modalTitle.textContent = meal.strMeal;
                
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
    document.getElementById('modal').classList.add('hidden');
}

        // Scroll to top functionality
        const scrollTopBtn = document.getElementById('scroll-top-btn');
        
        // Show/hide scroll button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.remove('hidden');
            } else {
                scrollTopBtn.classList.add('hidden');
            }
        });
        
        // Smooth scroll to top
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

