
//Difine funtion to display charts
function createNutrInfo (recipe) {
  d3.json("data/sample_data.json").then((data) => {
    var hits = data.hits;
    var labels = data.hits.map(x => x.recipe.label);

    console.log(labels);

  } 
)}; 

  


//Define optionChange to like to html file
function optionChanged(recipe)
{
  console.log("dropdown selection", recipe);
  //createCharts(recipe);
  createNutrInfo(recipe);
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
    var recipeNames = data.hits;
    console.log(recipeNames);
    recipeNames.forEach(recipe => {
      selector.append("option").text(recipe).property("value", recipe);
    });
    
    var firstrecipe = recipeNames[0];
    //createCharts(firstrecipe);
    createNutrInfo(firstrecipe);
    //createGaugeCharts(firstrecipe);
  });

}
//Display page when page loads
displayPage();