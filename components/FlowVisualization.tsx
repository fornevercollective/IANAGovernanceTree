
import React from "react";
import { Globe, Server, Database, NetworkIcon, Info, ChevronRight, Cloud, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export interface FlowNode {
  id: string;
  type: 'dns' | 'ip' | 'cdn' | 'server' | 'registry' | 'org' | 'governance' | 'regulatory' | 'technical';
  name: string;
  description?: string;
  ipAddress?: string;
  location?: string;
  organization?: string;
  governanceEntityId?: string;
  latency?: number;
  hops?: number;
  children?: FlowNode[];
  expanded?: boolean;
}

interface FlowVisualizationProps {
  nodes: FlowNode[];
  onNodeSelect?: (node: FlowNode) => void;
  onNodeExpand?: (nodeId: string) => void;
  showConnectionLines?: boolean;
  showMetrics?: boolean;
}

export function FlowVisualization({ 
  nodes, 
  onNodeSelect, 
  onNodeExpand,
  showConnectionLines = true,
  showMetrics = false
}: FlowVisualizationProps) {
  
  const getIconForType = (type: FlowNode['type']) => {
    switch (type) {
      case 'dns': return <Globe className="size-5" />;
      case 'ip': return <NetworkIcon className="size-5" />;
      case 'cdn': return <Cloud className="size-5" />;
      case 'server': return <Server className="size-5" />;
      case 'registry': return <Database className="size-5" />;
      case 'org': return <Globe className="size-5" />;
      case 'governance': return <Globe className="size-5" />;
      case 'regulatory': return <Database className="size-5" />;
      case 'technical': return <Share2 className="size-5" />;
      default: return <Globe className="size-5" />;
    }
  };

  const getNodeBackgroundClass = (type: FlowNode['type']) => {
    switch (type) {
      case 'cdn': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300';
      case 'registry': return 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300';
      case 'technical': return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300';
      case 'regulatory': return 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const renderNode = (node: FlowNode, index: number, isLast: boolean) => {
    const hasChildren = node.children && node.children.length > 0;
    const isCDN = node.type === 'cdn';
    
    return (
      <div key={node.id} className="flow-node">
        <div className={`flex items-center gap-3 mb-2 ${isCDN ? 'border-l-4 border-blue-400 pl-2 dark:border-blue-600' : ''}`}>
          <div className={`size-10 rounded-full flex items-center justify-center ${
            node.governanceEntityId 
              ? 'bg-primary/10 text-primary' 
              : getNodeBackgroundClass(node.type)
          }`}>
            {getIconForType(node.type)}
          </div>
          
          <div className="flex-grow">
            <div className="flex items-center justify-between">
              <div className="font-medium flex items-center gap-2">
                {node.name}
                {node.type === 'cdn' && (
                  <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800">
                    CDN
                  </Badge>
                )}
              </div>
              {showMetrics && node.latency !== undefined && (
                <Badge variant="secondary">{node.latency}ms</Badge>
              )}
            </div>
            {node.description && (
              <div className="text-sm text-muted-foreground">{node.description}</div>
            )}
            {node.ipAddress && <div className="text-xs font-mono">{node.ipAddress}</div>}
            {node.organization && !node.ipAddress && (
              <div className="text-sm text-muted-foreground">{node.organization}</div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {hasChildren && onNodeExpand && (
              <Button 
                variant="ghost" 
                size="icon"
                className="size-8"
                onClick={() => onNodeExpand(node.id)}
              >
                <ChevronRight className={`size-4 transition-transform ${node.expanded ? 'rotate-90' : ''}`} />
              </Button>
            )}
            
            {onNodeSelect && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onNodeSelect(node)}
                className="whitespace-nowrap"
              >
                <Info className="size-4 mr-1" />
                Details
              </Button>
            )}
          </div>
        </div>
        
        {/* Connection line to next node */}
        {showConnectionLines && !isLast && (
          <div className="ml-5 h-8 w-px bg-border"></div>
        )}
        
        {/* Children nodes if expanded */}
        {node.expanded && node.children && (
          <div className={`pl-10 mt-2 space-y-3 border-l ${
            isCDN ? 'border-blue-200 dark:border-blue-800' : 'border-dashed border-border'
          } ml-5`}>
            {node.children.map((child, childIndex) => 
              renderNode(child, childIndex, childIndex === (node.children?.length || 0) - 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flow-visualization space-y-3">
      {nodes.map((node, index) => 
        renderNode(node, index, index === nodes.length - 1)
      )}
      {nodes.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No entities found matching the current filters.
        </div>
      )}
    </div>
  );
}
