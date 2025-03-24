"use client";

import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import useAllData from "@/hooks/useAllData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Pagination from "@/components/ui/pagination";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import AllIngLists from "@/components/sections/AllIngLists";
import CustomTabs from "@/components/sections/CustomTabs";

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

  const { setLoading, setLimitRecipe, currentPage, activeCuisine } = useAllData();

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
          <TabsList className="w-[90%] sm:w-[80%] md:w-[68%] mx-auto">
            <TabsTrigger value="recipes">Recipes</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          </TabsList>
          <TabsContent value="recipes">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="relative mt-14 flex gap-3 w-[90%] sm:w-[80%] md:w-[68%] mx-auto mb-14"
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
            <CustomTabs />
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
