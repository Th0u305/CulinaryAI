import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, ChefHat, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export interface Recipe {
  id: string;
  title: string;
  description: string;
  prepTime: number;
  cuisine: string;
  difficulty: "Easy" | "Medium" | "Hard";
  ingredients: string[];
  imageUrl: string;
}

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const difficultyColor = {
    Easy: "text-green-500",
    Medium: "text-amber-700",
    Hard: "text-red-500",
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg glass-card h-full flex flex-col">
      <div className="relative aspect-video overflow-hidden">
        {/* <div 
          className="absolute inset-0 bg-center bg-cover transform transition-transform duration-700 hover:scale-105"
          style={{ backgroundImage: `url(${recipe.imageUrl || '/placeholder.svg'})` }}
        /> */}

        <Image
          className="absolute h-80 object-cover transform transition-transform duration-700 hover:scale-105"
          src={recipe.imageUrl}
          alt="Example"
          width={500}
          height={500}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white/90 dark:text-black text-foreground">
            {recipe.cuisine}
          </span>
          <span
            className={cn(
              "text-xs font-semibold px-2 py-1 rounded-full bg-white/90",
              difficultyColor[recipe.difficulty]
            )}
          >
            {recipe.difficulty}
          </span>
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold line-clamp-1">
          {recipe.title}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {recipe.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Clock className="h-4 w-4" />
          <span>{recipe.prepTime} mins</span>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium">Ingredients:</p>
          <div className="flex flex-wrap gap-1">
            {recipe.ingredients.slice(0, 5).map((ingredient, idx) => (
              <span
                key={idx}
                className="text-sm px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
              >
                {ingredient}
              </span>
            ))}
            {recipe.ingredients.length > 5 && (
              <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                +{recipe.ingredients.length - 5} more
              </span>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-1 flex justify-between">
        <Button size="sm" variant="outline" className="text-xs" asChild>
          <Link href={`/recipes/${recipe.id}`} className="button-color bgt">
            <ChefHat className="h-5 w-5 mr-1 text-[#ff9e42]" />
            View Recipe
          </Link>
        </Button>
        <Button size="sm" variant="ghost" className="text-xs button-color">
          <Bookmark className="h-3.5 w-3.5" />
          <span className="sr-only">Save</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
