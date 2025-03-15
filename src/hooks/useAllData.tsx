import { ContextData } from "@/ContextProvider/ContextProvider";
import { useContext } from "react";

const useAllData = () => {
  const {
    recipes,
    setRecipes,
    limitRecipe,
    setLimitRecipe,
    allIngredients,
    setAllIngredients,
    limitIngredients,
    setLimitIngredients,
    ingredientName,
    setIngredientName,
    loading,
    setLoading,
    
  } = useContext(ContextData);
  return {
    recipes,
    setRecipes,
    limitRecipe,
    setLimitRecipe,
    allIngredients,
    setAllIngredients,
    limitIngredients,
    setLimitIngredients,
    ingredientName,
    setIngredientName,
    loading,
    setLoading
  };
};

export default useAllData;
