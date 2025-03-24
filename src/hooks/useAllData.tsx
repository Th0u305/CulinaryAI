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
    setCurrentPage,
    activeCuisine,
    setActiveCuisine,
    isAuthenticated,
    setIsAuthenticated,
    userData,
    setUserData
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
    setCurrentPage,
    activeCuisine,
    setActiveCuisine,
    isAuthenticated,
    setIsAuthenticated,
    userData,
    setUserData
  };
};

export default useAllData;
