import React from "react";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Ingredients from "@/typeHooks/types-recipe";
import Recipes from "@/typeHooks/types-recipe";

type IngType = {
  ingredientDetails: Ingredients | Recipes;
};

const IngDetails = ({ ingredientDetails }: IngType) => {
  return (
    <CardHeader className="pb-2">
      <CardTitle className="text-xl font-semibold line-clamp-1">
        {ingredientDetails?.name || "Data not available"}
      </CardTitle>
      <CardDescription className="line-clamp-2 text-base">
        <p>Category : {ingredientDetails?.category || "Data not available"}</p>
      </CardDescription>
      <CardContent className="p-0">
        <p className="">
          Calories per 100g:{" "}
          {ingredientDetails?.calories_per_100g || "Data not available"}
        </p>
        <span>
          <h1>Nutrients</h1>
          <p>
            Carbohydrates:{" "}
            {ingredientDetails?.nutrients?.carbohydrates ||
              "Data not available"}
          </p>
          <p>
            Fats: {ingredientDetails?.nutrients?.fats || "Data not available"}
          </p>
          <p>
            Proteins:{" "}
            {ingredientDetails?.nutrients?.proteins || "Data not available"}
          </p>
        </span>
        <p>Allergens: {ingredientDetails?.allergens || "None"}</p>
        <p>Origins: {ingredientDetails?.origin || "Data not available"}</p>
      </CardContent>
      <CardFooter></CardFooter>
    </CardHeader>
  );
};

export default IngDetails;
