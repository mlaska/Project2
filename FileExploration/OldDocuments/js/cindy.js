
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
    var firstrecipeDict = hits[0];
    createCharts(firstrecipe);
    createIngredients(firstrecipeDict);
    //createGaugeCharts(firstrecipe);
  });

}

//Define funtion to display charts
function createCharts (recipe) {
  d3.json("data/sample_data.json").then((data) => {
    var hits = data.hits;
    var recipe_names = data.hits.map(l => l.recipe.label);
    // var ingredientsList = data.hits.map(l => l.recipe.ingredientLines);
    console.log("create charts func")
    console.log(recipe_names);
    // console.log(ingredientsList);
   


  } 
)}; 

function createIngredients (recipe) {
  console.log("Cindy's recipe in drop down")
  console.log(recipe);

  d3.json("data/sample_data.json").then((data) => {
    var hits = data.hits;

    var ingredientsArray = data.hits.map(l => l.recipe.ingredientLines);
    var ingredients = ingredientsArray[0];
    console.log(ingredients);

      var PANEL = d3.select("#sample-metadata");
      PANEL.html("");
        
      Object.entries(ingredients).forEach(([key,value]) => {
          var textToShow = `${value}`;
          PANEL.append("h6").text(textToShow);
         
    });

    });


// function createIngredients (recipe) {
//   console.log(recipe);
//   // d3.json("data/sample_data.json").then((data) => {
//     // var hits = data.hits;

//     // var ingredientsArray = data.hits.map(l => l.recipe.ingredientLines);
//     var ingredientsArray = recipe.recipe.ingredientLines;
//     // var ingredients = ingredientsArray[0];
//     console.log(ingredientsArray);

//       var PANEL = d3.select("#sample-metadata");
//       PANEL.html("");
        
//       Object.entries(ingredientsArray).forEach(([key,value]) => {
//           var textToShow = `${value}`;
//           PANEL.append("h6").text(textToShow);
         
//     });

}   
    
//Define optionChange to like to html file
function optionChanged(recipe)
{
  console.log("dropdown selection", recipe);
  createCharts(recipe);
  console.log("run second func")
  createIngredients(recipe);
  //createGaugeCharts(recipe);
}

//Display page when page loads
displayPage();