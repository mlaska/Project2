//Get ingredients info from seperate database
function findIngredients(varZ)
{
  //List of ingredients from recipe Object(varZ from optionChanged function)
  recipeList = varZ.recipe.ingredientLines;

  console.log("findIngredients list", recipeList);

  //Empty list of dictionaries to store ingredients' nutrition data
  ingDict = [];

  d3.json("data/sample_ingredients.json").then((data) => {
    
    //Loops through each ingredient in recipeList, finds recipe in ingredient database,
    //  adds ingredient nutrition object to list ingDict
    dataArray = data.hits
    for(i=0; i < recipeList.length; i++) {

      var data_filter = dataArray.filter( element => element.name ==recipeList[i])
      ingDict.push(data_filter);
    }
    
    console.log("findIngredients ingDict", ingDict);
    createI_Charts(ingDict);
    });
}; 

function createI_Charts(aa)
{
calorieList = []; 
      for(i=0; i <aa.length; i++) {
        var calL = aa[i][0].info.calories
            calorieList.push(calL)      
      }
console.log(calorieList)

// calorieIngr = [];
//       for(i=0; i <aa.length; i++) {
//         var calL = aa[i][0].info
//             calorieList.push(calL)      
//       }
// console.log(calorieIngr)
var bubble_chart = {

  mode: "markers",
  // x: otu_ids,
  y: calorieList,
  text: calorieList, 
  marker: {color: calorieList, colorscale: "Jet", size: calorieList}

};

var bubble_data = [bubble_chart];

var bubble_layout = {
    title: "Calories per ingredients", 
    margin: {t : 0}, 
    hovermode: "closets",
    xaxis: { title: "OTU ID"}, 
    margin: {t : 30}
};

Plotly.newPlot("bubble", bubble_data, bubble_layout);
}