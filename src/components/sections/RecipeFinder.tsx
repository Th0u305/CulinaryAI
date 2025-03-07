"use client";

import CustomTabs from "./CustomTabs";

const RecipeFinder = () => {
  return (
    <div className="space-y-8 max-w-6xl mx-auto mt-20 p-5">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold">
          Find Recipes with Your Ingredients
        </h2>
        <p className="text-muted-foreground">
          Enter the ingredients you have on hand, and well suggest matching
          recipes
        </p>
      </div>
      <CustomTabs />
    </div>
  );
};

export default RecipeFinder;
