console.log("--Recipe check from sample_data.js--")
console.log(data.hits[1].recipe.label)
console.log(data.hits[1].recipe.ingredientLines)

console.log("--Ingr check from sample_ingredients.js--")
console.log(data_i.hits[0].name)

var kCal = data_i.hits[0].info.totalNutrientsKCal.ENERC_KCAL.quantity
var kCalUnit = data_i.hits[0].info.totalNutrientsKCal.ENERC_KCAL.unit
console.log(`${kCal} ${kCalUnit}`)
