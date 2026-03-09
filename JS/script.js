async function getRecipes() {

    const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;

    const response = await fetch(URL);
    const data = await response.json();

    displayRecipes(data.meals.slice(0,6)); 
}

async function getRandomMeal() {
    const URL = `https://www.themealdb.com/api/json/v1/1/random.php`;

    const response = await fetch(URL);
    const data = await response.json();

    const meal = data.meals[0];

    displayMeal(meal);
}

function displayRecipes(recipes) {

    let recipeContent = document.querySelector(".recipe .recipe-content");

    recipeContent.innerHTML = "";

    recipes.forEach(recipe => {

        const poster = recipe.strMealThumb;

        let div = document.createElement("div");
        div.classList.add("recipe-content-div");

        let img = document.createElement("img");
        img.classList.add("recipe-content-img");
        let type = document.createElement("p");
        type.classList.add("recipe-content-type");
        let food = document.createElement("h2");
        food.classList.add("recipe-content-food");
        let category = document.createElement("p");
        category.classList.add("recipe-content-category");

        img.src = poster;
        food.textContent = recipe.strMeal;
        type.textContent = recipe.strArea; 
        category.textContent = recipe.strCategory;

        div.append(img);
        div.append(type);
        div.append(food);
        div.append(category);

        recipeContent.append(div);
    });

}

function displayMeal(meal) {
    const container = document.querySelector(".static");

    let div = document.createElement("div");
    div.classList.add("static-div");

    let content = document.createElement("div");
    content.classList.add("static-div-content");
    
    let img = document.createElement("img");
    img.classList.add("static-img");
    
    let heading = document.createElement("h1");
    heading.classList.add("static-heading");

    let instruction = document.createElement("p");
    instruction.classList.add("static-instrction");

    let link = document.createElement("a");
    link.classList.add("static-anchor");

    container.append(div);
    content.append(heading);
    content.append(instruction);
    content.append(link);
    div.append(content);
    div.append(img);


    img.setAttribute("src", `${meal.strMealThumb}`);
    heading.textContent = `${meal.strMeal}`;

    if(meal.strInstructions.length<=800) {
        instruction.textContent = `${meal.strInstructions}`;
    }
    else {
        instruction.textContent = `${meal.strInstructions.slice(0,800)}`;
    }
    
    link.setAttribute("href", `${meal.strYoutube}`);
    link.textContent = "Recipe Tutorial";
    link.setAttribute("target", "_target");
}



getRecipes();
getRandomMeal();

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navbar-links");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("open");
        navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("open");
            navLinks.classList.remove("open");
        });
    });
}