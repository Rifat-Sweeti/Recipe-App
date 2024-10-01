const API_KEY = '2fb0bab3d2464c7991fedab3a03bf80b';
        const BASE_URL = 'https://api.spoonacular.com/recipes/complexSearch';

        const searchInput = document.getElementById('search-input');
        const searchButton = document.getElementById('search-btn');
        const recipeContainer = document.getElementById('recipe-container');
        const noResultsDiv = document.getElementById('no-results');
        const errorDiv = document.getElementById('error');

        searchButton.addEventListener('click', () => {
            const query = searchInput.value;
            if (query) {
                fetchRecipes(query);
            }
        });

        async function fetchRecipes(query) {
            try {
                const response = await fetch(`${BASE_URL}?query=${query}&apiKey=${API_KEY}`);
                const data = await response.json();
                
                if (data.results.length === 0) {
                    displayNoResults();
                } else {
                    displayRecipes(data.results);
                }
            } catch (error) {
                console.error('Error fetching recipes:', error);
                displayError();
            }
        }

        function displayRecipes(recipes) {
            recipeContainer.innerHTML = '';
            noResultsDiv.style.display = 'none';
            errorDiv.style.display = 'none';

            recipes.forEach(recipe => {
                const recipeCard = document.createElement('div');
                recipeCard.classList.add('recipe-card');

                recipeCard.innerHTML = `
                    <img src="${recipe.image}" alt="${recipe.title}">
                    <h3>${recipe.title}</h3>
                    <a href="https://spoonacular.com/recipes/${recipe.title}-${recipe.id}" target="_blank">View Recipe</a>
                `;

                recipeContainer.appendChild(recipeCard);
            });
        }

        function displayNoResults() {
            recipeContainer.innerHTML = '';
            noResultsDiv.textContent = 'No recipes found. Try a different search term!';
            noResultsDiv.style.display = 'block';
        }

        function displayError() {
            recipeContainer.innerHTML = '';
            errorDiv.textContent = 'There was an error fetching the recipes. Please try again later.';
            errorDiv.style.display = 'block';
        }