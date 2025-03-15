"use client";

import { usePathname } from 'next/navigation'
import Recipes from "@/typeHooks/types-recipe";
import Ingredients from "@/typeHooks/types-recipe";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface ContextProviderProps {
  children: ReactNode;
}


type RecipesContextType = {
  recipes: Recipes[];
  setRecipes: Dispatch<SetStateAction<Recipes[]>>;
  limitRecipe: Recipes[];
  setLimitRecipe: Dispatch<SetStateAction<Recipes[]>>;
  allIngredients: Ingredients[];
  setAllIngredients: Dispatch<SetStateAction<Ingredients[]>>;
  limitIngredients: Ingredients[];
  setLimitIngredients: Dispatch<SetStateAction<Ingredients[]>>;
  ingredientName : string[]
  setIngredientName: Dispatch<SetStateAction<string[]>>
  loading : boolean
  setLoading : Dispatch<SetStateAction<boolean>>
};

const defaultContextValue: RecipesContextType = {
  recipes: [],
  setRecipes: () => {},
  limitRecipe: [],
  setLimitRecipe: () => {},
  allIngredients: [],
  setAllIngredients: () => {},
  limitIngredients: [],
  setLimitIngredients: () => {},
  ingredientName : [],
  setIngredientName : () => {},
  loading : false,
  setLoading : () => {},
};

const ContextData = createContext<RecipesContextType>(defaultContextValue);

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipes[]>([]);
  const [limitRecipe, setLimitRecipe] = useState<Recipes[]>([]);
  const [allIngredients, setAllIngredients] = useState<Ingredients[]>([]);
  const [limitIngredients, setLimitIngredients] = useState<Ingredients[]>([]);
  const [ingredientName, setIngredientName] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false)
  const pathname = usePathname()


  useEffect(() => {
    fetch("/api/recipes")
      .then((res) => res?.json())
      .then((data) => {
        setRecipes(data);
        setLimitRecipe(data?.slice(0,12))
        if (pathname === "recipes"){
          setLimitRecipe(data?.slice(0,12))
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [pathname]);

  useEffect(() => {
    fetch("/api/ingredients")
      .then((res) => res?.json())
      .then((data) => {        
        setAllIngredients(data);
        setLimitIngredients(data?.sort(() => Math?.random() - 0.3)?.slice(0, 3));
      });
  }, []);

  useEffect(()=>{
    const data = allIngredients?.map((item:Ingredients) => item?.name)?.slice(0,3)       
    const ingName = (limitRecipe?.map((item)=> item?.ingredients))?.flat()
    const concat = ingName?.concat(data)
    setIngredientName(concat)
  },[allIngredients,limitRecipe])


  const data = {
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

  return <ContextData.Provider value={data}>{children}</ContextData.Provider>;
};

export { ContextProvider, ContextData };
