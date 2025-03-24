"use client";

import { useEffect, useState } from "react";
import Ingredients from "@/typeHooks/types-recipe";
import IngDetails from "./IngDetails";
import { cn } from "@/lib/utils";
import useAllData from "@/hooks/useAllData";
import { useForm, SubmitHandler } from "react-hook-form";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type Inputs = {
  ingredients: string;
};

const AllIngLists = () => {
  const {
    register,
    handleSubmit,
    formState: {},
    reset,
  } = useForm<Inputs>();

  const [ingredientDetails, setIngredientDetails] =
    useState<Ingredients | null>(null);
  const [allIngredients, setAllIngredients] = useState<string[]>([]);
  const [activeIngredient, setActiveIngredient] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const { currentPage } = useAllData();

  useEffect(() => {
    fetch(`/api/ingredients/all`)
      .then((res) => res.json())
      .then((data: Ingredients[]) => {
        const mapped = data?.map((item) => item?.name);
        setAllIngredients([...new Set(mapped)]);
      });
  }, [currentPage]);

  const handleIngredientsName = async (name: string) => {
    setActiveIngredient(name);
    const res = await fetch(`/api/ingredients/${name}`);
    const data = await res.json();
    setLoading(true);
    setTimeout(() => {
      setIngredientDetails(data);
      setLoading(false);
    }, 1000);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setAllIngredients([]);
    fetch(`/api/inputSearch/${data.ingredients}/ingredients`)
      .then((res) => res.json())
      .then((data: Ingredients[]) => {
        const mapped = data.map((item) => item.name);
        setLoading2(true);
        setTimeout(() => {
          setLoading2(false);
          setAllIngredients(mapped);
        }, 1000);
        reset();
      });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-14 flex gap-3 w-[90%] sm:w-[80%] md:w-[68%] mx-auto mb-14"
      >
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          required
          {...register("ingredients")}
          placeholder="Search Ingredients"
          className="pl-10"
        />
        <Button
          type="submit"
          variant="default"
          className="button-color text-white hover:bg-[#ff9a2e] bg-[#ff9a2e] active:bg-[#e09c53] h-10"
        >
          Search
        </Button>
      </form>
      {allIngredients.length > 0 ? (
        <h3 className="text-xl font-medium mb-3 w-full sm:w-[80%] md:w-[68%] mx-auto">
          Select ingredient
        </h3>
      ) : (
        <h3 className="text-xl font-medium mb-3 w-full sm:w-[80%] md:w-[68%] mx-auto">
          Searching...
        </h3>
      )}
      <div className="flex flex-wrap gap-2 rounded-lg border p-2 overflow-y-scroll items-center w-full sm:w-[80%] md:w-[68%] mx-auto">
        {allIngredients.length > 0 ? (
          allIngredients?.map((item, index) => (
            <button
              key={index}
              onClick={() => handleIngredientsName(item)}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium dark:text-white dark:bg-primary/20 flex items-center gap-1.5 animate-fade-in",
                activeIngredient === item
                  ? "bg-primary text-primary-foreground dark:bg-white dark:text-black"
                  : "bg-primary/10 hover:bg-muted text-foreground/80"
              )}
            >
              {loading2 ? (
                <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin mx-auto mt-8 mb-8"></div>
              ) : (
                item
              )}
            </button>
          ))
        ) : (
          <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin mx-auto mt-8 mb-8"></div>
        )}
      </div>
      {ingredientDetails ? (
        <div className="w-fit mx-auto mt-20 mb-20 border p-2 rounded-lg">
          <IngDetails ingredientDetails={ingredientDetails}></IngDetails>
        </div>
      ) : (
        <div className="w-full text-center mt-24 mb-24">
          {loading ? (
            <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin mx-auto mt-8 mb-8"></div>
          ) : (
            <h1 className="text-2xl">
              Please choose and ingredient to see details
            </h1>
          )}
        </div>
      )}
    </>
  );
};

export default AllIngLists;
