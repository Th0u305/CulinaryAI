"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import CuisineSelector from "./CuisineSelector";
import IngredientInput from "./IngredientInput";
import { Search } from "lucide-react";
import RecipeGrid from "./RecipeGrid";
import { Recipe } from "./RecipeCard";
import { sampleRecipes } from "@/data/sample-recipes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export default function CustomTabs() {
  const [ingredients, setIngredients] = useState<string[]>([
    "chicken",
    "garlic",
    "olive oil",
  ]);
  const [cuisine, setCuisine] = useState("All");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  // Simulate recipe search using sample data
  const searchRecipes = () => {
    setLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      let filteredRecipes = sampleRecipes;

      // Filter by ingredients (recipe must contain at least one ingredient)
      if (ingredients.length > 0) {
        filteredRecipes = filteredRecipes.filter((recipe) =>
          recipe.ingredients.some((recipeIngredient) =>
            ingredients.some((userIngredient) =>
              recipeIngredient
                .toLowerCase()
                .includes(userIngredient.toLowerCase())
            )
          )
        );
      }

      // Filter by cuisine
      if (cuisine !== "All") {
        filteredRecipes = filteredRecipes.filter(
          (recipe) => recipe.cuisine === cuisine
        );
      }

      setRecipes(filteredRecipes);
      setLoading(false);
    }, 800);
  };

  // Initial search on component mount
  useEffect(() => {
    searchRecipes();
  }, []);

  const handleSearch = () => {
    searchRecipes();
  };

  const handleCuisineChange = (selectedCuisine: string) => {
    setCuisine(selectedCuisine);
    // Auto-search when cuisine changes
    setTimeout(searchRecipes, 100);
  };

  const handleIngredientsChange = (updatedIngredients: string[]) => {
    setIngredients(updatedIngredients);
  };
  return (
    <section>
      <div className="flex items-center justify-center flex-col space-y-6 bg-background/30 backdrop-blur-sm p-6 rounded-xl border shadow-sm">
        <Tabs defaultValue="Ingredient's" className="w-full sm:w-[80%] md:w-[70%]">
          <TabsList className="mb-8">
            <TabsTrigger value="Ingredient's">By Ingredients</TabsTrigger>
            <TabsTrigger value="Cuisine">By Cuisine</TabsTrigger>
          </TabsList>

          <TabsContent value="Ingredient's">
            <div className="w-full space-y-5">
              <IngredientInput onIngredientsChange={handleIngredientsChange} />
              <div className="flex justify-center pt-2">
                <Button
                  onClick={handleSearch}
                  size="lg"
                  className="px-8 gap-2 button-color text-white hover:bg-[#ff9a2e] bg-[#ff9a2e] active:bg-[#e09c53]"
                >
                  <Search className="h-4 w-4" />
                  Find Recipes
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="Cuisine">
            <div className="pt-2">
              <CuisineSelector onCuisineChange={handleCuisineChange} />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-24">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-medium">
              {loading
                ? "Searching..."
                : `Found ${recipes.length} matching recipes`}
            </h3>
          </div>

          <div
            className={
              loading ? "opacity-50 transition-opacity duration-300" : ""
            }
          >
            <RecipeGrid recipes={recipes} />
          </div>
        </div>
      </div>
    </section>
  );
}
