"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import useAllData from "@/hooks/useAllData";

interface CuisineSelectorProps {
  onCuisineChange: (cuisine: string) => void;
}

const CuisineSelector = ({ onCuisineChange }: CuisineSelectorProps) => {
  const [activeCuisine, setActiveCuisine] = useState("");
  const [filterRecipe, setFilterRecipe] = useState<string[]>([])
  const { recipes } = useAllData();


  useEffect(()=>{
    const unique = recipes.map((item)=> item.country)
    const data = [...new Set(unique)]
    setFilterRecipe(data)
  },[recipes])

  const handleCuisineClick = (cuisine: string) => {    
    setActiveCuisine(cuisine);
    onCuisineChange(cuisine);        
  };

  return (
    <div>
      <h3 className="text-md font-medium mb-3">
        Filter by cuisine
      </h3>
      <div className="flex flex-wrap gap-2 rounded-lg border p-2">
        {filterRecipe.map((item,index) => (
          <button
            key={index}
            onClick={() => handleCuisineClick(item)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium dark:text-white dark:bg-primary/20 flex items-center gap-1.5 animate-fade-in",
              activeCuisine === item
                ? "bg-primary text-primary-foreground dark:bg-white dark:text-black"
                : "bg-primary/10 hover:bg-muted text-foreground/80"
            )}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CuisineSelector;
