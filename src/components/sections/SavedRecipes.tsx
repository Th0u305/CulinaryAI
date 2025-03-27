import React, { Dispatch, SetStateAction } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { ChefHat, Clock, DeleteIcon, Heart } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Recipes from "@/typeHooks/types-recipe";
import Link from "next/link";
import useAllData from "@/hooks/useAllData";
import { toast } from "sonner";

type recipe = {
  savedRecipe: Recipes[];
  setSavedRecipe: Dispatch<SetStateAction<Recipes[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  reps: string;
};

const SavedRecipes = ({
  savedRecipe,
  setLoading,
  setSavedRecipe,
  reps,
}: recipe) => {
  const { userData } = useAllData();

  type DifficultyLevel = "Easy" | "Medium" | "Hard";
  const difficultyColor = {
    Easy: "text-green-500",
    Medium: "text-amber-700",
    Hard: "text-red-500",
  };

  const deleteSave = async (id: string) => {
    const deleteRecipe = await fetch("/api/updateUser/deleteSave", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kindeId: userData?.id, recipeId: id }),
    }).then((res) => res.json());

    if (deleteRecipe) {
      if (deleteRecipe?.error) {
        return toast.error("Something went wrong");
      }
      setSavedRecipe(savedRecipe.filter((item) => item.id !== id));
      if (savedRecipe.length === 1) {
        setLoading(false);
      }
      return toast.success("Successfully deleted saved recipe");
    }
  };

  const deleteFavorite = async (id: string) => {
    const deleteRecipe = await fetch("/api/updateUser/delete", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kindeId: userData?.id, recipeId: id }),
    }).then((res) => res.json());

    if (deleteRecipe) {
      if (deleteRecipe?.error) {
        return toast.error("Something went wrong");
      }
      setSavedRecipe(savedRecipe.filter((item) => item.id !== id));
      if (savedRecipe.length === 1) {
        setLoading(false);
      }
      return toast.success("Successfully deleted saved recipe");
    }
  };

  return (
    <>
      {savedRecipe.length > 0 ? (
        savedRecipe.map((item) => (
          <Card
            key={item.id}
            className="overflow-hidden transition-all duration-300 hover:shadow-lg glass-card h-full flex flex-col"
          >
            <div className="relative aspect-video overflow-hidden">
              {reps === "fav" && (
                <Button
                  onClick={() => deleteFavorite(item?.id)}
                  variant="ghost"
                  size="sm"
                  className="bg-red-100 absolute z-50 right-2 top-2 button-color hover:bg-red-100 text-black hover:text-black"
                >
                  <Heart className="text-red-700" />
                  Remove
                </Button>
              )}
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
            </CardContent>

            <CardFooter className="pt-1 flex justify-between">
              <Button size="sm" variant="outline" className="text-" asChild>
                <Link
                  href={`/recipes/${item?.id}`}
                  className="button-color bgt"
                >
                  <ChefHat className="h-5 w-5 mr-1 text-[#ff9e42]" />
                  View Recipe
                </Link>
              </Button>
              <Button
                onClick={() => deleteSave(item?.id)}
                size="sm"
                variant="secondary"
                className="text-sm button-color"
              >
                <DeleteIcon className="h-8 w-8" />
                Remove
              </Button>
            </CardFooter>
          </Card>
        ))
      ) : (
        <div className="col-span-full">
          <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin mx-auto mt-8 mb-8"></div>
        </div>
      )}
    </>
  );
};

export default SavedRecipes;
