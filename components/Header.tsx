import React from "react";
import { Button } from "./ui/button";

interface HeaderProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

export function Header({ toggleTheme, isDarkMode }: HeaderProps) {
  return (
    <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="lark-icon-sm bg-primary/10 rounded-full flex items-center justify-center w-8 h-8">
              <span className="lark-icon text-primary">.\</span>
            </div>
            <div>
              <h1 className="lark-brand">lark</h1>
              <p className="lark-tagline">tree</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleTheme}
            className="lark-button-abbreviation animate-accent-line"
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <span className="lark-icon">{isDarkMode ? '☀' : '☾'}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="lark-button-abbreviation animate-accent-line"
            title="Settings"
          >
            <span className="lark-icon">st</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="lark-button-abbreviation animate-accent-line"
            title="Help"
          >
            <span className="lark-icon">.\</span>
          </Button>
        </div>
      </div>
    </header>
  );
}