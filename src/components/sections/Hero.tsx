import React from "react";
import RecipeFinder from "./RecipeFinder";
import { ChefHatIcon } from "lucide-react";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section>
      <div className="bg-gradient-to-br from-[#1eb058] to-[#008a7a] dark:bg-gradient-to-tr dark:from-[#1d293b] dark:to-[#101629] min-h-[45rem] relative">
        <div className="text-center mb-28 max-w-3xl mx-auto space-y-3 p-5 absolute top-40 left-0 right-0">
          <p className="text-lg font-bold text-gray-300 dark:text-muted-foreground w-fit inline-flex gap-2">
            <ChefHatIcon className="text-black dark:text-green-500" />
            AI-Powered Recipe Generator
          </p>
          <h1 className="text-4xl font-bold tracking-tight mb-3 md:text-5xl lg:text-6xl bg-clip-text text-white dark:text-transparent dark:bg-gradient-to-r dark:from-primary dark:to-primary/70">
            Discover Delicious Recipes with Ingredients You Already Have{" "}
          </h1>
          <p className="text-lg text-gray-300 font-bold dark:text-muted-foreground">
            Enter the ingredients you have on hand, select your preferred
            cuisine, and let our smart recipe generator create personalized meal
            ideas just for you.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Button size="lg"  className="text-md button-color text-white hover:bg-[#ff9a2e] bg-[#ff9a2e] active:bg-[#e09c53]">
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-md bg-white/20 text-white hover:bg-white dark:bg-black button-color border-white/50"
            >
              Browse Recipes
            </Button>
          </div>
        </div>
      </div>
      <RecipeFinder />
    </section>
  );
};

export default Hero;
