import React, { useState } from "react";
import { 
  ChevronRight, 
  ChevronDown,
  Network, 
  Globe, 
  Server, 
  Database, 
  Shield, 
  Brain, 
  BarChart4, 
  FileDigit, 
  HexagonIcon, 
  Key, 
  ShieldAlert, 
  Trophy, 
  Brackets,
  TrendingUp,
  PieChart,
  FileText,
  Image,
  Clock,
  Zap,
  Target,
  GitBranch,
  Copy,
  Search,
  Settings,
  Folder,
  FolderOpen,
  Play,
  Laptop
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface TreeNode {
  id: string;
  label: string;
  icon: React.ReactNode;
  category?: string;
  description?: string;
  children?: TreeNode[];
  action?: () => void;
  badge?: string;
  isExpanded?: boolean;
}

interface TreeMenuProps {
  onNodeSelect?: (nodeId: string, category?: string) => void;
  onToolExecute?: (toolId: string) => void;
  className?: string;
}

export function TreeMenu({ onNodeSelect, onToolExecute, className = "" }: TreeMenuProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    new Set(['network-analysis', 'data-processing', 'security-tools'])
  );

  const treeData: TreeNode[] = [
    {
      id: 'network-analysis',
      label: 'Network Analysis',
      icon: <Network className="size-4" />,
      description: 'Infrastructure and connectivity analysis',
      children: [
        {
          id: 'website-tracer',
          label: 'Website Tracer',
          icon: <Laptop className="size-4" />,
          category: 'network',
          description: 'Trace website infrastructure',
          action: () => onToolExecute?.('website-tracer')
        },
        {
          id: 'dns-lookup',
          label: 'DNS Lookup',
          icon: <Globe className="size-4" />,
          category: 'network',
          description: 'DNS resolution analysis'
        },
        {
          id: 'port-scanner',
          label: 'Port Scanner',
          icon: <Server className="size-4" />,
          category: 'network',
          description: 'Network port analysis'
        },
        {
          id: 'network-topology',
          label: 'Network Topology',
          icon: <Target className="size-4" />,
          category: 'network',
          description: 'Network structure mapping'
        }
      ]
    },
    {
      id: 'data-processing',
      label: 'Data Processing',
      icon: <Brain className="size-4" />,
      description: 'AI and machine learning tools',
      children: [
        {
          id: 'ml-analysis',
          label: 'Machine Learning',
          icon: <Brain className="size-4" />,
          category: 'ai',
          description: 'ML model training and analysis',
          action: () => onToolExecute?.('ml-analysis')
        },
        {
          id: 'statistical-analysis',
          label: 'Statistical Analysis',
          icon: <TrendingUp className="size-4" />,
          category: 'ai',
          description: 'Statistical data analysis'
        },
        {
          id: 'data-visualization',
          label: 'Data Visualization',
          icon: <PieChart className="size-4" />,
          category: 'ai',
          description: 'Interactive charts and graphs'
        },
        {
          id: 'text-processing',
          label: 'Text Processing',
          icon: <FileText className="size-4" />,
          category: 'ai',
          description: 'Natural language processing'
        },
        {
          id: 'image-analysis',
          label: 'Image Analysis',
          icon: <Image className="size-4" />,
          category: 'ai',
          description: 'Computer vision and OCR'
        },
        {
          id: 'time-series',
          label: 'Time Series',
          icon: <Clock className="size-4" />,
          category: 'ai',
          description: 'Temporal data analysis'
        },
        {
          id: 'anomaly-detection',
          label: 'Anomaly Detection',
          icon: <Zap className="size-4" />,
          category: 'ai',
          description: 'Outlier and anomaly identification'
        },
        {
          id: 'clustering',
          label: 'Clustering',
          icon: <GitBranch className="size-4" />,
          category: 'ai',
          description: 'Data clustering algorithms'
        }
      ]
    },
    {
      id: 'security-tools',
      label: 'Security Tools',
      icon: <Shield className="size-4" />,
      description: 'Cybersecurity and penetration testing',
      children: [
        {
          id: 'pcap-analysis',
          label: 'PCAP Analysis',
          icon: <FileDigit className="size-4" />,
          category: 'security',
          description: 'Network packet analysis'
        },
        {
          id: 'hex-editor',
          label: 'Hex Editor',
          icon: <HexagonIcon className="size-4" />,
          category: 'security',
          description: 'Binary file examination'
        },
        {
          id: 'cryptography',
          label: 'Cryptography',
          icon: <Key className="size-4" />,
          category: 'security',
          description: 'Encryption and decryption tools'
        },
        {
          id: 'vulnerability-scanner',
          label: 'Vulnerability Scanner',
          icon: <ShieldAlert className="size-4" />,
          category: 'security',
          description: 'Security vulnerability assessment'
        },
        {
          id: 'bug-bounty-tracker',
          label: 'Bug Bounty Tracker',
          icon: <Trophy className="size-4" />,
          category: 'security',
          description: 'Bug bounty program management'
        }
      ]
    },
    {
      id: 'web-tools',
      label: 'Web Tools',
      icon: <Globe className="size-4" />,
      description: 'Web scraping and analysis',
      children: [
        {
          id: 'api-scraper',
          label: 'API Scraper',
          icon: <Brackets className="size-4" />,
          category: 'web',
          description: 'API endpoint analysis'
        },
        {
          id: 'site-cloner',
          label: 'Site Cloner',
          icon: <Copy className="size-4" />,
          category: 'web',
          description: 'Website cloning tool'
        },
        {
          id: 'social-blade',
          label: 'Social Metrics',
          icon: <BarChart4 className="size-4" />,
          category: 'web',
          description: 'Social media analytics'
        }
      ]
    },
    {
      id: 'governance',
      label: 'Governance Structure',
      icon: <Database className="size-4" />,
      description: 'Internet governance and registry data',
      children: [
        {
          id: 'iana-hierarchy',
          label: 'IANA Hierarchy',
          icon: <Network className="size-4" />,
          category: 'governance',
          description: 'Internet governance structure'
        },
        {
          id: 'registry-data',
          label: 'Registry Data',
          icon: <Database className="size-4" />,
          category: 'governance',
          description: 'Domain and IP registries'
        },
        {
          id: 'cdn-mapping',
          label: 'CDN Mapping',
          icon: <Server className="size-4" />,
          category: 'governance',
          description: 'Content delivery networks'
        }
      ]
    },
    {
      id: 'automation',
      label: 'Automation',
      icon: <Settings className="size-4" />,
      description: 'Workflow automation and scheduling',
      badge: 'Pro',
      children: [
        {
          id: 'workflow-builder',
          label: 'Workflow Builder',
          icon: <Play className="size-4" />,
          category: 'automation',
          description: 'Visual workflow creation'
        },
        {
          id: 'scheduler',
          label: 'Task Scheduler',
          icon: <Clock className="size-4" />,
          category: 'automation',
          description: 'Automated task execution'
        }
      ]
    }
  ];

  const toggleNode = (nodeId: string) => {
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

  const handleNodeClick = (node: TreeNode) => {
    if (node.children && node.children.length > 0) {
      toggleNode(node.id);
    } else {
      onNodeSelect?.(node.id, node.category);
      if (node.action) {
        node.action();
      }
    }
  };

  const renderTreeNode = (node: TreeNode, level: number = 0) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const paddingLeft = level * 12 + 8;

    return (
      <div key={node.id} className="select-none">
        <div
          className={`
            flex items-center gap-2 py-2 px-2 rounded-md cursor-pointer
            hover:bg-muted/50 transition-colors group
            ${!hasChildren ? 'hover:bg-primary/5' : ''}
          `}
          style={{ paddingLeft: `${paddingLeft}px` }}
          onClick={() => handleNodeClick(node)}
        >
          {hasChildren && (
            <div className="flex items-center justify-center w-4 h-4">
              {isExpanded ? (
                <ChevronDown className="size-3 text-muted-foreground" />
              ) : (
                <ChevronRight className="size-3 text-muted-foreground" />
              )}
            </div>
          )}
          
          {!hasChildren && (
            <div className="w-4 h-4" />
          )}
          
          <div className={`
            flex items-center justify-center w-6 h-6 rounded
            ${hasChildren ? 'text-muted-foreground' : 'text-primary bg-primary/10'}
          `}>
            {hasChildren ? (
              isExpanded ? <FolderOpen className="size-4" /> : <Folder className="size-4" />
            ) : (
              node.icon
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className={`
                text-sm truncate
                ${hasChildren ? 'font-medium text-foreground' : 'text-foreground'}
              `}>
                {node.label}
              </span>
              {node.badge && (
                <Badge variant="secondary" className="text-xs px-1.5 py-0">
                  {node.badge}
                </Badge>
              )}
            </div>
            {node.description && (
              <div className="text-xs text-muted-foreground truncate">
                {node.description}
              </div>
            )}
          </div>
          
          {!hasChildren && (
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
              onClick={(e) => {
                e.stopPropagation();
                if (node.action) {
                  node.action();
                }
              }}
            >
              <Play className="size-3" />
            </Button>
          )}
        </div>
        
        {hasChildren && isExpanded && (
          <div className="space-y-1">
            {node.children!.map(child => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className={`${className} bg-card/50 backdrop-blur-sm`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Network className="size-4 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Operations Tree</h3>
              <p className="text-xs text-muted-foreground">Available tools and workflows</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Search className="size-4" />
          </Button>
        </div>
        
        <div className="space-y-1 max-h-80 overflow-y-auto">
          {treeData.map(node => renderTreeNode(node))}
        </div>
        
        <div className="mt-4 pt-3 border-t text-center">
          <p className="text-xs text-muted-foreground">
            Select an operation to get started
          </p>
        </div>
      </div>
    </Card>
  );
}