import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { GovernanceTabs } from "./components/GovernanceTabs";
import { WebsiteTracer } from "./components/WebsiteTracer";
import { AdvancedAnalysis } from "./components/AdvancedAnalysis";
import { WebTools } from "./components/WebTools";
import { DeepSearch } from "./components/DeepSearch";
import { TreeMenu } from "./components/TreeMenu";
import { TreeNodeProps } from "./components/VerticalTreeNode";
import { Card } from "./components/ui/card";
import { Button } from "./components/ui/button";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedNode, setSelectedNode] = useState<TreeNodeProps | null>(null);
  const [activeTab, setActiveTab] = useState("website-tracer");
  const [activeAnalysisTab, setActiveAnalysisTab] = useState("pcap");
  const [activeWebToolTab, setActiveWebToolTab] = useState("api-scraper");
  const [activeDeepSearchTab, setActiveDeepSearchTab] = useState("dictionaries");
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
    setActiveTab("governance");
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
          'social-blade': 'api-scraper'
        };
        setActiveWebToolTab(webToolMap[nodeId] || 'api-scraper');
        break;
      case 'archives':
        setActiveTab("deep-search");
        const archiveToolMap: { [key: string]: string } = {
          'dictionaries': 'dictionaries',
          'wikipedia': 'wikipedia',
          'library-congress': 'library-congress',
          'internet-archive': 'internet-archive',
          'academic-papers': 'academic',
          'news-archives': 'news'
        };
        setActiveDeepSearchTab(archiveToolMap[nodeId] || 'dictionaries');
        break;
      case 'governance':
        setActiveTab("governance");
        break;
      default:
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
    { id: "pcap", label: "PCAP Analysis", abbr: "pc", category: "core" },
    { id: "hex", label: "Hex Editor", abbr: "hx", category: "core" },
    { id: "crypto", label: "Cryptography", abbr: "cr", category: "core" },
    { id: "api", label: "API Inspector", abbr: "ap", category: "core" },
    
    // Supadata AI Tools
    { id: "ml-analysis", label: "ML Analysis", abbr: "ml", category: "ai" },
    { id: "statistical", label: "Statistical Analysis", abbr: "st", category: "ai" },
    { id: "data-viz", label: "Data Visualization", abbr: "dv", category: "ai" },
    { id: "nlp", label: "Text Processing", abbr: "tx", category: "ai" },
    { id: "image-analysis", label: "Image Analysis", abbr: "im", category: "ai" },
    { id: "time-series", label: "Time Series", abbr: "ts", category: "ai" },
    { id: "anomaly", label: "Anomaly Detection", abbr: "ad", category: "ai" },
    { id: "clustering", label: "Clustering", abbr: "cl", category: "ai" },
    
    // Security & Social Tools
    { id: "social", label: "SocialBlade", abbr: "sb", category: "security" },
    { id: "security", label: "Security Tools", abbr: "sc", category: "security" },
    { id: "bounty", label: "Bug Bounties", abbr: "bb", category: "security" },
    { id: "network-analysis", label: "Network Analysis", abbr: "na", category: "security" },
  ];

  const webTools = [
    { id: "api-scraper", label: "API Scraper", abbr: "as" },
    { id: "site-cloner", label: "Site Cloner", abbr: "cl" },
  ];

  const deepSearchTools = [
    // Reference & Dictionary Tools
    { id: "dictionaries", label: "Dictionaries", abbr: "dc", category: "reference" },
    { id: "thesaurus", label: "Thesaurus", abbr: "th", category: "reference" },
    { id: "encyclopedia", label: "Encyclopedia", abbr: "en", category: "reference" },
    
    // Archive Tools
    { id: "wikipedia", label: "Wikipedia", abbr: "wp", category: "archives" },
    { id: "library-congress", label: "Library of Congress", abbr: "lc", category: "archives" },
    { id: "internet-archive", label: "Internet Archive", abbr: "ia", category: "archives" },
    { id: "national-archives", label: "National Archives", abbr: "na", category: "archives" },
    
    // Academic & Research Tools
    { id: "academic", label: "Academic Papers", abbr: "ac", category: "academic" },
    { id: "patents", label: "Patent Search", abbr: "pt", category: "academic" },
    { id: "legal", label: "Legal Database", abbr: "lg", category: "academic" },
    
    // News & Media Archives
    { id: "news", label: "News Archives", abbr: "nw", category: "media" },
    { id: "newspapers", label: "Historical Newspapers", abbr: "hn", category: "media" },
    { id: "media", label: "Media Collections", abbr: "md", category: "media" },
  ];

  // Get the current analysis tool based on activeAnalysisTab
  const currentAnalysisTool = analysisTools.find(tool => tool.id === activeAnalysisTab) || analysisTools[0];
  
  // Get the current web tool based on activeWebToolTab
  const currentWebTool = webTools.find(tool => tool.id === activeWebToolTab) || webTools[0];

  // Get the current deep search tool based on activeDeepSearchTab
  const currentDeepSearchTool = deepSearchTools.find(tool => tool.id === activeDeepSearchTab) || deepSearchTools[0];

  // Group analysis tools by category for better organization
  const groupedAnalysisTools = {
    core: analysisTools.filter(tool => tool.category === "core"),
    ai: analysisTools.filter(tool => tool.category === "ai"),
    security: analysisTools.filter(tool => tool.category === "security")
  };

  // Group deep search tools by category
  const groupedDeepSearchTools = {
    reference: deepSearchTools.filter(tool => tool.category === "reference"),
    archives: deepSearchTools.filter(tool => tool.category === "archives"),
    academic: deepSearchTools.filter(tool => tool.category === "academic"),
    media: deepSearchTools.filter(tool => tool.category === "media")
  };

  return (
    <div className="lark-layout-main bg-background text-foreground font-mono">
      <Header toggleTheme={toggleTheme} isDarkMode={darkMode} />
      
      {/* Collapsible Tree Menu Section - Lark Style */}
      <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4">
        <div className="lark-card overflow-hidden">
          {/* Tree Menu Header with Collapse Toggle */}
          <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-b border-border/40">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="lark-icon-sm bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10">
                <span className="lark-icon text-primary">st</span>
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-mono font-medium text-sm sm:text-base truncate">operations tree</h2>
                <p className="font-mono text-xs sm:text-sm text-muted-foreground truncate">available tools and workflows</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTreeMenu}
              className="lark-button-ghost animate-accent-line"
            >
              <span className="font-mono text-xs sm:text-sm hidden xs:inline">{isTreeMenuExpanded ? 'hide' : 'show'}</span>
              <span className="lark-icon ml-1">
                {isTreeMenuExpanded ? 'v' : '^'}
              </span>
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
        </div>
      </div>
      
      {/* Hero Website Tracer */}
      <div className="container mx-auto px-2 sm:px-4">
        <WebsiteTracer 
          onSelectGovernanceEntity={handleSelectGovernanceEntity} 
          heroStyle={true} 
        />
      </div>
      
      <main className="flex-1 container mx-auto py-3 sm:py-6 px-2 sm:px-4">
        <div className="lark-card">
          <h2 className="mb-4 font-mono text-lg sm:text-xl">internet governance tree - infrastructure explorer</h2>
          
          {/* Main navigation tabs - Lark Style */}
          <div className="border-b mb-4">
            <div className="flex space-x-3 sm:space-x-6 overflow-x-auto scrollbar-hide pb-2">
              <MainTab 
                id="governance" 
                label="gov" 
                fullLabel="governance structure"
                abbr="gv"
                isActive={activeTab === "governance"}
                onClick={() => setActiveTab("governance")}
              />
              <MainTab 
                id="website-tracer" 
                label="trace" 
                fullLabel="website tracer"
                abbr="tr"
                isActive={activeTab === "website-tracer"}
                onClick={() => setActiveTab("website-tracer")}
              />
              <MainTab 
                id="data-analysis" 
                label="data" 
                fullLabel="data analysis"
                abbr="da"
                isActive={activeTab === "data-analysis"}
                onClick={() => setActiveTab("data-analysis")}
              />
              <MainTab 
                id="web-tools" 
                label="tools" 
                fullLabel="web tools"
                abbr="wt"
                isActive={activeTab === "web-tools"}
                onClick={() => setActiveTab("web-tools")}
              />
              <MainTab 
                id="deep-search" 
                label="arch" 
                fullLabel="deep search"
                abbr="ds"
                isActive={activeTab === "deep-search"}
                onClick={() => setActiveTab("deep-search")}
              />
            </div>
          </div>
          
          {/* Data Analysis Submenu - Lark Style */}
          {activeTab === "data-analysis" && (
            <div className="mt-4 pb-3 border-b">
              <div className="space-y-3">
                {/* Core Tools */}
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wide text-muted-foreground mb-2 px-2 sm:px-3 font-bold">core analysis</h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {groupedAnalysisTools.core.map(tool => (
                      <button
                        key={tool.id}
                        className={`lark-button-abbreviation ${
                          activeAnalysisTab === tool.id 
                            ? 'bg-primary text-primary-foreground' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                        onClick={() => setActiveAnalysisTab(tool.id)}
                        title={tool.label}
                      >
                        <span className="lark-icon">{tool.abbr}</span>
                        <span className="hidden sm:inline ml-1 font-mono text-xs">{tool.label.split(' ')[0].toLowerCase()}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* AI/ML Tools */}
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wide text-muted-foreground mb-2 px-2 sm:px-3 font-bold">supadata ai tools</h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {groupedAnalysisTools.ai.map(tool => (
                      <button
                        key={tool.id}
                        className={`lark-button-abbreviation ${
                          activeAnalysisTab === tool.id 
                            ? 'bg-primary text-primary-foreground' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                        onClick={() => setActiveAnalysisTab(tool.id)}
                        title={tool.label}
                      >
                        <span className="lark-icon">{tool.abbr}</span>
                        <span className="hidden sm:inline ml-1 font-mono text-xs">{tool.label.split(' ')[0].toLowerCase()}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Security Tools */}
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wide text-muted-foreground mb-2 px-2 sm:px-3 font-bold">security & social</h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {groupedAnalysisTools.security.map(tool => (
                      <button
                        key={tool.id}
                        className={`lark-button-abbreviation ${
                          activeAnalysisTab === tool.id 
                            ? 'bg-primary text-primary-foreground' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                        onClick={() => setActiveAnalysisTab(tool.id)}
                        title={tool.label}
                      >
                        <span className="lark-icon">{tool.abbr}</span>
                        <span className="hidden sm:inline ml-1 font-mono text-xs">{tool.label.split(' ')[0].toLowerCase()}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Web Tools Submenu - Lark Style */}
          {activeTab === "web-tools" && (
            <div className="mt-4 pb-3 border-b overflow-x-auto">
              <div className="flex space-x-2 min-w-max">
                {webTools.map(tool => (
                  <button
                    key={tool.id}
                    className={`lark-button-abbreviation whitespace-nowrap ${
                      activeWebToolTab === tool.id 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                    onClick={() => setActiveWebToolTab(tool.id)}
                    title={tool.label}
                  >
                    <span className="lark-icon">{tool.abbr}</span>
                    <span className="hidden sm:inline ml-1 font-mono text-xs">{tool.label.split(' ')[0].toLowerCase()}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Deep Search Submenu - Lark Style */}
          {activeTab === "deep-search" && (
            <div className="mt-4 pb-3 border-b">
              <div className="space-y-3">
                {/* Reference Tools */}
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wide text-muted-foreground mb-2 px-2 sm:px-3 font-bold">reference & dictionary</h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {groupedDeepSearchTools.reference.map(tool => (
                      <button
                        key={tool.id}
                        className={`lark-button-abbreviation ${
                          activeDeepSearchTab === tool.id 
                            ? 'bg-primary text-primary-foreground' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                        onClick={() => setActiveDeepSearchTab(tool.id)}
                        title={tool.label}
                      >
                        <span className="lark-icon">{tool.abbr}</span>
                        <span className="hidden sm:inline ml-1 font-mono text-xs">{tool.label.split(' ')[0].toLowerCase()}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Archive Tools */}
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wide text-muted-foreground mb-2 px-2 sm:px-3 font-bold">digital archives</h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {groupedDeepSearchTools.archives.map(tool => (
                      <button
                        key={tool.id}
                        className={`lark-button-abbreviation ${
                          activeDeepSearchTab === tool.id 
                            ? 'bg-primary text-primary-foreground' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                        onClick={() => setActiveDeepSearchTab(tool.id)}
                        title={tool.label}
                      >
                        <span className="lark-icon">{tool.abbr}</span>
                        <span className="hidden sm:inline ml-1 font-mono text-xs">{tool.label.split(' ')[0].toLowerCase()}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Academic Tools */}
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wide text-muted-foreground mb-2 px-2 sm:px-3 font-bold">academic & research</h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {groupedDeepSearchTools.academic.map(tool => (
                      <button
                        key={tool.id}
                        className={`lark-button-abbreviation ${
                          activeDeepSearchTab === tool.id 
                            ? 'bg-primary text-primary-foreground' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                        onClick={() => setActiveDeepSearchTab(tool.id)}
                        title={tool.label}
                      >
                        <span className="lark-icon">{tool.abbr}</span>
                        <span className="hidden sm:inline ml-1 font-mono text-xs">{tool.label.split(' ')[0].toLowerCase()}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Media Tools */}
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wide text-muted-foreground mb-2 px-2 sm:px-3 font-bold">news & media</h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {groupedDeepSearchTools.media.map(tool => (
                      <button
                        key={tool.id}
                        className={`lark-button-abbreviation ${
                          activeDeepSearchTab === tool.id 
                            ? 'bg-primary text-primary-foreground' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                        onClick={() => setActiveDeepSearchTab(tool.id)}
                        title={tool.label}
                      >
                        <span className="lark-icon">{tool.abbr}</span>
                        <span className="hidden sm:inline ml-1 font-mono text-xs">{tool.label.split(' ')[0].toLowerCase()}</span>
                      </button>
                    ))}
                  </div>
                </div>
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
                <p className="font-mono text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
                  explore how websites connect to the internet through dns, cdns, and servers.
                  trace the relationships to internet governance organizations.
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
            ) : activeTab === "deep-search" ? (
              <DeepSearchContent
                activeDeepSearchTab={activeDeepSearchTab}
                currentTool={currentDeepSearchTool}
              />
            ) : null}
          </div>
        </div>
      </main>
      
      <footer className="border-t py-3 sm:py-4 text-center text-muted-foreground font-mono text-xs sm:text-sm bg-card">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="text-center">
            <span className="lark-brand">lark</span> internet tree &copy; {new Date().getFullYear()}.
          </div>
          <div className="text-center mt-1 sm:mt-0 sm:inline sm:ml-1">
            data provided for illustrative purposes only.
          </div>
        </div>
      </footer>
    </div>
  );
}

// Main navigation tab item component - Lark Style
function MainTab({ 
  id, 
  label, 
  fullLabel,
  abbr,
  isActive, 
  onClick 
}: { 
  id: string, 
  label: string, 
  fullLabel: string,
  abbr: string,
  isActive: boolean, 
  onClick: () => void 
}) {
  return (
    <button
      className={`lark-nav-tab animate-underline ${
        isActive ? 'lark-nav-tab-active' : 'lark-nav-tab-inactive'
      }`}
      onClick={onClick}
      title={fullLabel}
    >
      <span className="lark-icon mr-1">{abbr}</span>
      <span className="sm:hidden font-mono">{label}</span>
      <span className="hidden sm:inline font-mono">{fullLabel}</span>
    </button>
  );
}

// Data Analysis Content Component - Lark Style
function DataAnalysisContent({ 
  activeAnalysisTab, 
  currentTool
}: { 
  activeAnalysisTab: string,
  currentTool: { id: string, label: string, abbr: string, category: string }
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 overflow-hidden">
        <div className="flex items-center text-muted-foreground font-mono text-sm sm:text-base whitespace-nowrap">
          <span>data analysis</span>
          <span className="lark-icon mx-1">&gt;</span>
        </div>
        <h3 className="flex items-center gap-2 min-w-0">
          <span className="lark-icon">{currentTool.abbr}</span>
          <span className="truncate font-mono text-sm sm:text-base">{currentTool.label.toLowerCase()}</span>
        </h3>
      </div>
      
      <AdvancedAnalysis activeTab={activeAnalysisTab} />
    </div>
  );
}

// Web Tools Content Component - Lark Style
function WebToolsContent({ 
  activeWebToolTab, 
  currentTool
}: { 
  activeWebToolTab: string,
  currentTool: { id: string, label: string, abbr: string }
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 overflow-hidden">
        <div className="flex items-center text-muted-foreground font-mono text-sm sm:text-base whitespace-nowrap">
          <span>web tools</span>
          <span className="lark-icon mx-1">&gt;</span>
        </div>
        <h3 className="flex items-center gap-2 min-w-0">
          <span className="lark-icon">{currentTool.abbr}</span>
          <span className="truncate font-mono text-sm sm:text-base">{currentTool.label.toLowerCase()}</span>
        </h3>
      </div>
      
      <WebTools activeTab={activeWebToolTab} />
    </div>
  );
}

// Deep Search Content Component - Lark Style
function DeepSearchContent({ 
  activeDeepSearchTab, 
  currentTool
}: { 
  activeDeepSearchTab: string,
  currentTool: { id: string, label: string, abbr: string, category: string }
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 overflow-hidden">
        <div className="flex items-center text-muted-foreground font-mono text-sm sm:text-base whitespace-nowrap">
          <span>deep search</span>
          <span className="lark-icon mx-1">&gt;</span>
        </div>
        <h3 className="flex items-center gap-2 min-w-0">
          <span className="lark-icon">{currentTool.abbr}</span>
          <span className="truncate font-mono text-sm sm:text-base">{currentTool.label.toLowerCase()}</span>
        </h3>
      </div>
      
      <DeepSearch activeTab={activeDeepSearchTab} />
    </div>
  );
}