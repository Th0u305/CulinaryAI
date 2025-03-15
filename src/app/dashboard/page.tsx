"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ChevronRight, Heart, History, Plus, Settings, Bookmark, Bell } from 'lucide-react';

const Dashboard = () => {

  return (
    <div className="min-h-screen mt-48 pb-16 px-4">
      <div className="container mx-auto animate-fade-in">
        <div className="text-center mb-10">
          <h1 className="h-11 text-3xl font-bold tracking-tight mb-3 md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            My Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your recipes, preferences, and account settings
          </p>
        </div>
        
        <Tabs defaultValue="recipes" className="max-w-6xl mx-auto">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="recipes">My Recipes</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recipes" className="space-y-6">
            <div className="flex flex-wrap gap-4 mb-6">
              <Button variant="outline" className="flex items-center gap-2 button-color">
                <Bookmark className="h-4 w-4" />
                Saved Recipes
              </Button>
              <Button variant="outline" className="flex items-center gap-2 button-color">
                <Heart className="h-4 w-4" />
                Favorites
              </Button>
              <Button variant="outline" className="flex items-center gap-2 button-color">
                <History className="h-4 w-4" />
                Recipe History
              </Button>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">Saved Recipes</h2>
              <Button size="sm" variant="ghost" className="text-sm">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* {savedRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))} */}
              <Card className="flex flex-col items-center justify-center h-full min-h-[300px] border-dashed">
                <CardContent className="py-8 flex flex-col items-center text-center">
                  <div className="rounded-full bg-primary/10 p-3 mb-4">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">Add New Recipe</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create your own recipe or import from a website
                  </p>
                  <Button className='button-color bg-[#ff9e42] hover:bg-[#ff9e42]' size="sm">Create Recipe</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className='mt-6'>Dietary Preferences</CardTitle>
                <CardDescription>
                  Customize your recipe recommendations based on your dietary needs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="vegetarian" className="flex-grow">Vegetarian</Label>
                    <Switch id="vegetarian" />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="vegan" className="flex-grow">Vegan</Label>
                    <Switch id="vegan" />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="gluten-free" className="flex-grow">Gluten-Free</Label>
                    <Switch id="gluten-free" />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="dairy-free" className="flex-grow">Dairy-Free</Label>
                    <Switch id="dairy-free" />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="nut-free" className="flex-grow">Nut-Free</Label>
                    <Switch id="nut-free" />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="low-carb" className="flex-grow">Low-Carb</Label>
                    <Switch id="low-carb" />
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div>
                  <h3 className="text-sm font-medium mb-3">Excluded Ingredients</h3>
                  <Input placeholder="Add ingredients to exclude (e.g., mushrooms, shellfish)" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Separate multiple ingredients with commas
                  </p>
                </div>
                
                <Button className="mt-4  bg-[#ff9e42] hover:bg-[#ff9e42] button-color">Save Preferences</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className='mt-6'>Notification Settings</CardTitle>
                <CardDescription>
                  Manage how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label htmlFor="recipe-suggestions" className="flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      Recipe Suggestions
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Receive weekly recipe suggestions based on your preferences
                    </p>
                  </div>
                  <Switch id="recipe-suggestions" defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label htmlFor="email-updates" className="flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      Email Updates
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Receive our newsletter with cooking tips and new features
                    </p>
                  </div>
                  <Switch id="email-updates" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className='mt-6'>Profile Information</CardTitle>
                <CardDescription>
                  Update your account information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 mb-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback className="text-2xl">U</AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-2 flex-grow">
                    <Label htmlFor="profile-name">Name</Label>
                    <Input id="profile-name" defaultValue="User" />
                    
                    <Label htmlFor="profile-email" className="mt-4">Email</Label>
                    <Input id="profile-email" defaultValue="user@example.com" />
                    
                    <div className="pt-4">
                      <Button className=' bg-[#ff9e42] hover:bg-[#ff9e42] button-color'>Save Changes</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 mt-6">
                  <Settings className="h-5 w-5" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Button variant="outline" className="w-full sm:w-auto button-color">
                    Change Password
                  </Button>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Language Preference</h3>
                  <select className="w-full p-2 rounded-md border text-black dark:text-white dark:bg-black">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
                
                <Separator />
                
                <div>
                  <Button className='button-color' variant="destructive">Delete Account</Button>
                  <p className="text-sm text-muted-foreground mt-2">
                    This action cannot be undone. All your data will be permanently deleted.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
