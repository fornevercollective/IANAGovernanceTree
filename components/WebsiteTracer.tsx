import React, { useState } from "react";
import { Search, Loader2, Globe, ExternalLink, Terminal, LineChart, BarChart4, Database, Server, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { FlowVisualization, FlowNode } from "./FlowVisualization";
import { TerminalOutput } from "./TerminalOutput";

interface TraceRoute {
  nodes: FlowNode[];
  totalTime: number;
  status: 'success' | 'partial' | 'failed';
}

interface WebsiteTracerProps {
  onSelectGovernanceEntity: (id: string) => void;
  className?: string;
  heroStyle?: boolean;
}

export function WebsiteTracer({ 
  onSelectGovernanceEntity, 
  className = "",
  heroStyle = false
}: WebsiteTracerProps) {
  const [url, setUrl] = useState("");
  const [isTracing, setIsTracing] = useState(false);
  const [traceResult, setTraceResult] = useState<TraceRoute | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [isHeroExpanded, setIsHeroExpanded] = useState(true);
  
  const handleTrace = async () => {
    if (!url) return;
    
    setIsTracing(true);
    setError(null);
    setExpandedNodes(new Set());
    
    try {
      // In a real app, this would be an API call to trace the website
      // For now, we'll simulate with mock data
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock trace result with expanded hierarchical data structure
      const mockTraceNodes: FlowNode[] = [
        {
          id: 'userRequest',
          type: 'org',
          name: 'User Request',
          description: 'Initial website request from user',
          children: [
            {
              id: 'step1',
              type: 'dns',
              name: 'Root DNS Server',
              description: 'Root DNS server operated by ICANN',
              ipAddress: '198.41.0.4',
              organization: 'ICANN',
              governanceEntityId: '1', // References ICANN in the governance tree
              latency: 35,
              children: [
                {
                  id: 'step1-1',
                  type: 'dns',
                  name: 'Root Zone Database',
                  description: 'IANA Root Zone Database',
                  organization: 'IANA Functions Operator',
                  governanceEntityId: '1.1',
                  latency: 5,
                }
              ]
            },
            {
              id: 'step2',
              type: 'dns',
              name: 'TLD DNS Server (.com)',
              description: 'Top Level Domain server for .com domains',
              ipAddress: '192.5.6.30',
              organization: 'Verisign',
              governanceEntityId: '1.1.2', // References Root Zone Management in the governance tree
              latency: 48,
            },
            {
              id: 'step3',
              type: 'dns',
              name: 'Authoritative DNS Server',
              description: 'Name server responsible for the domain',
              ipAddress: '104.16.100.52',
              organization: 'CloudFlare DNS',
              latency: 62,
            },
            {
              id: 'step4',
              type: 'cdn',
              name: 'CDN Edge Server',
              description: 'Content delivery network edge location',
              ipAddress: '104.18.22.41',
              location: 'Amsterdam, Netherlands',
              organization: 'CloudFlare',
              latency: 85,
              children: [
                {
                  id: 'step4-1',
                  type: 'server',
                  name: 'CDN Cache',
                  description: 'Content caching system',
                  latency: 15,
                }
              ]
            },
            {
              id: 'step5',
              type: 'server',
              name: 'Origin Server',
              description: 'Website origin hosting server',
              ipAddress: '172.67.73.119',
              location: 'San Francisco, USA', 
              organization: 'Amazon Web Services',
              latency: 120,
            },
            {
              id: 'step6',
              type: 'registry',
              name: 'IP Allocation',
              description: 'IP address block allocation',
              organization: 'ARIN',
              governanceEntityId: '3.3', // References ARIN in the governance tree
              latency: 0,
              children: [
                {
                  id: 'step6-1',
                  type: 'registry',
                  name: 'Regional Internet Registry',
                  description: 'Regional authority for IP allocation',
                  organization: 'ARIN Technical Staff',
                  latency: 0,
                }
              ]
            },
          ]
        }
      ];
      
      // Calculate total time from all latencies
      const calculateTotalTime = (nodes: FlowNode[]): number => {
        let total = 0;
        const processNode = (node: FlowNode) => {
          total += node.latency || 0;
          if (node.children) {
            node.children.forEach(processNode);
          }
        };
        
        nodes.forEach(processNode);
        return total;
      };
      
      const totalTime = calculateTotalTime(mockTraceNodes);
      
      setTraceResult({
        nodes: mockTraceNodes,
        totalTime,
        status: 'success'
      });
      
      // Auto expand the first level
      const firstLevelNodeIds = mockTraceNodes[0].children?.map(child => child.id) || [];
      setExpandedNodes(new Set(firstLevelNodeIds));
    } catch (err) {
      setError("Failed to trace website. Please check the URL and try again.");
    } finally {
      setIsTracing(false);
    }
  };

  const handleSelectNode = (node: FlowNode) => {
    if (node.governanceEntityId) {
      onSelectGovernanceEntity(node.governanceEntityId);
    }
  };
  
  const handleExpandNode = (nodeId: string) => {
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

  // Update nodes with expanded property
  const getNodesWithExpandedState = (nodes: FlowNode[]): FlowNode[] => {
    return nodes.map(node => ({
      ...node,
      expanded: expandedNodes.has(node.id),
      children: node.children ? getNodesWithExpandedState(node.children) : undefined
    }));
  };

  const toggleHeroSection = () => {
    setIsHeroExpanded(prev => !prev);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {heroStyle ? (
        <div className="bg-accent rounded-lg overflow-hidden">
          {/* Hero Header with Collapse Toggle */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Globe className="size-5 text-primary" />
              </div>
              <div>
                <h2 className="font-medium">Internet Infrastructure Explorer</h2>
                <p className="text-sm text-muted-foreground">Trace website infrastructure to IANA governance</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleHeroSection}
              className="flex items-center gap-2"
            >
              <span className="text-sm">{isHeroExpanded ? 'Collapse' : 'Expand'}</span>
              <ChevronDown 
                className={`size-4 transition-transform duration-200 ${
                  isHeroExpanded ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </Button>
          </div>

          {/* Collapsible Hero Content */}
          <div 
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isHeroExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-6 py-8">
              <div className="max-w-3xl mx-auto text-center mb-4">
                <h1 className="text-3xl mb-3">Internet Infrastructure Explorer</h1>
                <p className="text-muted-foreground mb-6 mx-auto max-w-2xl">
                  Trace any website's complete signal flow through DNS, IP addressing, and hosting
                  infrastructure to visualize how it connects to the IANA governance structure.
                </p>
                
                <div className="flex gap-2 max-w-xl mx-auto">
                  <div className="relative flex-grow">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
                    <Input
                      placeholder="Enter website URL (e.g., example.com)"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="pl-10 h-12 text-base"
                    />
                  </div>
                  <Button 
                    onClick={handleTrace} 
                    disabled={isTracing || !url}
                    size="lg"
                    className="px-6"
                  >
                    {isTracing ? (
                      <>
                        <Loader2 className="size-4 mr-2 animate-spin" />
                        Tracing...
                      </>
                    ) : (
                      <>
                        <Search className="size-4 mr-2" />
                        Trace Website
                      </>
                    )}
                  </Button>
                </div>
                
                {error && (
                  <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm mt-4 max-w-xl mx-auto">
                    {error}
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mt-6">
                <FeatureButton icon={<Globe />} title="DNS Infrastructure" description="Root servers to TLD" />
                <FeatureButton icon={<Server />} title="Hosting Analysis" description="CDNs and origin servers" />
                <FeatureButton icon={<Database />} title="Registry Data" description="IANA and RIRs" />
                <FeatureButton icon={<BarChart4 />} title="Performance Metrics" description="Latency and response time" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3>Website Signal Flow Tracer</h3>
              <p className="text-muted-foreground">
                Trace a website's complete signal flow through internet infrastructure, DNS, IP addressing, 
                and hosting entities to visualize how it relates to the IANA governance structure.
              </p>
              
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
                  <Input
                    placeholder="Enter website URL (e.g., example.com)"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button 
                  onClick={handleTrace} 
                  disabled={isTracing || !url}
                >
                  {isTracing ? (
                    <>
                      <Loader2 className="size-4 mr-2 animate-spin" />
                      Tracing...
                    </>
                  ) : (
                    <>
                      <Search className="size-4 mr-2" />
                      Trace
                    </>
                  )}
                </Button>
              </div>
              
              {error && (
                <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
                  {error}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
      
      {traceResult && (
        <div className="space-y-6">
          <Tabs defaultValue="visualize">
            <TabsList>
              <TabsTrigger value="visualize">
                <LineChart className="size-4 mr-1.5" />
                Visual Trace
              </TabsTrigger>
              <TabsTrigger value="terminal">
                <Terminal className="size-4 mr-1.5" />
                Terminal View
              </TabsTrigger>
              <TabsTrigger value="analysis">
                <LineChart className="size-4 mr-1.5" />
                Performance Analysis
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="visualize" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h4>Signal Flow Visualization</h4>
                      <p className="text-muted-foreground">Complete path from user request to server response.</p>
                    </div>
                    {url && (
                      <Button variant="outline" size="sm" className="gap-1.5">
                        <ExternalLink className="size-4" />
                        View {url}
                      </Button>
                    )}
                  </div>
                  
                  <FlowVisualization 
                    nodes={traceResult.nodes[0].children ? getNodesWithExpandedState([
                      {
                        ...traceResult.nodes[0],
                        expanded: true
                      }
                    ])[0].children! : []}
                    onNodeSelect={handleSelectNode}
                    onNodeExpand={handleExpandNode}
                    showMetrics={true}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="terminal" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h4>Terminal Output</h4>
                      <p className="text-muted-foreground">Text-based representation for command line tools and proxy instancing.</p>
                    </div>
                    {url && (
                      <Button variant="outline" size="sm" className="gap-1.5">
                        <ExternalLink className="size-4" />
                        View {url}
                      </Button>
                    )}
                  </div>
                  
                  <TerminalOutput 
                    nodes={traceResult.nodes[0].children || []} 
                    totalTime={traceResult.totalTime}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analysis" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <h4>Network Performance Analysis</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Total Response Time</div>
                      <div className="text-2xl font-medium">{traceResult.totalTime}ms</div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">DNS Resolution Time</div>
                      <div className="text-2xl font-medium">
                        {traceResult.nodes[0].children
                          ?.filter(s => s.type === 'dns')
                          .reduce((sum, s) => sum + (s.latency || 0), 0)}ms
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Server Response</div>
                      <div className="text-2xl font-medium">
                        {traceResult.nodes[0].children
                          ?.find(s => s.type === 'server')?.latency || 0}ms
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h5 className="mb-2">Step Latency Distribution</h5>
                    <div className="space-y-4">
                      {traceResult.nodes[0].children?.map(step => step.latency !== undefined && (
                        <div key={step.id} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{step.name}</span>
                            <span>{step.latency}ms</span>
                          </div>
                          <Progress 
                            value={(step.latency / traceResult.totalTime) * 100}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}

// Feature button component for the hero section
function FeatureButton({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) {
  return (
    <div className="flex flex-col items-center text-center p-3 rounded-lg transition-colors hover:bg-primary/5">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary">
          {React.cloneElement(icon as React.ReactElement, { className: "size-4" })}
        </div>
        <div className="font-medium">{title}</div>
      </div>
      <div className="text-sm text-muted-foreground">{description}</div>
    </div>
  );
}