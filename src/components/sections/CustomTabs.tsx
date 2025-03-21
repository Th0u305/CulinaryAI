"use client";

import { Button } from "../ui/button";
import CuisineSelector from "./CuisineSelector";
import IngredientInput from "./IngredientInput";
import { Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import useAllData from "@/hooks/useAllData";
import RecipeCard from "./RecipeCard";

export default function CustomTabs() {
  const {
    limitRecipe,
    setLimitRecipe,
    recipes,
    limitIngredients,
    loading,
    setLoading,
  } = useAllData();

  const handleCuisineChange = (selectedCuisine: string) => {
    const filterRecipe = recipes.filter(
      (item) => item.country === selectedCuisine
    );
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLimitRecipe(filterRecipe);
    }, 1000);
  };

  const handleSearch = () => {
    const mapped = limitIngredients.map((item) =>
      item.name.toLocaleLowerCase()
    );

    const filteredRecipes = limitRecipe.filter((recipe) =>
      recipe.ingredients.some((ingredient) =>
        mapped.includes(ingredient.toLocaleLowerCase())
      )
    );
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLimitRecipe(filteredRecipes);
    }, 1000);
  };

  return (
    <section>
      <div className="flex items-center justify-center flex-col space-y-6 bg-background/30 backdrop-blur-sm p-6 rounded-xl border shadow-sm">
        <Tabs
          defaultValue="Ingredient's"
          className="w-full sm:w-[80%] md:w-[70%]"
        >
          <TabsList className="mb-8">
            <TabsTrigger value="Ingredient's">By Ingredients</TabsTrigger>
            <TabsTrigger value="Cuisine">By Cuisine</TabsTrigger>
          </TabsList>

          <TabsContent value="Ingredient's">
            <div className="w-full space-y-5">
              <IngredientInput />
              <div className="flex justify-center pt-2">
                <Button
                  onClick={() => handleSearch()}
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
                : `Found ${limitRecipe.length} matching recipes`}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full">
                <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin mx-auto mt-8 mb-8"></div>
              </div>
            ) : (
              <RecipeCard />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
