import React, { useState, useMemo } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export interface TreeMenuProps {
  onNodeSelect?: (nodeId: string, category?: string) => void;
  onToolExecute?: (toolId: string) => void;
  className?: string;
}

interface TreeNode {
  id: string;
  label: string;
  abbr: string;
  category?: string;
  children?: TreeNode[];
  isExecutable?: boolean;
}

export function TreeMenu({ onNodeSelect, onToolExecute, className = "" }: TreeMenuProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['network', 'security', 'ai', 'web', 'archives', 'governance']));
  const [searchTerm, setSearchTerm] = useState("");

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const handleNodeClick = (node: TreeNode) => {
    if (node.children && node.children.length > 0) {
      toggleNode(node.id);
    } else if (node.isExecutable && onToolExecute) {
      onToolExecute(node.id);
    } else if (onNodeSelect) {
      onNodeSelect(node.id, node.category);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const treeData: TreeNode[] = [
    {
      id: 'network',
      label: 'network analysis',
      abbr: 'net',
      category: 'network',
      children: [
        { 
          id: 'website-tracer', 
          label: 'website tracer', 
          abbr: 'tr',
          category: 'network',
          isExecutable: true 
        },
        { 
          id: 'dns-lookup', 
          label: 'dns lookup', 
          abbr: 'dn',
          category: 'network' 
        },
        { 
          id: 'port-scanner', 
          label: 'port scanner', 
          abbr: 'ps',
          category: 'network' 
        },
        { 
          id: 'network-diagnostics', 
          label: 'network diagnostics', 
          abbr: 'nd',
          category: 'network' 
        }
      ]
    },
    {
      id: 'security',
      label: 'security tools',
      abbr: 'sec',
      category: 'security',
      children: [
        { 
          id: 'pcap-analysis', 
          label: 'pcap analysis', 
          abbr: 'pc',
          category: 'security' 
        },
        { 
          id: 'hex-editor', 
          label: 'hex editor', 
          abbr: 'hx',
          category: 'security' 
        },
        { 
          id: 'cryptography', 
          label: 'cryptography', 
          abbr: 'cr',
          category: 'security' 
        },
        { 
          id: 'vulnerability-scanner', 
          label: 'vulnerability scanner', 
          abbr: 'vs',
          category: 'security' 
        },
        { 
          id: 'bug-bounty-tracker', 
          label: 'bug bounty tracker', 
          abbr: 'bb',
          category: 'security' 
        }
      ]
    },
    {
      id: 'ai',
      label: 'supadata ai tools',
      abbr: 'ai',
      category: 'ai',
      children: [
        { 
          id: 'ml-analysis', 
          label: 'ml analysis', 
          abbr: 'ml',
          category: 'ai' 
        },
        { 
          id: 'statistical-analysis', 
          label: 'statistical analysis', 
          abbr: 'st',
          category: 'ai' 
        },
        { 
          id: 'data-visualization', 
          label: 'data visualization', 
          abbr: 'dv',
          category: 'ai' 
        },
        { 
          id: 'text-processing', 
          label: 'text processing', 
          abbr: 'tx',
          category: 'ai' 
        },
        { 
          id: 'image-analysis', 
          label: 'image analysis', 
          abbr: 'im',
          category: 'ai' 
        },
        { 
          id: 'time-series', 
          label: 'time series analysis', 
          abbr: 'ts',
          category: 'ai' 
        },
        { 
          id: 'anomaly-detection', 
          label: 'anomaly detection', 
          abbr: 'ad',
          category: 'ai' 
        },
        { 
          id: 'clustering', 
          label: 'clustering', 
          abbr: 'cl',
          category: 'ai' 
        }
      ]
    },
    {
      id: 'web',
      label: 'web tools',
      abbr: 'web',
      category: 'web',
      children: [
        { 
          id: 'api-scraper', 
          label: 'api scraper', 
          abbr: 'as',
          category: 'web' 
        },
        { 
          id: 'site-cloner', 
          label: 'site cloner', 
          abbr: 'sc',
          category: 'web' 
        },
        { 
          id: 'social-blade', 
          label: 'socialblade metrics', 
          abbr: 'sb',
          category: 'web' 
        }
      ]
    },
    {
      id: 'archives',
      label: 'deep search & archives',
      abbr: 'arc',
      category: 'archives',
      children: [
        {
          id: 'reference',
          label: 'reference & dictionary',
          abbr: 'ref',
          category: 'archives',
          children: [
            { 
              id: 'dictionaries', 
              label: 'dictionaries', 
              abbr: 'dc',
              category: 'archives' 
            },
            { 
              id: 'thesaurus', 
              label: 'thesaurus', 
              abbr: 'th',
              category: 'archives' 
            },
            { 
              id: 'encyclopedia', 
              label: 'encyclopedia', 
              abbr: 'en',
              category: 'archives' 
            }
          ]
        },
        {
          id: 'digital-archives',
          label: 'digital archives',
          abbr: 'dig',
          category: 'archives',
          children: [
            { 
              id: 'wikipedia', 
              label: 'wikipedia', 
              abbr: 'wp',
              category: 'archives' 
            },
            { 
              id: 'library-congress', 
              label: 'library of congress', 
              abbr: 'lc',
              category: 'archives' 
            },
            { 
              id: 'internet-archive', 
              label: 'internet archive', 
              abbr: 'ia',
              category: 'archives' 
            },
            { 
              id: 'national-archives', 
              label: 'national archives', 
              abbr: 'na',
              category: 'archives' 
            }
          ]
        },
        {
          id: 'academic-research',
          label: 'academic & research',
          abbr: 'aca',
          category: 'archives',
          children: [
            { 
              id: 'academic-papers', 
              label: 'academic papers', 
              abbr: 'ap',
              category: 'archives' 
            },
            { 
              id: 'patents', 
              label: 'patent search', 
              abbr: 'pt',
              category: 'archives' 
            },
            { 
              id: 'legal', 
              label: 'legal database', 
              abbr: 'lg',
              category: 'archives' 
            }
          ]
        },
        {
          id: 'news-media',
          label: 'news & media',
          abbr: 'nws',
          category: 'archives',
          children: [
            { 
              id: 'news-archives', 
              label: 'news archives', 
              abbr: 'na',
              category: 'archives' 
            },
            { 
              id: 'newspapers', 
              label: 'historical newspapers', 
              abbr: 'hn',
              category: 'archives' 
            },
            { 
              id: 'media', 
              label: 'media collections', 
              abbr: 'mc',
              category: 'archives' 
            }
          ]
        }
      ]
    },
    {
      id: 'governance',
      label: 'internet governance',
      abbr: 'gov',
      category: 'governance',
      children: [
        { 
          id: 'iana-hierarchy', 
          label: 'iana hierarchy', 
          abbr: 'ih',
          category: 'governance' 
        },
        { 
          id: 'regional-registries', 
          label: 'regional registries', 
          abbr: 'rr',
          category: 'governance' 
        },
        { 
          id: 'cdn-providers', 
          label: 'cdn providers', 
          abbr: 'cd',
          category: 'governance' 
        }
      ]
    }
  ];

  // Filter and search logic
  const filteredTreeData = useMemo(() => {
    if (!searchTerm.trim()) {
      return treeData;
    }

    const searchLower = searchTerm.toLowerCase();
    
    const filterNode = (node: TreeNode): TreeNode | null => {
      const nodeMatches = node.label.toLowerCase().includes(searchLower) || 
                         node.abbr.toLowerCase().includes(searchLower) ||
                         node.id.toLowerCase().includes(searchLower);
      
      const filteredChildren = node.children?.map(child => filterNode(child)).filter(Boolean) as TreeNode[] || [];
      
      // Include node if it matches or has matching children
      if (nodeMatches || filteredChildren.length > 0) {
        return {
          ...node,
          children: filteredChildren.length > 0 ? filteredChildren : node.children
        };
      }
      
      return null;
    };

    return treeData.map(node => filterNode(node)).filter(Boolean) as TreeNode[];
  }, [searchTerm, treeData]);

  // Auto-expand nodes that have matches when searching
  React.useEffect(() => {
    if (searchTerm.trim()) {
      const expandedIds = new Set<string>();
      
      const collectExpandedIds = (nodes: TreeNode[]) => {
        nodes.forEach(node => {
          if (node.children && node.children.length > 0) {
            expandedIds.add(node.id);
            collectExpandedIds(node.children);
          }
        });
      };
      
      collectExpandedIds(filteredTreeData);
      setExpandedNodes(expandedIds);
    }
  }, [searchTerm, filteredTreeData]);

  const renderTreeNode = (node: TreeNode, level: number = 0) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const paddingLeft = level * 16 + 8;

    // Highlight matching text
    const highlightText = (text: string) => {
      if (!searchTerm.trim()) return text;
      
      const searchLower = searchTerm.toLowerCase();
      const textLower = text.toLowerCase();
      const index = textLower.indexOf(searchLower);
      
      if (index === -1) return text;
      
      return (
        <>
          {text.substring(0, index)}
          <span className="bg-terminal-cursor/20 text-terminal-cursor font-medium">
            {text.substring(index, index + searchTerm.length)}
          </span>
          {text.substring(index + searchTerm.length)}
        </>
      );
    };

    return (
      <div key={node.id}>
        <div
          className="lark-card-interactive warp-section-highlight"
          style={{ paddingLeft: `${paddingLeft}px` }}
          onClick={() => handleNodeClick(node)}
        >
          <div className="flex items-center gap-2 py-2">
            {hasChildren && (
              <span className="lark-icon text-muted-foreground">
                {isExpanded ? 'v' : '&gt;'}
              </span>
            )}
            {!hasChildren && <div className="w-4 h-4" />}
            
            <div className="flex items-center justify-center">
              {hasChildren ? (
                <span className="lark-icon text-muted-foreground">
                  {isExpanded ? '□' : '■'}
                </span>
              ) : (
                <div className="lark-icon bg-primary/10 text-primary rounded px-1">
                  {node.abbr}
                </div>
              )}
            </div>
            
            <span className="font-mono text-sm font-medium text-foreground flex-grow">
              {highlightText(node.label)}
            </span>
            
            {!hasChildren && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="lark-button-abbreviation opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  if (node.isExecutable && onToolExecute) {
                    onToolExecute(node.id);
                  } else if (onNodeSelect) {
                    onNodeSelect(node.id, node.category);
                  }
                }}
              >
                <span className="lark-icon">&gt;</span>
              </Button>
            )}
          </div>
        </div>
        
        {hasChildren && isExpanded && (
          <div className="space-y-1 terminal-section-fade">
            {node.children!.map(child => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`lark-card ${className}`}>
      {/* Search Input Section */}
      <div className="p-4 border-b border-border/40">
        <div className="flex items-center gap-2 mb-2">
          <span className="lark-icon text-primary">sr</span>
          <h4 className="font-mono text-sm font-medium">tool search</h4>
          <p className="font-mono text-xs text-muted-foreground ml-auto">find tools & workflows</p>
        </div>
        
        <div className="relative">
          <span className="lark-icon absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">?</span>
          <Input
            placeholder="search tools, categories, or abbreviations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="lark-input-standard pl-10 pr-10 font-mono"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="lark-button-abbreviation absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 hover:bg-muted/50"
              title="Clear search"
            >
              <span className="lark-icon text-muted-foreground">×</span>
            </button>
          )}
        </div>
        
        {/* Search Results Summary */}
        {searchTerm.trim() && (
          <div className="mt-2 flex items-center gap-2">
            <span className="lark-icon text-terminal-cursor">→</span>
            <p className="font-mono text-xs text-muted-foreground">
              {filteredTreeData.length === 0 
                ? "no tools match your search"
                : `${filteredTreeData.length} ${filteredTreeData.length === 1 ? 'category' : 'categories'} found`
              }
            </p>
            {filteredTreeData.length > 0 && (
              <span className="lark-badge ml-auto">
                {filteredTreeData.reduce((count, node) => 
                  count + (node.children?.length || 0), 0
                )} tools
              </span>
            )}
          </div>
        )}
      </div>
      
      {/* Tree List */}
      <div className="space-y-1 max-h-96 overflow-y-auto p-4">
        {filteredTreeData.length > 0 ? (
          filteredTreeData.map(node => renderTreeNode(node))
        ) : searchTerm.trim() ? (
          <div className="text-center py-8">
            <div className="lark-icon-sm bg-muted/50 rounded-full flex items-center justify-center w-12 h-12 mx-auto mb-3">
              <span className="lark-icon text-muted-foreground">?</span>
            </div>
            <p className="font-mono text-sm text-muted-foreground">no tools match "{searchTerm}"</p>
            <p className="font-mono text-xs text-muted-foreground mt-1">try different keywords or abbreviations</p>
            <button
              onClick={clearSearch}
              className="lark-button-ghost mt-3 animate-accent-line"
            >
              <span className="lark-icon mr-1">cl</span>
              <span className="font-mono text-xs">clear search</span>
            </button>
          </div>
        ) : (
          treeData.map(node => renderTreeNode(node))
        )}
      </div>
    </div>
  );
}