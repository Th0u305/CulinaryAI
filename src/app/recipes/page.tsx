"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import CuisineSelector from "@/components/sections/CuisineSelector";
import RecipeCard from "@/components/sections/RecipeCard";
import useAllData from "@/hooks/useAllData";

const Recipes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { recipes, setLoading, setLimitRecipe, loading, limitRecipe } =
    useAllData();

  useEffect(() => {
    setLimitRecipe(limitRecipe);
  }, [setLimitRecipe, limitRecipe]);

  const handleCuisineChange = (name: string) => {
    const filterRecipe = recipes.filter((item) => item.country === name);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLimitRecipe(filterRecipe);
    }, 1000);
  };

  return (
    <div className="min-h-screen mt-48 pb-16 px-4 mx-auto max-w-6xl">
      <div className="container mx-auto animate-fade-in">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight mb-3 md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Recipe Collection
          </h1>
          <p className="text-lg text-muted-foreground">
            Browse our complete recipe collection
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search recipes by name, description, or ingredient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="mb-16">
          <CuisineSelector onCuisineChange={handleCuisineChange} />
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

            <div
              className={
                loading ? "opacity-50 transition-opacity duration-300" : ""
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <RecipeCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
