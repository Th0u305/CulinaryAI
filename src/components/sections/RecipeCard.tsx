"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, ChefHat, Bookmark, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import useAllData from "@/hooks/useAllData";
import Recipes from "@/typeHooks/types-recipe";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import IngDetails from "./IngDetails";
import { useState } from "react";
import Ingredients from "@/typeHooks/types-recipe";
import Link from "next/link";

const RecipeCardData = () => {
    const { limitRecipe } = useAllData();
    const [ingredientDetails, setIngredientDetails] = useState<Ingredients | null>(null);

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
    };
  
    return (
      <>
        {limitRecipe.length > 0 ? (
          limitRecipe.map((item: Recipes) => (
            <Card
              key={item.id}
              className="overflow-hidden transition-all duration-300 hover:shadow-lg glass-card h-full flex flex-col"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  className="absolute h-full object-cover transform transition-transform duration-700 hover:scale-105"
                  src={item.image}
                  alt="Example"
                  width={800}
                  height={500}
                />
  
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white/90 dark:text-black text-foreground">
                    {item?.country}
                  </span>
                  <span
                    className={cn(
                      "text-xs font-semibold px-2 py-1 rounded-full bg-white/90",
                      difficultyColor[item?.cooking_level as DifficultyLevel]
                    )}
                  >
                    {item?.cooking_level}
                  </span>
                </div>
              </div>
  
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold line-clamp-1">
                  {item?.name}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {item?.description}
                </CardDescription>
              </CardHeader>
  
              <CardContent className="flex-grow space-y-5">
                <div className="inline-flex items-center justify-center gap-2">
                  <p className="font-medium">Cook Time:</p>
                  <div className="flex items-center gap-2 text-sm px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{item?.cook_time} mins</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="flex items-center gap-2">
                    <p className="font-medium">Ingredients:</p>
                    <p className="text-muted-foreground">Click to see details</p>
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {item?.ingredients.slice(0, 5).map((ingredient, idx) => (
                      <Popover key={idx}>
                        <PopoverTrigger
                          onClick={() => handleIng(ingredient)}
                          className="flex items-center gap-2 px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
                        >
                          {ingredient} <ArrowUp className="w-4 h-4" />
                        </PopoverTrigger>
                        <PopoverContent className="w-fit">
                          {ingredientDetails ? (
                            <IngDetails
                              ingredientDetails={ingredientDetails}
                            ></IngDetails>
                          ) : (
                            <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
                          )}
                        </PopoverContent>
                      </Popover>
                    ))}
                    {item.ingredients.length > 5 && (
                      <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                        +{item.ingredients.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
  
              <CardFooter className="pt-1 flex justify-between">
                <Button size="sm" variant="outline" className="text-xs" asChild>
                  <Link href={`/recipes/${item?.id}`}  className="button-color bgt">
                    <ChefHat className="h-5 w-5 mr-1 text-[#ff9e42]" />
                    View Recipe
                  </Link>
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="text-xs button-color"
                >
                  <Bookmark className="h-6 w-6" />
                  <span className="sr-only">Save</span>
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="text-center p-10 rounded-lg bg-muted/20 backdrop-blur-sm grid col-span-full">
            <p className="text-muted-foreground">
              No recipes found matching your criteria. Try different ingredients
              or cuisine filters.
            </p>
          </div>
        )}
      </>
    );
};

export default RecipeCardData;