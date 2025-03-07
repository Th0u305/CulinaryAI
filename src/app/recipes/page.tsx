"use client"
import { useState, useEffect } from 'react';
import { sampleRecipes } from '@/data/sample-recipes';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import CuisineSelector from '@/components/sections/CuisineSelector';
import RecipeGrid from '@/components/sections/RecipeGrid';

const Recipes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cuisine, setCuisine] = useState('All');
  const [filteredRecipes, setFilteredRecipes] = useState(sampleRecipes);

  useEffect(() => {
    let result = sampleRecipes;
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter((recipe) => 
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some((ingredient) => 
          ingredient.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    
    // Filter by cuisine
    if (cuisine !== 'All') {
      result = result.filter((recipe) => recipe.cuisine === cuisine);
    }
    
    setFilteredRecipes(result);
  }, [searchQuery, cuisine]);

  const handleCuisineChange = (selectedCuisine: string) => {
    setCuisine(selectedCuisine);
  };

  return (
    <div className="min-h-screen mt-48 pb-16 px-4 w-6xl mx-auto">
      <div className="container mx-auto animate-fade-in">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight mb-3 md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Recipe Collection
          </h1>
          <p className="text-lg text-muted-foreground">
            Browse our complete recipe collection
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search recipes by name, description, or ingredient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="mb-16">
          <CuisineSelector onCuisineChange={handleCuisineChange} />
        </div>
        
        <RecipeGrid recipes={filteredRecipes} />
      </div>
    </div>
  );
};

export default Recipes;