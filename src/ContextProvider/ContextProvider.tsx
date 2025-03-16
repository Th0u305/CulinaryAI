"use client";

import { usePathname } from "next/navigation";
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
import Loading from "@/app/loading";

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
  ingredientName: string[];
  setIngredientName: Dispatch<SetStateAction<string[]>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loader: boolean;
  setLoader: Dispatch<SetStateAction<boolean>>;
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
  ingredientName: [],
  setIngredientName: () => {},
  loading: false,
  setLoading: () => {},
  loader: false,
  setLoader: () => {},
};

const ContextData = createContext<RecipesContextType>(defaultContextValue);

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipes[]>([]);
  const [limitRecipe, setLimitRecipe] = useState<Recipes[]>([]);
  const [allIngredients, setAllIngredients] = useState<Ingredients[]>([]);
  const [limitIngredients, setLimitIngredients] = useState<Ingredients[]>([]);
  const [ingredientName, setIngredientName] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/recipes")
      .then((res) => res?.json())
      .then((data) => {
        setRecipes(data);
        setLimitRecipe(data?.slice(0, 12));
        if (pathname === "recipes") {
          setLimitRecipe(data?.slice(0, 12));
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [pathname]);


  useEffect(()=>{
    fetch("/api/limitIngredients")
      .then((res)=> res.json())
      .then((data)=>{
        setAllIngredients(data)
        setLimitIngredients(
          data?.sort(()=> Math.random() - 0.6)?.slice(0,3)
        )
      })
  },[])


  useEffect(() => {
    const data = allIngredients?.map((item: Ingredients) => item?.name)
    setIngredientName(data);
  }, [allIngredients, limitRecipe]);

  useEffect(() => {
    if (recipes.length > 0 && allIngredients.length > 0) {
      setLoader(true);
    }
  }, [recipes, allIngredients]);

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
    setLoading,
    loader,
    setLoader,
  };

  return (
    <ContextData.Provider value={data}>
      {loader ? (
        children
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <Loading />
        </div>
      )}
    </ContextData.Provider>
  );
};

export { ContextProvider, ContextData };
