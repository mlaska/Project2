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
    createIngredientsEdit(ingDict);
    
    return ingDict;
    });
}; 



function createIngredientsEdit(aa)
{
  //Ingredient list with key value pairs "name" : name, "weight": weight 
  var listToBeMade = [];
  // var firstMultiplyer = [];

  for(i=0; i < aa.length; i++) {
    
    var loopDict = {"name": aa[i][0].name, "weight": aa[i][0].info.totalWeight}
    listToBeMade.push(loopDict);

    // firstMultiplyer.push(1);

  };

  //enter update exit to populate Ingredient Info table (with text boxes!)
  PANEL = d3.select("#ingredient-metadata").selectAll("form")
            .data(listToBeMade);


  PANEL.enter()
  .append("form")
  .merge(PANEL)
  .each(function(d,i) {
    SUBPANEL = d3.select(this);
    
    SUBPANEL.enter().append("h6")
    .merge(SUBPANEL)
    .text(d.name);
    
    SUBPANEL.exit()
    .remove();
    
    SUBPANEL.append("input")
    .merge(SUBPANEL)
    .attr("class", "form-control")
    .attr("id", i) 
    .attr("name", "ingredient-form")
    .attr("type", "text")
    .attr("value", d.weight);

    SUBPANEL.exit()
    .remove();
    
    });
  PANEL.exit()
  .remove();

  origInputs = [];
    $("input[name='ingredient-form']").each(function() {
    origInputs.push($(this).val());
    });
  console.log("origInputs ", origInputs);
  
  
  createI_Charts(aa, origInputs, origInputs);

  // Call optionChanged() when a change takes place to the DOM
  d3.selectAll("#button").on("click", ingredientChanged);

  function ingredientChanged()
  {
    //JQuery!!!
    // var data = $('input[name="ingredient-form"]').serialize();
    // console.log(data);

    inputs = [];
    $("input[name='ingredient-form']").each(function() {
    inputs.push($(this).val());
    });
    console.log("inputs",inputs);
    console.log("origI", origInputs);
    
    createI_Charts(aa, origInputs, inputs);
  };
};


//Generate "change bubble plot" buttons
var buttonList = ["Calories", "Fat", "Protein", "Sodium"];

{/* <button id="button" type="button" class="btn btn-default">Update Ingredient Amounts</button> */}
d3.select("#buttons").selectAll("button")
  .data(buttonList)
  .enter()
  .append("button")
  .attr("id", "button")
  .attr("type", "button")
  .attr("class", "btn btn-default")
  .attr("name", "graph buttons")
  .property("value", function(d){return d;})
  .text(function(d){return d;})
  .exit()
  .remove();

  

function createI_Charts(aa, grams, newgrams)  //(ingredients Object, initial grams list, new grams list)
{

  nameList = [];
  calorieInit = []; 
  multiplier = [];
        for(i=0; i <aa.length; i++) {
          var calD = aa[i][0].info.calories;
              calorieInit.push(calD);
          var name = aa[i][0].name;
              nameList.push(name); 
          if (grams[i] != 0)  {  
          var x = newgrams[i]/grams[i];
          multiplier.push(x);
          }
          else {multiplier.push(1);}
        }

  console.log(calorieInit);
  console.log("multiplier ", multiplier)
  //Adjusts calories based on User updated ingredient amounts


  calorieList = [];
  for (i=0; i <calorieInit.length; i++){
    var x = calorieInit[i]*multiplier[i];
    calorieList.push(x);
  }
  console.log(calorieList);
  
  var bubble_chart = {
      
    mode: "markers",
    x: nameList,
    y: calorieList,
    // text: calorieList, 
    marker: {color: nameList, colorscale: "Jet", size: calorieList}
  
  };
  
  var bubble_data = [bubble_chart];
  
  var bubble_layout = {
      title: "Ingredient Calories", 
      margin: {t : 0}, 
      hovermode: "closets",
      xaxis: { title: "Ingredients"}, 
      margin: {t : 30}
  };
  
  Plotly.newPlot("bubble", bubble_data, bubble_layout);
 
  
return multiplier, nameList;
 
}

 //Change graph if button pushed
  // d3.selectAll("#buttons").on("click", graphicChanged(this.value));

  function graphicChanged(value) {

    
    console.log("buttons", event.target.value);

    
    var calList = [];
    var protList = [];
    var fatList = [];
    var sodList = [];
    var newList = [];
  
    for(i=0; i <ingDict.length; i++) {
      try {
      var cal = ingDict[i][0].info.totalNutrients.ENERC_KCAL.quantity;
      calList.push(cal);
      
      }
      catch(err) {
        console.log("error in Calories for ",ingDict[i][0].name, err);
        calList.push(0);
      }
      try {
        var prot = ingDict[i][0].info.totalNutrients.PROCNT.quantity;
        protList.push(prot);
        
        }
        catch(err) {
          console.log("error in Protein for ",ingDict[i][0].name, err);
          protList.push(0);
        }
        try {
          var fat = ingDict[i][0].info.totalNutrients.FAT.quantity;
          fatList.push(fat);
          
          }
          catch(err) {
            console.log("error in Fat for ",ingDict[i][0].name, err);
            fatList.push(0);
          }
        try {
          var sod = ingDict[i][0].info.totalNutrients.NA.quantity;
          sodList.push(sod);
          
          }
          catch(err) {
            console.log("error in Sodium for ",ingDict[i][0].name, err);
            sodList.push(0);
          }
    }

      
      
    console.log("lists", calList, protList, fatList, sodList);
    var buttonValue = event.target.value;
  //   "Calories", "Fat", "Protein", "Sodium"
  //   switch(buttonValue) {

  //     case 1:
  //       buttonValue == "Calories";
  //       newList = calList;
  //       break;

  //     case 2:
  //       buttonValue == "Fat";
  //       newList = fatList;
  //       break;
      
  //     case 3:
  //       buttonValue == "Protein";
  //       newList = protList;
  //       break;

  //     case 4:
  //       buttonValue == "Sodium";
  //       newList = sodList;
  //       break;

  //     default:
  //       console.log("Bad button, no nutrition data to graph");
  //   }

  //   by = newList;
    
  //   bmarker = { color: nameList,
  //                size: newList};  


  
  // Plotly.restyle("bubble", "y", [by]);
  
  // Plotly.restyle("bubble", "marker", [bmarker]);

  }

