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
    currentPage,
    setCurrentPage
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
    setLoading,
    currentPage,
    setCurrentPage
  };
};

export default useAllData;
