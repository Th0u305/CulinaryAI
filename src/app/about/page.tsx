import { ChefHat, Award, Leaf, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <div className="min-h-screen mt-48 pb-16 px-4">
      <div className="container mx-auto animate-fade-in">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight mb-3 md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            About CulinaryAI
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We re passionate about making cooking more accessible, efficient, and enjoyable for everyone
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Our Story</h2>
            <p className="text-muted-foreground">
              CulinaryAI began with a simple idea: help people make the most of ingredients they already have. Our founder, frustrated with food waste and uninspired meals, created a tool that transforms random pantry items into delicious recipes.
            </p>
            <p className="text-muted-foreground">
              Today, we re a team of food enthusiasts, technology experts, and sustainability advocates working together to revolutionize how people approach cooking at home.
            </p>
            
            <h2 className="text-2xl font-semibold pt-4">Our Mission</h2>
            <p className="text-muted-foreground">
              We re on a mission to reduce food waste, inspire culinary creativity, and make cooking more accessible for everyone, regardless of their skill level or time constraints.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="glass-card">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <ChefHat className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">Recipe Innovation</h3>
                  <p className="text-sm text-muted-foreground">
                    Continuously developing new recipes and culinary techniques
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">Quality First</h3>
                  <p className="text-sm text-muted-foreground">
                    Ensuring all recipes are thoroughly tested and delicious
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Leaf className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">Sustainability</h3>
                  <p className="text-sm text-muted-foreground">
                    Reducing food waste through smart ingredient use
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">Time-Saving</h3>
                  <p className="text-sm text-muted-foreground">
                    Creating efficient recipes that respect your time
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
