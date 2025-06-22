
import React from "react";
import { Network, Sun, Moon, Github } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

export function Header({ toggleTheme, isDarkMode }: HeaderProps) {
  return (
    <header className="border-b py-3 px-4 bg-card">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Network className="size-6 text-primary" />
          <h1 className="font-medium">IANA Governance Tree</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme} 
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            title="View source on GitHub"
            onClick={() => window.open("https://github.com/fornevercollective/IANAGovernanceTree", "_blank")}
          >
            <Github className="size-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
