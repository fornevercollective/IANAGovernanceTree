import React, { useState, useCallback } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { GovernanceTreeView } from "./GovernanceTreeView";
import { InfoPanel } from "./InfoPanel";
import { WebsiteTracer } from "./WebsiteTracer";
import { NetworkTools } from "./NetworkTools";
import { TreeNodeProps } from "./VerticalTreeNode";
import { mockGovernanceData } from "../lib/mockData";

interface GovernanceTabsProps {
  selectedNode?: TreeNodeProps | null;
  onNodeSelect?: (node: TreeNodeProps) => void;
  defaultTab?: string;
}

export function GovernanceTabs({ 
  selectedNode, 
  onNodeSelect, 
  defaultTab = "hierarchy" 
}: GovernanceTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleNodeSelect = useCallback((node: TreeNodeProps) => {
    if (onNodeSelect) {
      onNodeSelect(node);
    }
  }, [onNodeSelect]);

  const handleSelectGovernanceEntity = useCallback((id: string) => {
    // Find the selected entity in mock data and trigger node selection
    const findNode = (nodes: any[], targetId: string): TreeNodeProps | null => {
      for (const node of nodes) {
        if (node.id === targetId) {
          return node;
        }
        if (node.children) {
          const found = findNode(node.children, targetId);
          if (found) return found;
        }
      }
      return null;
    };

    const selectedEntity = findNode(mockGovernanceData, id);
    if (selectedEntity) {
      handleNodeSelect(selectedEntity);
    }
  }, [handleNodeSelect]);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header with Lark styling */}
      <div className="flex items-center mb-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="lark-icon-sm bg-primary/10 rounded-full flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10">
            <span className="lark-icon text-primary">gv</span>
          </div>
          <div>
            <h3 className="font-mono font-medium text-sm sm:text-base">governance explorer</h3>
            <p className="font-mono text-xs sm:text-sm text-muted-foreground">internet infrastructure hierarchy</p>
          </div>
        </div>
      </div>

      {/* Lark-styled Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-b mb-4">
          <TabsList className="bg-transparent border-0 p-0 h-auto space-x-0">
            <TabsTrigger 
              value="hierarchy"
              className="lark-nav-tab animate-underline data-[state=active]:lark-nav-tab-active data-[state=inactive]:lark-nav-tab-inactive"
            >
              <span className="lark-icon mr-2">gv</span>
              <span className="font-mono text-sm">governance structure</span>
            </TabsTrigger>
            <TabsTrigger 
              value="network-tools"
              className="lark-nav-tab animate-underline data-[state=active]:lark-nav-tab-active data-[state=inactive]:lark-nav-tab-inactive ml-6"
            >
              <span className="lark-icon mr-2">nt</span>
              <span className="font-mono text-sm">network tools</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Hierarchy Tab Content */}
        <TabsContent value="hierarchy" className="space-y-4 sm:space-y-6 mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Tree View */}
            <div className="lg:col-span-2">
              <div className="lark-card">
                <div className="flex items-center gap-2 mb-4">
                  <span className="lark-icon text-primary">tr</span>
                  <h4 className="font-mono text-sm font-medium">iana governance tree</h4>
                </div>
                <GovernanceTreeView 
                  data={mockGovernanceData}
                  onNodeSelect={handleNodeSelect}
                  selectedNode={selectedNode}
                />
              </div>
            </div>
            
            {/* Info Panel */}
            <div className="lg:col-span-1">
              <div className="lark-card">
                <div className="flex items-center gap-2 mb-4">
                  <span className="lark-icon text-primary">if</span>
                  <h4 className="font-mono text-sm font-medium">entity information</h4>
                </div>
                <InfoPanel selectedNode={selectedNode} />
              </div>
            </div>
          </div>

          {/* Website Tracer Integration */}
          <div className="lark-card">
            <div className="flex items-center gap-2 mb-4">
              <span className="lark-icon text-primary">wt</span>
              <h4 className="font-mono text-sm font-medium">website governance tracer</h4>
              <p className="font-mono text-xs text-muted-foreground ml-auto">trace dns &amp; cdn relationships</p>
            </div>
            <WebsiteTracer 
              onSelectGovernanceEntity={handleSelectGovernanceEntity}
              heroStyle={false}
            />
          </div>
        </TabsContent>

        {/* Network Tools Tab Content */}
        <TabsContent value="network-tools" className="space-y-4 sm:space-y-6 mt-0">
          <div className="lark-card">
            <div className="flex items-center gap-2 mb-4">
              <span className="lark-icon text-primary">nt</span>
              <h4 className="font-mono text-sm font-medium">network analysis tools</h4>
              <p className="font-mono text-xs text-muted-foreground ml-auto">infrastructure diagnostics</p>
            </div>
            <NetworkTools />
          </div>
        </TabsContent>
      </Tabs>

      {/* Selected Node Summary - Lark Style */}
      {selectedNode && (
        <div className="lark-card terminal-section-fade">
          <div className="flex items-center gap-2 mb-3">
            <span className="lark-icon text-success">sl</span>
            <h4 className="font-mono text-sm font-medium">selected entity</h4>
            <span className="lark-badge lark-badge-active ml-auto">{selectedNode.type}</span>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="lark-icon bg-primary/10 text-primary rounded px-1 flex-shrink-0 mt-0.5">
                {selectedNode.type === 'root' ? 'rt' : 
                 selectedNode.type === 'registry' ? 'rg' : 
                 selectedNode.type === 'registrar' ? 'ra' : 
                 selectedNode.type === 'cdn' ? 'cd' : 'nd'}
              </div>
              
              <div className="flex-grow min-w-0">
                <h5 className="font-mono text-sm font-medium truncate">{selectedNode.name}</h5>
                <p className="font-mono text-xs text-muted-foreground">{selectedNode.description}</p>
                
                {selectedNode.details && (
                  <div className="mt-2 text-xs font-mono text-muted-foreground space-y-1">
                    {selectedNode.details.jurisdiction && (
                      <div className="flex items-center gap-2">
                        <span className="lark-icon">lc</span>
                        <span>jurisdiction: {selectedNode.details.jurisdiction}</span>
                      </div>
                    )}
                    {selectedNode.details.established && (
                      <div className="flex items-center gap-2">
                        <span className="lark-icon">dt</span>
                        <span>established: {selectedNode.details.established}</span>
                      </div>
                    )}
                    {selectedNode.details.website && (
                      <div className="flex items-center gap-2">
                        <span className="lark-icon">gl</span>
                        <span className="truncate">{selectedNode.details.website}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}