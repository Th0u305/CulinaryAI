import RecipeCard, { Recipe } from "./RecipeCard";

interface RecipeGridProps {
  recipes: Recipe[];
}

const RecipeGrid = ({ recipes }: RecipeGridProps) => {
  if (recipes.length === 0) {
    return (
      <div className="text-center p-10 rounded-lg bg-muted/20 backdrop-blur-sm">
        <p className="text-muted-foreground">
          No recipes found matching your criteria. Try different ingredients or
          cuisine filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeGrid;
