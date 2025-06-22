
import React, { useState, useCallback } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { GovernanceTreeView } from "./GovernanceTreeView";
import { InfoPanel } from "./InfoPanel";
import { WebsiteTracer } from "./WebsiteTracer";
import { NetworkTools } from "./NetworkTools";
import { TreeNodeProps } from "./VerticalTreeNode";
import { mockGovernanceData } from "../lib/mockData";
import { Network, Activity, Globe } from "lucide-react";

interface GovernanceTabsProps {
  selectedNode: TreeNodeProps | null;
  onNodeSelect: (node: TreeNodeProps) => void;
  defaultTab?: string;
}

export function GovernanceTabs({ selectedNode, onNodeSelect, defaultTab = "hierarchy" }: GovernanceTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  // Handle the selection of a governance entity by ID from the website tracer
  const handleSelectGovernanceEntity = useCallback((id: string) => {
    // Find the node with the matching ID in the governance tree
    const findNodeById = (
      nodes: Omit<TreeNodeProps, 'level' | 'onNodeSelect'>[],
      searchId: string
    ): Omit<TreeNodeProps, 'level' | 'onNodeSelect'> | null => {
      for (const node of nodes) {
        if (node.id === searchId) {
          return node;
        }
        if (node.children) {
          const found = findNodeById(node.children, searchId);
          if (found) return found;
        }
      }
      return null;
    };

    const node = findNodeById(mockGovernanceData, id);
    if (node) {
      // Switch to the hierarchy tab to show the selected node
      setActiveTab("hierarchy");
      // Pass the node to the parent component with level 0
      onNodeSelect({ ...node, level: 0 });
    }
  }, [onNodeSelect]);
  
  return (
    <Tabs 
      value={activeTab} 
      onValueChange={setActiveTab}
    >
      <div className="flex items-center mb-4">
        <TabsList>
          <TabsTrigger value="hierarchy">
            <Network className="size-4 mr-1.5" />
            Governance Structure
          </TabsTrigger>
          <TabsTrigger value="network-tools">
            <Activity className="size-4 mr-1.5" />
            Network Tools
          </TabsTrigger>
        </TabsList>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className={activeTab === "network-tools" ? "md:col-span-3" : "md:col-span-2"}>
          <TabsContent value="hierarchy" className="mt-0">
            <GovernanceTreeView 
              data={mockGovernanceData} 
              onNodeSelect={onNodeSelect} 
            />
          </TabsContent>
          
          <TabsContent value="network-tools" className="mt-0">
            <NetworkTools />
          </TabsContent>
        </div>
        
        {activeTab !== "network-tools" && (
          <div className="md:col-span-1">
            <InfoPanel selectedNode={selectedNode} />
          </div>
        )}
      </div>
    </Tabs>
  );
}
