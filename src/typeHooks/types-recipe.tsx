interface RecipesNutritionFacts {
  carbohydrates: string;
  fats: string;
  protein: string;
}

export default interface Recipes {
  id: string;
  calories_per_serving: number;
  cook_time: string;
  cooking_level: string;
  country: string;
  description: string;
  id_: number;
  image: string;
  ingredients: string[];
  instructions: string[];
  name: string;
  nutrition_facts: RecipesNutritionFacts;
  servings: number;
  tags: string[];
}

interface IngredientsNutrients {
  carbohydrates: string;
  fats: string;
  proteins: string;
}

export default interface Ingredients {
  id: string;
  allergens: string[];
  calories_per_100g: number;
  category: string;
  id_: number;
  name: string;
  nutrients: IngredientsNutrients;
  origin: string;
}
