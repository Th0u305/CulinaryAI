import React from "react";
import { Button } from "../ui/button";

const Middle = () => {
  return (
    <section className="mt-28">
      <div className="max-w-6xl mx-auto p-5">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Why Use Our Recipe Generator?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary text-2xl">🥗</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Reduce Food Waste</h3>
            <p className="text-muted-foreground">
              Use ingredients you already have and reduce food waste in your
              kitchen.
            </p>
          </div>
          <div className="bg-card rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-secondary text-2xl">⏱️</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Save Time</h3>
            <p className="text-muted-foreground">
              No more searching through cookbooks or websites for recipe ideas.
            </p>
          </div>
          <div className="bg-card rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-accent text-2xl">🍽️</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Discover New Recipes</h3>
            <p className="text-muted-foreground">
              Expand your culinary repertoire with new recipe suggestions.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="mt-28 py-16 text-white bg-gradient-to-br from-[#1eb058] to-[#008a7a] dark:bg-gradient-to-tr dark:from-[#1d293b] dark:to-[#101629]">
        <div className="text-center max-w-6xl mx-auto p-5">
          <h2 className="text-4xl font-bold mb-4 ">
            Ready to Transform Your Cooking?
          </h2>
          <p className="max-w-2xl mx-auto mb-8">
            Join thousands of home cooks who have revolutionized their meal
            planning.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              className="text-md bg-white text-green-600 hover:bg-white button-color"
            >
              Sign Up Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-md border-white text-[#ff9e42] hover:bg-white/10 button-color"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Middle;
