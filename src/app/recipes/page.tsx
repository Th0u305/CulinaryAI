"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import CuisineSelector from "@/components/sections/CuisineSelector";
import RecipeCard from "@/components/sections/RecipeCard";
import useAllData from "@/hooks/useAllData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Pagination from "@/components/ui/pagination";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import AllIngLists from "@/components/sections/AllIngLists";

type Inputs = {
  text: string;
};

const Recipes = () => {
  const {
    register,
    handleSubmit,
    // watch,
    formState: {},
  } = useForm<Inputs>();

  const {
    recipes,
    setLoading,
    setLimitRecipe,
    loading,
    limitRecipe,
    currentPage,
  } = useAllData();
  const [activeCuisine, setActiveCuisine] = useState("");

  const handleCuisineChange = (cuisine: string) => {
    setActiveCuisine(cuisine);

    const filterRecipe = recipes.filter((item) => item.country === cuisine);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLimitRecipe(filterRecipe);
    }, 1000);
  };

  useEffect(() => {
    setLoading(true);
    fetch(`/api/recipeByPage/${currentPage}/${activeCuisine}`)
      .then((res) => res.json())
      .then((data) => {
        setLimitRecipe(data);
        setLoading(false);
      });
  }, [currentPage, setLimitRecipe, setLoading, activeCuisine]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    fetch(`/api/inputSearch/${data.text}`)
      .then((res) => res.json())
      .then((data) => setLimitRecipe(data));
  };

  return (
    <div className="min-h-screen mt-48 pb-16 px-4 mx-auto max-w-6xl">
      <div className="container mx-auto animate-fade-in">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight mb-3 md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Recipe Collection
          </h1>
          <p className="text-lg text-muted-foreground">
            Browse our complete recipe collection
          </p>
        </div>

        <Tabs defaultValue="recipes">
          <TabsList>
            <TabsTrigger value="recipes">Recipes</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          </TabsList>
          <TabsContent value="recipes">
            <div className="max-w-3xl mx-auto mb-14">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative mt-14 flex gap-3"
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  {...register("text")}
                  placeholder="Search recipes by name"
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
            </div>
            <div>
              <CuisineSelector onCuisineChange={handleCuisineChange} />
            </div>

            <div className="mt-24">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-medium">
                    {loading
                      ? "Searching..."
                      : `Found ${limitRecipe.length} matching recipes`}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {loading ? (
                    <div className="col-span-full">
                      <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin mx-auto mt-8 mb-8"></div>
                    </div>
                  ) : (
                    <RecipeCard />
                  )}
                </div>
              </div>
            </div>
            <Pagination></Pagination>
          </TabsContent>
          <TabsContent value="ingredients">
            <div className="mt-14">
            <AllIngLists />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Recipes;
