
import React, { useState } from "react";
import { VerticalTreeNode, TreeNodeProps } from "./VerticalTreeNode";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

interface VerticalTreeViewProps {
  data: Omit<TreeNodeProps, 'level' | 'onNodeSelect'>[];
  onNodeSelect: (node: TreeNodeProps) => void;
}

export function VerticalTreeView({ data, onNodeSelect }: VerticalTreeViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter tree data based on search term
  const filterTree = (nodes: Omit<TreeNodeProps, 'level' | 'onNodeSelect'>[]) => {
    if (!searchTerm.trim()) return nodes;
    
    return nodes.filter(node => {
      const matchesSearch = node.name.toLowerCase().includes(searchTerm.toLowerCase());
      const hasMatchingChildren = node.children ? 
        filterTree(node.children).length > 0 : false;
      
      return matchesSearch || hasMatchingChildren;
    });
  };
  
  const filteredData = filterTree(data);
  
  return (
    <div className="w-full">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
        <Input
          placeholder="Search governance entities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <div className="vertical-tree-container border-l border-border/50 ml-3 pb-6">
        {filteredData.map((node) => (
          <VerticalTreeNode
            key={node.id}
            {...node}
            level={0}
            onNodeSelect={onNodeSelect}
          />
        ))}
      </div>
    </div>
  );
}
