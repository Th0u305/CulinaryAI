
'use client';

import { useState, useRef, KeyboardEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IngredientInputProps {
  onIngredientsChange: (ingredients: string[]) => void;
}

const IngredientInput = ({ onIngredientsChange }: IngredientInputProps) => {
  const [ingredients, setIngredients] = useState<string[]>(['chicken', 'garlic', 'olive oil']);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const addIngredient = () => {
    if (inputValue.trim() && !ingredients.includes(inputValue.trim().toLowerCase())) {
      const newIngredients = [...ingredients, inputValue.trim().toLowerCase()];
      setIngredients(newIngredients);
      onIngredientsChange(newIngredients);
      setInputValue('');
    }
    inputRef.current?.focus();
  };

  const removeIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
    onIngredientsChange(newIngredients);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient();
    } else if (e.key === 'Backspace' && inputValue === '' && ingredients.length > 0) {
      const newIngredients = ingredients.slice(0, -1);
      setIngredients(newIngredients);
      onIngredientsChange(newIngredients);
    }
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center space-x-2">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Add an ingredient..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          required
          className="flex-grow"
        />
        <Button onClick={addIngredient} aria-label="Add ingredient" className='button-color text-white hover:bg-[#ff9a2e] bg-[#ff9a2e] active:bg-[#e09c53]'>
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2 min-h-[3rem] p-2 bg-background/50 backdrop-blur-sm rounded-lg border">
        {ingredients.length > 0 ? (
          ingredients.map((ingredient, index) => (
            <div
              key={index}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium bg-primary/10  dark:text-white dark:bg-primary/20",
                "flex items-center gap-1.5 animate-fade-in"
              )}
            >
              {ingredient}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeIngredient(index)}
                className="h-4 w-4 p-0 rounded-full hover:bg-primary/20 "
                aria-label={`Remove ${ingredient}`}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))
        ) : (
          <div className="text-muted-foreground text-sm italic px-2 py-1">
            Add ingredients to find matching recipes
          </div>
        )}
      </div>
    </div>
  );
};

export default IngredientInput;
