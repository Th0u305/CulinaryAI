import { Utensils } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="py-8 bg-muted/30 border-t p-5">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Utensils  className="h-6 w-6 text-green-500" />
            <span className="font-bold text-lg">CulinaryAI</span>
          </div>
          <div className="text-md text-muted-foreground">
            © {new Date().getFullYear()} CulinaryAI. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
