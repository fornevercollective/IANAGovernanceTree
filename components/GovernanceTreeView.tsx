import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { FlowNode, FlowVisualization } from "./FlowVisualization";
import { TreeNodeProps } from "./VerticalTreeNode";
import { Badge } from "./ui/badge";

interface GovernanceTreeViewProps {
  data: Omit<TreeNodeProps, 'level' | 'onNodeSelect'>[];
  onNodeSelect: (node: TreeNodeProps) => void;
  selectedNode?: TreeNodeProps | null;
}

export function GovernanceTreeView({ data, onNodeSelect, selectedNode }: GovernanceTreeViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [flowNodes, setFlowNodes] = useState<FlowNode[]>([]);
  const [entityCounts, setEntityCounts] = useState<{ [key: string]: number }>({});
  const [filterBy, setFilterBy] = useState<string | null>(null);
  
  // Convert tree data to flow nodes format
  useEffect(() => {
    // Add null check for data
    if (!data || !Array.isArray(data)) {
      setFlowNodes([]);
      setEntityCounts({});
      return;
    }

    const convertToFlowNodes = (
      nodes: Omit<TreeNodeProps, 'level' | 'onNodeSelect'>[], 
      parentType: FlowNode['type'] = 'governance'
    ): FlowNode[] => {
      // Add null check here as well
      if (!nodes || !Array.isArray(nodes)) {
        return [];
      }

      return nodes.map(node => {
        // Determine the most appropriate type based on node content or name
        let nodeType: FlowNode['type'] = parentType;
        
        // Check if it's explicitly a CDN type
        if ('type' in node && node.type === 'cdn') {
          nodeType = 'cdn';
        }
        // Otherwise determine by name
        else if (node.name.includes('CDN') || node.name.includes('Cloudflare') || 
            node.name.includes('Akamai') || node.name.includes('Fastly') ||
            node.name.includes('CloudFront')) {
          nodeType = 'cdn';
        } 
        else if (node.name.includes('Registry') || node.name.includes('RIR')) {
          nodeType = 'registry';
        } else if (node.name.includes('IETF') || node.name.includes('Protocol')) {
          nodeType = 'technical';
        } else if (node.name.includes('Board') || node.name.includes('Committee')) {
          nodeType = 'regulatory';
        }
        
        return {
          id: node.id,
          type: nodeType,
          name: node.name,
          description: node.description,
          organization: node.name,
          expanded: expandedNodes.has(node.id),
          children: node.children ? convertToFlowNodes(node.children, nodeType) : undefined
        };
      });
    };
    
    setFlowNodes(convertToFlowNodes(data));
    
    // Count different entity types
    const countEntities = (
      nodes: Omit<TreeNodeProps, 'level' | 'onNodeSelect'>[]
    ): { [key: string]: number } => {
      const counts: { [key: string]: number } = {
        cdn: 0,
        registry: 0,
        technical: 0,
        regulatory: 0,
        governance: 0
      };
      
      const traverse = (nodes: Omit<TreeNodeProps, 'level' | 'onNodeSelect'>[]) => {
        if (!nodes || !Array.isArray(nodes)) return;
        
        for (const node of nodes) {
          // Check if it's a CDN
          if ('type' in node && node.type === 'cdn') {
            counts.cdn++;
          }
          else if (node.name.includes('CDN') || node.name.includes('Cloudflare') || 
              node.name.includes('Akamai') || node.name.includes('Fastly') ||
              node.name.includes('CloudFront')) {
            counts.cdn++;
          } 
          // Check other types
          else if (node.name.includes('Registry') || node.name.includes('RIR')) {
            counts.registry++;
          } else if (node.name.includes('IETF') || node.name.includes('Protocol')) {
            counts.technical++;
          } else if (node.name.includes('Board') || node.name.includes('Committee')) {
            counts.regulatory++;
          } else {
            counts.governance++;
          }
          
          // Recursively check children
          if (node.children) {
            traverse(node.children);
          }
        }
      };
      
      traverse(nodes);
      return counts;
    };
    
    setEntityCounts(countEntities(data));
  }, [data, expandedNodes]);
  
  // Filter tree data based on search term and entity filter
  const filterTree = (nodes: FlowNode[]): FlowNode[] => {
    // If no filter, return all nodes that match the search term
    if (!filterBy && !searchTerm.trim()) return nodes;
    
    return nodes.filter(node => {
      // Filter by entity type if set
      const matchesEntityFilter = !filterBy || node.type === filterBy;
      
      // Filter by search term if set
      const matchesSearch = !searchTerm.trim() || 
        node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (node.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
      
      // Check if any children match the criteria
      const hasMatchingChildren = node.children ? 
        filterTree(node.children).length > 0 : false;
      
      return (matchesEntityFilter && matchesSearch) || hasMatchingChildren;
    });
  };
  
  const filteredNodes = filterTree(flowNodes);
  
  const handleNodeSelect = (node: FlowNode) => {
    onNodeSelect({
      id: node.id,
      name: node.name,
      description: node.description,
      level: 0 // Default level
    });
  };
  
  const handleNodeExpand = (nodeId: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };
  
  const expandAllCDNs = () => {
    // First, identify all parent nodes that contain CDN children
    const findCDNParents = (nodes: FlowNode[], parentIds: Set<string>) => {
      for (const node of nodes) {
        if (node.type === 'cdn') {
          // Add all parent IDs
          for (const parentId of parentIds) {
            setExpandedNodes(prev => new Set([...prev, parentId]));
          }
        }
        
        if (node.children) {
          findCDNParents(node.children, new Set([...parentIds, node.id]));
        }
      }
    };
    
    findCDNParents(flowNodes, new Set());
  };
  
  const handleFilterClick = (type: string | null) => {
    setFilterBy(filterBy === type ? null : type);
  };
  
  return (
    <div className="w-full">
      {/* Lark-styled Search */}
      <div className="relative mb-4">
        <span className="lark-icon absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">sr</span>
        <Input
          placeholder="search governance entities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="lark-input-standard pl-10 font-mono"
        />
      </div>
      
      {/* Lark-styled Filter Badges */}
      <div className="mb-4 flex flex-wrap gap-2">
        <Badge 
          onClick={() => handleFilterClick('cdn')}
          variant={filterBy === 'cdn' ? "default" : "outline"} 
          className="lark-badge cursor-pointer hover:bg-accent transition-colors font-mono"
        >
          <span className="lark-icon mr-1">cd</span>
          cdns ({entityCounts.cdn || 0})
        </Badge>
        <Badge 
          onClick={() => handleFilterClick('registry')}
          variant={filterBy === 'registry' ? "default" : "outline"} 
          className="lark-badge cursor-pointer hover:bg-accent transition-colors font-mono"
        >
          <span className="lark-icon mr-1">rg</span>
          registries ({entityCounts.registry || 0})
        </Badge>
        <Badge 
          onClick={() => handleFilterClick('technical')}
          variant={filterBy === 'technical' ? "default" : "outline"} 
          className="lark-badge cursor-pointer hover:bg-accent transition-colors font-mono"
        >
          <span className="lark-icon mr-1">tc</span>
          technical ({entityCounts.technical || 0})
        </Badge>
        <Badge 
          onClick={() => handleFilterClick('regulatory')}
          variant={filterBy === 'regulatory' ? "default" : "outline"} 
          className="lark-badge cursor-pointer hover:bg-accent transition-colors font-mono"
        >
          <span className="lark-icon mr-1">ry</span>
          regulatory ({entityCounts.regulatory || 0})
        </Badge>
        <Badge 
          onClick={expandAllCDNs}
          variant="secondary" 
          className="lark-badge cursor-pointer ml-auto hover:bg-muted transition-colors font-mono animate-accent-line"
        >
          <span className="lark-icon mr-1">ex</span>
          expand all cdn paths
        </Badge>
      </div>
      
      {/* Flow Visualization Container */}
      <div className="governance-tree-container pb-6 lark-card bg-muted/20 border-dashed">
        <div className="flex items-center gap-2 mb-4 p-4 pb-0">
          <span className="lark-icon text-primary">fl</span>
          <h5 className="font-mono text-sm font-medium">governance flow diagram</h5>
          <p className="font-mono text-xs text-muted-foreground ml-auto">interactive hierarchy</p>
        </div>
        
        {filteredNodes.length > 0 ? (
          <FlowVisualization
            nodes={filteredNodes}
            onNodeSelect={handleNodeSelect}
            onNodeExpand={handleNodeExpand}
          />
        ) : (
          <div className="text-center py-8">
            <div className="lark-icon-sm bg-muted/50 rounded-full flex items-center justify-center w-12 h-12 mx-auto mb-3">
              <span className="lark-icon text-muted-foreground">?</span>
            </div>
            <p className="font-mono text-sm text-muted-foreground">no entities match your search criteria</p>
            <p className="font-mono text-xs text-muted-foreground mt-1">try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}