def RecipeCall(SearchCategory,SearchWord,SearchText):
    # Dependencies and Setup
    import matplotlib.pyplot as plt
    import pandas as pd
    import numpy as np
    import requests
    import json
    import glob
    import time
    import os
    import re
    import string

    #API key to be hard coded for now
    #need to put together a config file call to pull from the api
    API = '914b095712bc8014add64f6b91a5b030'
    ApiId = 'd6f4ebaf' #recipe search
    url = f'https://api.edamam.com/search?q={SearchText}&app_id={ApiId}&app_key={API}&from=0&to=100&{SearchCategory}={SearchWord}'
    WhereToStore = 'recipe'
    #access the API and pull data from the URL
    response = requests.get(url).json()
    #Set the valid characters that can be used to name the file
    valid_chars = "%s%s" % (string.ascii_letters, string.digits)
    for recipe in range(len(response['hits'])):
        LongName = response['hits'][recipe]['recipe']['label']
        ShortName = ''.join(c for c in LongName if c in valid_chars)
        file_path = f'./{WhereToStore}/{ShortName}.json'
        directory = os.path.dirname(file_path)
        if not os.path.exists(directory):
            os.makedirs(directory)
        with open(file_path, 'w') as outfile:
            json.dump(response['hits'][recipe], outfile, indent= 2)  
    #merge all the recipes in the root folder into a master recipe file that can be used by the website
    FinalFilePath = './data/AllRecipes.json' #name the folder where the final 
    result = []
    for f in glob.glob(f"./{WhereToStore}/*.json"):
        with open(f, "rb") as infile:
            result.append(json.load(infile))
    with open(FinalFilePath, "w") as outfile:
        json.dump(result, outfile, indent= 2)    
    return response     

def IngredientCall(Volume,Measure,Name,Orig_name):
    #Dependencies
    import re
    import os
    import string
    import glob
    import pandas as pd
    import numpy as np
    import requests
    import json
    import time
    
    #API key to be hard coded for now
    #need to put together a config file call to pull from the api
    ApiId = "909c74bc" #Ingredient search
    API = 'cbdda29b0c478cb89092c83451e89ed6'
    #Convert spaces to space character in ingredient searched
    Ingredient = f'{Volume} {Measure} {Name}'
    IngredientReplaceSpace = re.sub("\s+", "%20", Ingredient.strip())
    
    url = f"https://api.edamam.com/api/nutrition-data?app_id={ApiId}&app_key={API}&ingr={IngredientReplaceSpace}"
    WhereToStore = 'Ingredient'
    #access the API and pull data from the URL
    response = requests.get(url).json()
    #Set the valid characters that can be used to name the file
    valid_chars = "%s%s" % (string.ascii_letters, string.digits)
    
    LongName = Ingredient
    ShortName = ''.join(c for c in LongName if c in valid_chars)
    file_path = f'./{WhereToStore}/{ShortName}.json'
    directory = os.path.dirname(file_path)
    if not os.path.exists(directory):
        os.makedirs(directory)
    #Add the name of the ingredient Searched to the JSON file
    entry = {"name": LongName,
             "Volume": Volume,
             "Measure": Measure,
             "Name": Name,
             "Orig_name": Orig_name,
             "info": response}
    #Save the file
    with open(file_path, 'w') as outfile:
        json.dump(entry, outfile, indent= 2)  
    
    #merge all the recipes in the root folder into a master recipe file that can be used by the website
    #FinalFilePath = './data/AllIngredients.json' #name the folder where the final 
    #result = []
    #for f in glob.glob(f"./{WhereToStore}/*.json"):
    #    with open(f, "rb") as infile:
    #        result.append(json.load(infile))
    #with open(FinalFilePath, "w") as outfile:
    #    json.dump(result, outfile, indent= 2)    
    #return entry   