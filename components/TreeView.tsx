
import React, { useState } from "react";
import { TreeNode, TreeNodeProps } from "./TreeNode";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

interface TreeViewProps {
  data: Omit<TreeNodeProps, 'level' | 'onNodeSelect'>[];
  onNodeSelect: (node: TreeNodeProps) => void;
}

export function TreeView({ data, onNodeSelect }: TreeViewProps) {
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
      
      <div className="tree-container">
        {filteredData.map((node) => (
          <TreeNode
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
