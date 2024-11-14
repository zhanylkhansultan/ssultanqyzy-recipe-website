const hamburger = document.querySelector('.hamburger');

const navMenu = document.querySelector('.menu');
const recipeBtn = document.querySelector('see__recipe');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active')
})

const input = document.getElementById('site-search');
const mealList = document.getElementById('meal');
const mealDetailsContent =document.querySelector('.recipe__section');

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      getMealList()
    }  });

    function getMealList() {
        let searchInputTxt = document.getElementById('site-search').value.trim();
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                    
                    <div class="card" data-id = "${meal.idMeal}">
                        <img src="${meal.strMealThumb}" alt="Waffles">
                        <div class="card__descr">
                            <h2>${meal.strMeal}</h2>
                            <button class="see__recipe">See recipe</button>
                        </div>
                    </div>
                    `;
                });
                mealList.classList.remove('notFound');
            }
            
            else{
                html = "Sorry, we didn't find any meal!";
                mealList.classList.add('notFound');
            }
            mealList.innerHTML = html;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
    }
    


    function getMealRecipe(e){
        e.preventDefault();
        if(e.target.classList.contains('recipe-btn')){
            let mealItem = e.target.parentElement.parentElement;
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => mealRecipeModal(data.meals));
        }
    }
    function mealRecipeModal(meal){
        console.log(meal);
        meal = meal[0];
        let html = `
        <section class="recipe__section">
    <section class="main recipe__main">
        <div class="descr">${meal.strMeal}</div>
    </section>
    <section class="recipe">
        <div class="recipe__wrapper">
                <h3>Ingredientes</h3>
                <ul>
                    <li>1 e 1/2 xícaras de farinha de trigo</li>
                    <li>3 colheres de sopa de açúcar</li>
                    <li>1 colher de sopa de fermento em pó</li>
                    <li>1/2 colher de chá de sal</li>
                    <li>1 e 1/4 xícaras de leite</li>
                    <li>1 ovo</li>
                    <li>3 colheres de sopa de manteiga derretida</li>
                    <li>Óleo vegetal (para untar a frigideira)</li>
                    <li>Coberturas a gosto (xarope de bordo, frutas frescas, chantilly, etc.)</li>
                </ul>
            
                <h3>Modo de Preparo</h3>
                <ol>
                    ${meal.strInstructions}                
                </ol>
            
        </div>
    </section>
</section>
        `;
        mealDetailsContent.innerHTML = html;
        mealDetailsContent.parentElement.classList.add('showRecipe');
    }