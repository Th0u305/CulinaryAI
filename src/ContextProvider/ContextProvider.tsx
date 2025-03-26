"use client";

import { usePathname } from "next/navigation";
import Recipes from "@/typeHooks/types-recipe";
import Ingredients from "@/typeHooks/types-recipe";
import User from "@/typeHooks/userType"
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Loading from "@/app/loading";
import { KindeProvider, useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";

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
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  activeCuisine : string
  setActiveCuisine : Dispatch<SetStateAction<string>>
  isAuthenticated : boolean
  setIsAuthenticated : Dispatch<SetStateAction<boolean>>
  userData: User | null;
  setUserData: Dispatch<SetStateAction<User | null>>;
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
  currentPage: 1,
  setCurrentPage: () => {},
  activeCuisine : "all",
  setActiveCuisine : () => {},
  isAuthenticated : false,
  setIsAuthenticated : () => {},
  userData: null, 
  setUserData: () => {}
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
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCuisine, setActiveCuisine] = useState<string>("all");
  const { user, isLoading} = useKindeAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/getData");
        const data = await res.json();        
        setUserData(data.user)
        setIsAuthenticated(data.isUserAuthenticated);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);
  
  useEffect(() => {
    if (!isLoading && user) {
      // Sync user data with MongoDB
      fetch("/api/syncUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
    }
  }, [isLoading, user]);
  
  useEffect(() => {
    fetch("/api/recipes")
      .then((res) => res?.json())
      .then((data) => {
        setRecipes(data);
        setLimitRecipe(data?.slice(0, 12));
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [pathname]);

  useEffect(() => {
    fetch("/api/limitIngredients")
      .then((res) => res.json())
      .then((data) => {
        setAllIngredients(data);
        setLimitIngredients(data?.sort(() => Math.random() - 0.6)?.slice(0, 3));
      });
  }, []);

  useEffect(() => {
    const splits = recipes.slice(0,12)
    const ingName = ((pathname === "/" ? splits : recipes).map((item)=> item.ingredients)).flat()
    const concat = ingName.concat(ingName)
    const unique = [...new Set(concat)]
    setIngredientName(unique)
  }, [recipes,pathname]);

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
    currentPage,
    setCurrentPage,
    activeCuisine,
    setActiveCuisine,
    isAuthenticated,
    setIsAuthenticated,
    userData,
    setUserData
  };

  return (
    <ContextData.Provider value={data}>
      {loader ? (
        <KindeProvider>{children}</KindeProvider>
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <Loading />
        </div>
      )}
    </ContextData.Provider>
  );
};

export { ContextProvider, ContextData };
