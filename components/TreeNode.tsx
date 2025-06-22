
import React, { useState } from "react";
import { ChevronRight, ChevronDown, Info } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "./ui/utils";

export interface TreeNodeProps {
  id: string;
  name: string;
  description?: string;
  children?: TreeNodeProps[];
  level: number;
  onNodeSelect: (node: TreeNodeProps) => void;
}

export function TreeNode({ id, name, description, children, level, onNodeSelect }: TreeNodeProps) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = children && children.length > 0;
  
  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };
  
  const handleNodeClick = () => {
    onNodeSelect({ id, name, description, children, level });
  };

  return (
    <div className="w-full">
      <div 
        className={cn(
          "flex items-center p-2 rounded-md cursor-pointer hover:bg-accent/50 transition-colors",
          "border-l-2 border-transparent hover:border-primary/50"
        )}
        onClick={handleNodeClick}
      >
        <div style={{ marginLeft: `${level * 16}px` }} className="flex items-center gap-2 w-full">
          {hasChildren ? (
            <Button 
              variant="ghost" 
              size="icon" 
              className="size-6 p-0.5" 
              onClick={toggleExpand}
            >
              {expanded ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
            </Button>
          ) : (
            <div className="size-6"></div>
          )}
          
          <span className="flex-grow">{name}</span>
          
          {description && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="size-6 p-0.5 opacity-50 hover:opacity-100" 
              onClick={(e) => {
                e.stopPropagation();
                onNodeSelect({ id, name, description, children, level });
              }}
            >
              <Info className="size-4" />
            </Button>
          )}
        </div>
      </div>
      
      {expanded && hasChildren && (
        <div className="tree-children">
          {children.map((child) => (
            <TreeNode 
              key={child.id} 
              {...child} 
              level={level + 1}
              onNodeSelect={onNodeSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}
