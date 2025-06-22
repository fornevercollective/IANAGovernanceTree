import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { GovernanceTabs } from "./components/GovernanceTabs";
import { WebsiteTracer } from "./components/WebsiteTracer";
import { AdvancedAnalysis } from "./components/AdvancedAnalysis";
import { WebTools } from "./components/WebTools";
import { TreeMenu } from "./components/TreeMenu";
import { TreeNodeProps } from "./components/VerticalTreeNode";
import { Card } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { 
  Laptop, 
  Network, 
  BarChart4, 
  FileDigit, 
  HexagonIcon, 
  Key, 
  ShieldAlert, 
  Trophy, 
  Brackets,
  ChevronRight,
  ChevronDown,
  Globe,
  Copy,
  Brain,
  TrendingUp,
  PieChart,
  FileText,
  Image,
  Clock,
  Zap,
  Target,
  GitBranch,
  Settings
} from "lucide-react";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedNode, setSelectedNode] = useState<TreeNodeProps | null>(null);
  const [activeTab, setActiveTab] = useState("website-tracer");
  const [activeAnalysisTab, setActiveAnalysisTab] = useState("pcap");
  const [activeWebToolTab, setActiveWebToolTab] = useState("api-scraper");
  const [isTreeMenuExpanded, setIsTreeMenuExpanded] = useState(true);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Toggle theme function
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Handle node selection
  const handleNodeSelect = (node: TreeNodeProps) => {
    setSelectedNode(node);
    setActiveTab("governance"); // Switch to governance tab when a node is selected
  };
  
  // Handle governance entity selection from website tracer
  const handleSelectGovernanceEntity = (id: string) => {
    setActiveTab("governance");
  };

  // Handle tree menu selections
  const handleTreeNodeSelect = (nodeId: string, category?: string) => {
    switch (category) {
      case 'network':
        if (nodeId === 'website-tracer') {
          setActiveTab("website-tracer");
        } else {
          setActiveTab("data-analysis");
          setActiveAnalysisTab("network-analysis");
        }
        break;
      case 'ai':
        setActiveTab("data-analysis");
        const aiToolMap: { [key: string]: string } = {
          'ml-analysis': 'ml-analysis',
          'statistical-analysis': 'statistical',
          'data-visualization': 'data-viz',
          'text-processing': 'nlp',
          'image-analysis': 'image-analysis',
          'time-series': 'time-series',
          'anomaly-detection': 'anomaly',
          'clustering': 'clustering'
        };
        setActiveAnalysisTab(aiToolMap[nodeId] || 'ml-analysis');
        break;
      case 'security':
        setActiveTab("data-analysis");
        const securityToolMap: { [key: string]: string } = {
          'pcap-analysis': 'pcap',
          'hex-editor': 'hex',
          'cryptography': 'crypto',
          'vulnerability-scanner': 'security',
          'bug-bounty-tracker': 'bounty'
        };
        setActiveAnalysisTab(securityToolMap[nodeId] || 'pcap');
        break;
      case 'web':
        setActiveTab("web-tools");
        const webToolMap: { [key: string]: string } = {
          'api-scraper': 'api-scraper',
          'site-cloner': 'site-cloner',
          'social-blade': 'api-scraper' // Could be expanded to separate social tools
        };
        setActiveWebToolTab(webToolMap[nodeId] || 'api-scraper');
        break;
      case 'governance':
        setActiveTab("governance");
        break;
      default:
        // Handle other cases or provide default behavior
        break;
    }
  };

  // Handle tool execution from tree menu
  const handleToolExecute = (toolId: string) => {
    if (toolId === 'website-tracer') {
      setActiveTab("website-tracer");
    }
  };

  // Toggle tree menu section
  const toggleTreeMenu = () => {
    setIsTreeMenuExpanded(prev => !prev);
  };

  const analysisTools = [
    // Core Analysis Tools
    { id: "pcap", label: "PCAP Analysis", icon: <FileDigit className="size-4" />, category: "core" },
    { id: "hex", label: "Hex Editor", icon: <HexagonIcon className="size-4" />, category: "core" },
    { id: "crypto", label: "Cryptography", icon: <Key className="size-4" />, category: "core" },
    { id: "api", label: "API Inspector", icon: <Brackets className="size-4" />, category: "core" },
    
    // Supadata AI Tools
    { id: "ml-analysis", label: "ML Analysis", icon: <Brain className="size-4" />, category: "ai" },
    { id: "statistical", label: "Statistical Analysis", icon: <TrendingUp className="size-4" />, category: "ai" },
    { id: "data-viz", label: "Data Visualization", icon: <PieChart className="size-4" />, category: "ai" },
    { id: "nlp", label: "Text Processing", icon: <FileText className="size-4" />, category: "ai" },
    { id: "image-analysis", label: "Image Analysis", icon: <Image className="size-4" />, category: "ai" },
    { id: "time-series", label: "Time Series", icon: <Clock className="size-4" />, category: "ai" },
    { id: "anomaly", label: "Anomaly Detection", icon: <Zap className="size-4" />, category: "ai" },
    { id: "clustering", label: "Clustering", icon: <GitBranch className="size-4" />, category: "ai" },
    
    // Security & Social Tools
    { id: "social", label: "SocialBlade", icon: <BarChart4 className="size-4" />, category: "security" },
    { id: "security", label: "Security Tools", icon: <ShieldAlert className="size-4" />, category: "security" },
    { id: "bounty", label: "Bug Bounties", icon: <Trophy className="size-4" />, category: "security" },
    { id: "network-analysis", label: "Network Analysis", icon: <Target className="size-4" />, category: "security" },
  ];

  const webTools = [
    { id: "api-scraper", label: "API Scraper", icon: <Brackets className="size-4" /> },
    { id: "site-cloner", label: "Site Cloner", icon: <Copy className="size-4" /> },
  ];

  // Get the current analysis tool based on activeAnalysisTab
  const currentAnalysisTool = analysisTools.find(tool => tool.id === activeAnalysisTab) || analysisTools[0];
  
  // Get the current web tool based on activeWebToolTab
  const currentWebTool = webTools.find(tool => tool.id === activeWebToolTab) || webTools[0];

  // Group analysis tools by category for better organization
  const groupedAnalysisTools = {
    core: analysisTools.filter(tool => tool.category === "core"),
    ai: analysisTools.filter(tool => tool.category === "ai"),
    security: analysisTools.filter(tool => tool.category === "security")
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header toggleTheme={toggleTheme} isDarkMode={darkMode} />
      
      {/* Collapsible Tree Menu Section - Mobile Optimized */}
      <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4">
        <Card className="overflow-hidden">
          {/* Tree Menu Header with Collapse Toggle */}
          <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-b border-border/40">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Settings className="size-4 sm:size-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-medium text-sm sm:text-base truncate">Operations Tree</h2>
                <p className="text-xs sm:text-sm text-muted-foreground truncate">Available tools and workflows</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTreeMenu}
              className="flex items-center gap-1 sm:gap-2 flex-shrink-0 ml-2"
            >
              <span className="text-xs sm:text-sm hidden xs:inline">{isTreeMenuExpanded ? 'Collapse' : 'Expand'}</span>
              <ChevronDown 
                className={`size-4 transition-transform duration-200 ${
                  isTreeMenuExpanded ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </Button>
          </div>

          {/* Collapsible Tree Menu Content */}
          <div 
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isTreeMenuExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="p-0">
              <TreeMenu 
                onNodeSelect={handleTreeNodeSelect}
                onToolExecute={handleToolExecute}
                className="border-0 bg-transparent shadow-none"
              />
            </div>
          </div>
        </Card>
      </div>
      
      {/* Hero Website Tracer */}
      <div className="container mx-auto px-2 sm:px-4">
        <WebsiteTracer 
          onSelectGovernanceEntity={handleSelectGovernanceEntity} 
          heroStyle={true} 
        />
      </div>
      
      <main className="flex-1 container mx-auto py-3 sm:py-6 px-2 sm:px-4">
        <Card className="p-3 sm:p-6">
          <h2 className="mb-4 text-lg sm:text-xl">Internet Governance and Infrastructure Explorer</h2>
          
          {/* Main navigation tabs - Mobile Scrollable */}
          <div className="border-b mb-4">
            <div className="flex space-x-3 sm:space-x-6 overflow-x-auto scrollbar-hide pb-2">
              <MainTab 
                id="governance" 
                label="Governance" 
                fullLabel="Governance Structure"
                icon={<Network className="size-4 mr-1 sm:mr-1.5" />}
                isActive={activeTab === "governance"}
                onClick={() => setActiveTab("governance")}
              />
              <MainTab 
                id="website-tracer" 
                label="Tracer" 
                fullLabel="Website Tracer"
                icon={<Laptop className="size-4 mr-1 sm:mr-1.5" />}
                isActive={activeTab === "website-tracer"}
                onClick={() => setActiveTab("website-tracer")}
              />
              <MainTab 
                id="data-analysis" 
                label="Analysis" 
                fullLabel="Data Analysis"
                icon={<BarChart4 className="size-4 mr-1 sm:mr-1.5" />}
                isActive={activeTab === "data-analysis"}
                onClick={() => setActiveTab("data-analysis")}
              />
              <MainTab 
                id="web-tools" 
                label="Tools" 
                fullLabel="Web Tools"
                icon={<Globe className="size-4 mr-1 sm:mr-1.5" />}
                isActive={activeTab === "web-tools"}
                onClick={() => setActiveTab("web-tools")}
              />
            </div>
          </div>
          
          {/* Data Analysis Submenu - Mobile Optimized */}
          {activeTab === "data-analysis" && (
            <div className="mt-4 pb-3 border-b">
              <div className="space-y-3">
                {/* Core Tools */}
                <div>
                  <h4 className="text-xs uppercase tracking-wide text-muted-foreground mb-2 px-2 sm:px-3">Core Analysis</h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {groupedAnalysisTools.core.map(tool => (
                      <button
                        key={tool.id}
                        className={`flex items-center px-2 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm transition-colors ${
                          activeAnalysisTab === tool.id 
                            ? 'bg-primary text-primary-foreground' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                        onClick={() => setActiveAnalysisTab(tool.id)}
                      >
                        <span className="flex items-center gap-1 sm:gap-1.5">
                          {tool.icon}
                          <span className="hidden sm:inline">{tool.label}</span>
                          <span className="sm:hidden">{tool.label.split(' ')[0]}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* AI/ML Tools */}
                <div>
                  <h4 className="text-xs uppercase tracking-wide text-muted-foreground mb-2 px-2 sm:px-3">Supadata AI Tools</h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {groupedAnalysisTools.ai.map(tool => (
                      <button
                        key={tool.id}
                        className={`flex items-center px-2 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm transition-colors ${
                          activeAnalysisTab === tool.id 
                            ? 'bg-primary text-primary-foreground' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                        onClick={() => setActiveAnalysisTab(tool.id)}
                      >
                        <span className="flex items-center gap-1 sm:gap-1.5">
                          {tool.icon}
                          <span className="hidden sm:inline">{tool.label}</span>
                          <span className="sm:hidden">{tool.label.split(' ')[0]}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Security Tools */}
                <div>
                  <h4 className="text-xs uppercase tracking-wide text-muted-foreground mb-2 px-2 sm:px-3">Security & Social</h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {groupedAnalysisTools.security.map(tool => (
                      <button
                        key={tool.id}
                        className={`flex items-center px-2 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm transition-colors ${
                          activeAnalysisTab === tool.id 
                            ? 'bg-primary text-primary-foreground' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                        onClick={() => setActiveAnalysisTab(tool.id)}
                      >
                        <span className="flex items-center gap-1 sm:gap-1.5">
                          {tool.icon}
                          <span className="hidden sm:inline">{tool.label}</span>
                          <span className="sm:hidden">{tool.label.split(' ')[0]}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Web Tools Submenu - Mobile Optimized */}
          {activeTab === "web-tools" && (
            <div className="mt-4 pb-3 border-b overflow-x-auto">
              <div className="flex space-x-2 min-w-max">
                {webTools.map(tool => (
                  <button
                    key={tool.id}
                    className={`flex items-center px-2 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm transition-colors whitespace-nowrap ${
                      activeWebToolTab === tool.id 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                    onClick={() => setActiveWebToolTab(tool.id)}
                  >
                    <span className="flex items-center gap-1 sm:gap-1.5">
                      {tool.icon}
                      <span className="hidden sm:inline">{tool.label}</span>
                      <span className="sm:hidden">{tool.label.split(' ')[0]}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Content area */}
          <div className="mt-4 sm:mt-6">
            {activeTab === "governance" ? (
              <GovernanceTabs 
                selectedNode={selectedNode}
                onNodeSelect={handleNodeSelect}
                defaultTab="hierarchy"
              />
            ) : activeTab === "website-tracer" ? (
              <>
                <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
                  Explore how websites connect to the internet through DNS, CDNs, and servers.
                  Trace the relationships to internet governance organizations.
                </p>
                <WebsiteTracer 
                  onSelectGovernanceEntity={handleSelectGovernanceEntity} 
                  heroStyle={false}
                />
              </>
            ) : activeTab === "data-analysis" ? (
              <DataAnalysisContent 
                activeAnalysisTab={activeAnalysisTab}
                currentTool={currentAnalysisTool}
              />
            ) : activeTab === "web-tools" ? (
              <WebToolsContent
                activeWebToolTab={activeWebToolTab}
                currentTool={currentWebTool}
              />
            ) : null}
          </div>
        </Card>
      </main>
      
      <footer className="border-t py-3 sm:py-4 text-center text-muted-foreground text-xs sm:text-sm bg-card">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="text-center">
            Internet Infrastructure Explorer &copy; {new Date().getFullYear()}.
          </div>
          <div className="text-center mt-1 sm:mt-0 sm:inline sm:ml-1">
            Data provided for illustrative purposes only.
          </div>
        </div>
      </footer>
    </div>
  );
}

// Main navigation tab item component - Mobile Optimized
function MainTab({ 
  id, 
  label, 
  fullLabel,
  icon, 
  isActive, 
  onClick 
}: { 
  id: string, 
  label: string, 
  fullLabel: string,
  icon: React.ReactNode, 
  isActive: boolean, 
  onClick: () => void 
}) {
  return (
    <button
      className={`pb-2 px-1 flex items-center whitespace-nowrap text-sm sm:text-base ${
        isActive ? 'border-b-2 border-primary font-medium' : 'text-muted-foreground hover:text-foreground'
      }`}
      onClick={onClick}
      title={fullLabel}
    >
      {icon}
      <span className="sm:hidden">{label}</span>
      <span className="hidden sm:inline">{fullLabel}</span>
    </button>
  );
}

// Data Analysis Content Component
function DataAnalysisContent({ 
  activeAnalysisTab, 
  currentTool
}: { 
  activeAnalysisTab: string,
  currentTool: { id: string, label: string, icon: React.ReactNode, category: string }
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 overflow-hidden">
        <div className="flex items-center text-muted-foreground text-sm sm:text-base whitespace-nowrap">
          <span>Data Analysis</span>
          <ChevronRight className="size-4 mx-1" />
        </div>
        <h3 className="flex items-center gap-2 min-w-0">
          {currentTool.icon}
          <span className="truncate text-sm sm:text-base">{currentTool.label}</span>
        </h3>
      </div>
      
      {/* Pass the activeTab prop to the AdvancedAnalysis component */}
      <AdvancedAnalysis activeTab={activeAnalysisTab} />
    </div>
  );
}

// Web Tools Content Component
function WebToolsContent({ 
  activeWebToolTab, 
  currentTool
}: { 
  activeWebToolTab: string,
  currentTool: { id: string, label: string, icon: React.ReactNode }
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 overflow-hidden">
        <div className="flex items-center text-muted-foreground text-sm sm:text-base whitespace-nowrap">
          <span>Web Tools</span>
          <ChevronRight className="size-4 mx-1" />
        </div>
        <h3 className="flex items-center gap-2 min-w-0">
          {currentTool.icon}
          <span className="truncate text-sm sm:text-base">{currentTool.label}</span>
        </h3>
      </div>
      
      {/* Pass the activeTab prop to the WebTools component */}
      <WebTools activeTab={activeWebToolTab} />
    </div>
  );
}