"use client";

import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import Recipes from "@/typeHooks/types-recipe";
import Ingredients from "@/typeHooks/types-recipe";
import { ArrowUp, Bookmark, Clock } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const SingleRecipe = () => {
  const pathname = usePathname();
  const recipeId = pathname?.split("/")[2];
  const [singleData, setSingleData] = useState<Recipes | null>(null);
  const [ingredientDetails, setIngredientDetails] = useState<Ingredients | null>(null);

  const fetchRecipeById = async (id: string) => {
    const data = await fetch(`/api/recipes/${id}`).then((res) => res.json());
    setSingleData(data);
  };

  useEffect(() => {
    fetchRecipeById(recipeId);
  }, [recipeId]);

  if (!singleData)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loading />
      </div>
    );

  const {
    calories_per_serving,
    cook_time,
    cooking_level,
    country,
    description,
    image,
    ingredients,
    instructions,
    name,
    nutrition_facts,
    servings,
    tags,
  } = singleData;

  type DifficultyLevel = "Easy" | "Medium" | "Hard";
  const difficultyColor = {
    Easy: "text-green-500",
    Medium: "text-amber-700",
    Hard: "text-red-500",
  };

  const handleIng = async (ing: string) => {
    const res = await fetch(`/api/ingredients/${ing}`);
    const data = await res.json();
    setIngredientDetails(data);
    console.log(data);
    
  };

  return (
    <div className="p-4">
      <Card className="max-w-2xl mx-auto mt-36 mb-20 overflow-hidden transition-all duration-300 hover:shadow-lg glass-card h-full flex flex-col">
        <div className="relative aspect-video overflow-hidden">
          <Image
            className="absolute h-96 object-cover transform transition-transform duration-700 hover:scale-105"
            src={image}
            alt="Example"
            width={800}
            height={800}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white/90 dark:text-black text-foreground">
              {country}
            </span>
            <span
              className={cn(
                "text-xs font-semibold px-2 py-1 rounded-full bg-white/90",
                difficultyColor[cooking_level as DifficultyLevel]
              )}
            >
              {cooking_level}
            </span>
          </div>
        </div>

        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold line-clamp-1">
            {name}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-base">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-grow space-y-5">
          <div className="inline-flex items-center justify-center gap-2">
            <p className="font-medium">Cook Time:</p>
            <div className="flex items-center gap-2 text-sm px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{cook_time} mins</span>
            </div>
          </div>
          <div className="space-y-1">
            <span className="flex items-center gap-2">
              <p className="font-medium">Ingredients:</p>
              <p className="text-muted-foreground">Click to see details</p>
            </span>
            <div className="flex flex-wrap gap-1 items-center relative">
              {ingredients.map((ingredient, idx) => (
                <Popover key={idx}>
                  <PopoverTrigger
                    onClick={() => handleIng(ingredient)}
                    className="flex items-center gap-2 px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
                  >
                    {ingredient} <ArrowUp className="w-4 h-4" />
                  </PopoverTrigger>
                  <PopoverContent className="w-fit">
                    {ingredientDetails ? (
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl font-semibold line-clamp-1">
                          {ingredientDetails?.name || ingredient || "Data not available"}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 text-base">
                          <p>Category : {ingredientDetails?.category || "Data not available"}</p>
                        </CardDescription>
                        <CardContent className="p-0">
                          <p>Calories per 100g: {ingredientDetails?.calories_per_100g || "Data not available"}</p>
                          <span>
                            <h1>Nutrients</h1>
                            <p>Carbohydrates: {ingredientDetails?.nutrients?.carbohydrates || "Data not available"}</p>
                            <p>Fats: {ingredientDetails?.nutrients?.fats || "Data not available"}</p>
                            <p>Proteins: {ingredientDetails?.nutrients?.proteins || "Data not available"}</p>
                          </span>
                          <p>Allergens: {ingredientDetails?.allergens || "None"}</p>
                          <p>Origins: {ingredientDetails?.origin || "Data not available"}</p>
                        </CardContent>
                        <CardFooter></CardFooter>
                      </CardHeader>
                    ) : (
                      <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
                    )}
                  </PopoverContent>
                </Popover>
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <p className="font-medium">Tags:</p>
            <div className="flex flex-wrap gap-1">
              {tags.map((ingredient, idx) => (
                <span
                  key={idx}
                  className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <p className="font-medium">Instructions:</p>
            <div className="flex flex-wrap gap-1">
              <span className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                {instructions}
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="font-medium">Nutrition Facts:</p>
            <div className="flex flex-wrap gap-1">
              <span className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                <p>Carbohydrates: {nutrition_facts.carbohydrates}</p>
              </span>
              <span className=" px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                <p>Fats: {nutrition_facts.fats}</p>
              </span>
              <span className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                <p>Protein: {nutrition_facts.protein}</p>
              </span>
            </div>
          </div>
          <div className="inline-flex items-center gap-2">
            <p className="font-medium">Servings:</p>
            <div className="flex flex-wrap gap-1">
              <span className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                <p>{servings}</p>
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="font-medium">Calories per serving:</p>
            <div className="flex flex-wrap gap-1">
              <span className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                <p>Serving: {calories_per_serving}</p>
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="font-medium">Instructions:</p>
            <div className="flex flex-wrap gap-1">
              <span className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                {instructions}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-1 flex justify-center items-center">
          <Button size="lg" variant="secondary" className="button-color">
            <Bookmark className="h-8 w-8" />
            <span className="">Save</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SingleRecipe;
