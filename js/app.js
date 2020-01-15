
//Difine funtion to display charts
function createCharts (recipe) {
  d3.json("data/sample_data.json").then((data) => {
    var hits = data.hits;
    var recipe_names = data.hits.map(l => l.recipe.label);
    var ingredientsList = data.hits.map(l => l.recipe.ingredientLines);

    console.log(recipe_names);
    console.log(ingredientsList);
   


  } 
)}; 




//Define optionChange to like to html file
function optionChanged(recipe)
{
  console.log("dropdown selection", recipe);
  createCharts(recipe);
  //createIngredients(recipe);
  //createGaugeCharts(recipe);
}

//Initialize Page
function displayPage()
{
  console.log("Load Page")
  //Dropdown select recipe
  var selector = d3.select("#selDataset");

  //Populate the dropdown list
  d3.json("data/sample_data.json").then((data)=> {
    var hits = data.hits;
    var recipe_names = data.hits.map(l => l.recipe.label);
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