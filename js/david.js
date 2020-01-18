//Initialize Page
function displayPage()
{
  console.log("Load Page")
  //Dropdown select recipe
  var selector = d3.select("#selDataset");
  
  //Populate the dropdown list ***I changed "value" field to be index number
  d3.json("data/sample_data.json").then((data)=> {
    
    var recipe_names = data.hits.map(l => l.recipe.label);
    
    recipe_names.forEach(function(d,i) {
      selector.append("option")
      .text(d)
      .property("value", i);
    });

    //Call chart and ingredients functions on initial data 
    //(can randomize later, instead of using index 0)
    var firstrecipeDict = data.hits[0];
    createCharts(firstrecipeDict);
    createIngredients(firstrecipeDict);
    findIngredients(firstrecipeDict);
    createGaugeCharts(firstrecipeDict);
  });

}

//Define funtion to display charts
function createCharts (varX) {

    console.log("createCharts variable ",varX);
}; 

function createIngredients (varY) {
  
  //List of ingredients pulled from varY object (varY passed from objectChanged function)
  var list = varY.recipe.ingredientLines;

  console.log("Cindy's recipe in drop down")
  console.log(varY.recipe.label);

  //Create Ingredients List, adjust length based on list variable
  //enter append merge exit remove
  var PANEL = d3.select("#sample-metadata")
            .selectAll("h6")
            .data(list);

  PANEL.enter()
       .append("h6")
       .merge(PANEL)
       .text(function(d) {
            return d;});

  PANEL.exit()
       .remove();

}   
  
// Call optionChanged() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", optionChanged);

//Define optionChange to like to html file
function optionChanged()
{
  //recipeIndex == dropdown index
  var recipeIndex = d3.select("#selDataset").property("value"); 
  console.log("dropdown selection", recipeIndex);
  
  //read from recipe database and return the one recipe object(dictionary)
  d3.json("data/sample_data.json").then((data)=> {
      
    var recipeObject = data.hits[recipeIndex];

  createCharts(recipeObject);
  createIngredients(recipeObject);
  findIngredients(recipeObject);
  createGaugeCharts(recipeObject);
  
  });
}

//Display page when page loads
displayPage();