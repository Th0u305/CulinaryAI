"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, PlusIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import useAllData from "@/hooks/useAllData";
import { useForm } from "react-hook-form";
import Ingredients from "@/typeHooks/types-recipe";
import { useState } from "react";


type FormData = {
  name: string;
};

export interface IngredientsName {
  name: string;
}

const IngredientInput = () => {
  const { limitIngredients,setLimitIngredients,ingredientName,setIngredientName } = useAllData();
  const {register,handleSubmit,reset,formState: {}} = useForm<FormData>();
  const [errorMSG, setErrorMSG] = useState("");

  const onSubmit = handleSubmit((data) => {
    if (data.name.length < 2) {
      return setErrorMSG("Please type more than 2 word");
    } else {
      setErrorMSG("");
    }
    const newRecipe: Ingredients = {
      name: data.name,
      id: "",
      calories_per_serving: 0,
      cook_time: "",
      cooking_level: "",
      country: "",
      description: "",
      id_: 0,
      image: "",
      ingredients: [],
      instructions: [],
      nutrition_facts: {
        carbohydrates: "",
        fats: "",
        protein: "",
      },
      servings: 0,
      tags: [],
      allergens: [],
      calories_per_100g: 0,
      category: "",
      nutrients: {
        carbohydrates: "",
        fats: "",
        proteins: "",
      },
      origin: "",
    };
    setLimitIngredients((prev) => [...prev, newRecipe]);
    reset();
  });

  const removeIngredient = (name: string) => {
    const filter = limitIngredients.filter((item) => item.name !== name);
    setLimitIngredients(filter);
    ingredientName.unshift(name);
  };

  const addIngredient = (name: string) => {
    const newRecipe: Ingredients = {
      name: name,
      id: "",
      calories_per_serving: 0,
      cook_time: "",
      cooking_level: "",
      country: "",
      description: "",
      id_: 0,
      image: "",
      ingredients: [],
      instructions: [],
      nutrition_facts: {
        carbohydrates: "",
        fats: "",
        protein: "",
      },
      servings: 0,
      tags: [],
      allergens: [],
      calories_per_100g: 0,
      category: "",
      nutrients: {
        carbohydrates: "",
        fats: "",
        proteins: "",
      },
      origin: "",
    };
    setLimitIngredients((prev) => [...prev, newRecipe]);
    const filter = ingredientName.filter((item) => item !== name);
    setIngredientName(filter);
  };

  return (
    <div className="space-y-4 w-full">
      <form onSubmit={onSubmit} className="flex items-center space-x-2">
        <Input
          type="text"
          {...register("name")}
          placeholder="Add an ingredient..."
          required
          className="flex-grow"
        />
        <Button
          type="submit"
          aria-label="Add ingredient"
          className="button-color text-white hover:bg-[#ff9a2e] bg-[#ff9a2e] active:bg-[#e09c53]"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </form>
      <p className="text-red-500 mb-2">{errorMSG}</p>
      <div className="flex flex-wrap gap-2 min-h-[3rem] p-2 bg-background/50 backdrop-blur-sm rounded-lg border">
        {limitIngredients?.length > 0 ? (
          limitIngredients?.map((item, index: number) => (
            <div
              key={index}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium bg-primary/10 dark:text-white dark:bg-primary/20",
                "flex items-center gap-1.5 animate-fade-in"
              )}
            >
              {item.name}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeIngredient(item.name)}
                className="h-4 w-4 p-0 rounded-full hover:bg-primary/20 "
                aria-label={`Remove ${item}`}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))
        ) : (
          <div className="text-muted-foreground text-sm italic px-2 py-1">
            Add ingredients to find matching recipes
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2 h-[15.6rem] overflow-y-scroll p-2 bg-background/50 backdrop-blur-sm rounded-lg border">
        {ingredientName.length > 0 ? (
          ingredientName.map((item, index) => (
            <div
              key={index}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium bg-primary/10 dark:text-white dark:bg-primary/20 flex items-center gap-1.5 animate-fade-in"
              )}
            >
              {item}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => addIngredient(item)}
                className="h-4 w-4 p-0 rounded-full hover:bg-primary/20 "
                aria-label={`Remove ${item}`}
              >
                <PlusIcon className="h-8 w-8" />
              </Button>
            </div>
          ))
        ) : (
          <div className="col-span-full">
            <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin mx-auto mt-8 mb-8"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IngredientInput;
