
//Define funtion to display charts
//work in progress - this code needs to be built upon to generate the charts
function createCharts (recipe) {
  d3.json("data/AllRecipes.json").then((data) => {
    var hits = data;
    var recipe_names = data.map(l => l.recipe.label);
    var ingredientsList = data.map(l => l.recipe.ingredientLines);

    console.log(recipe_names);
    console.log(ingredientsList);
    } 
)}; 




//Define what happens when a recipe is selected from the dropdown
function optionChanged(recipe)
{
  console.log("dropdown selection", recipe);
  //createCharts(recipe);
  //createIngredients(recipe);
  //createGaugeCharts(recipe);
}

//Initialize Page
//Function to initialize the dropdown 
function displayPage()
{
  console.log("Load Page")
  //Dropdown select recipe
  var selector = d3.select("#selDataset");

  //Populate the dropdown list
  d3.json("data/AllRecipes.json").then((data)=> {
    var hits = data;
    var recipe_names = data.map(l => l.recipe.label);
    console.log(recipe_names);
    recipe_names.forEach(recipe => {
      selector.append("option").text(recipe).property("value", recipe);
    });
    
    var firstrecipe = recipe_names[0];
    createCharts(firstrecipe);
    //createIngredients(firstrecipe);
    //createGaugeCharts(firstrecipe);
  });

}
//Display page when page loads
displayPage();