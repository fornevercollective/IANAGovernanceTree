
import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Alert, AlertDescription } from "./ui/alert";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";
import { Progress } from "./ui/progress";
import { 
  Brackets, 
  Copy, 
  Globe, 
  Search, 
  Code, 
  FileJson, 
  Image, 
  Eye, 
  Download, 
  Loader2, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Terminal
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface WebToolsProps {
  activeTab?: string;
}

// Type definitions for API Scraper
interface APIScraperRequest {
  url: string;
  selector?: string;
  options: {
    headers: boolean;
    cookies: boolean;
    images: boolean;
    scripts: boolean;
    styles: boolean;
    metadata: boolean;
    serp: boolean;
    structured: boolean;
  };
}

interface APIScraperResult {
  status: 'success' | 'error' | 'loading';
  data: {
    url: string;
    title?: string;
    description?: string;
    html?: string;
    structuredData?: any;
    headers?: Record<string, string>;
    cookies?: Record<string, string>;
    images?: string[];
    scripts?: string[];
    styles?: string[];
    metadata?: Record<string, string>;
    serp?: {
      organic: Array<{
        title: string;
        link: string;
        snippet: string;
        position: number;
      }>;
      ads?: Array<{
        title: string;
        link: string;
        snippet: string;
      }>;
      relatedSearches?: string[];
    };
  };
  error?: string;
}

// Type definitions for Site Cloner
interface SiteCloner {
  url: string;
  options: {
    recursive: boolean;
    maxDepth: number;
    includeAssets: boolean;
    downloadImages: boolean;
    downloadStyles: boolean;
    downloadScripts: boolean;
    optimizeForProduction: boolean;
  };
  status: 'idle' | 'cloning' | 'success' | 'error';
  progress: number;
  result?: {
    filesCloned: number;
    totalSize: string;
    mainHtmlFile: string;
    error?: string;
  };
}

export function WebTools({ activeTab = "api-scraper" }: WebToolsProps) {
  // API Scraper State
  const [apiRequest, setApiRequest] = useState<APIScraperRequest>({
    url: "",
    selector: "",
    options: {
      headers: false,
      cookies: false,
      images: true,
      scripts: false,
      styles: false,
      metadata: true,
      serp: false,
      structured: true
    }
  });
  
  const [apiResult, setApiResult] = useState<APIScraperResult | null>(null);
  const [activeResultTab, setActiveResultTab] = useState<string>("preview");
  
  // Site Cloner State
  const [siteCloner, setSiteCloner] = useState<SiteCloner>({
    url: "",
    options: {
      recursive: false,
      maxDepth: 1,
      includeAssets: true,
      downloadImages: true,
      downloadStyles: true,
      downloadScripts: true,
      optimizeForProduction: false
    },
    status: 'idle',
    progress: 0
  });
  
  // API Scraper Handlers
  const handleApiInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiRequest({
      ...apiRequest,
      [e.target.name]: e.target.value
    });
  };
  
  const handleApiOptionChange = (option: keyof APIScraperRequest['options']) => {
    setApiRequest({
      ...apiRequest,
      options: {
        ...apiRequest.options,
        [option]: !apiRequest.options[option]
      }
    });
  };
  
  const fetchApiData = async () => {
    if (!apiRequest.url) return;
    
    // Reset previous results
    setApiResult({ 
      status: 'loading', 
      data: { url: apiRequest.url }
    });
    
    try {
      // In a real app, this would be an API call
      // For this demo, we'll simulate the API response after a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate mock data based on the URL
      const mockData = generateMockApiResponse(apiRequest);
      setApiResult({
        status: 'success',
        data: mockData
      });
      
      setActiveResultTab("preview");
    } catch (error) {
      setApiResult({
        status: 'error',
        data: { url: apiRequest.url },
        error: "Failed to fetch data. Please check the URL and try again."
      });
    }
  };
  
  // Site Cloner Handlers
  const handleSiteClonerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSiteCloner({
      ...siteCloner,
      url: e.target.value
    });
  };
  
  const handleSiteClonerOptionChange = (option: keyof SiteCloner['options'], value: boolean | number) => {
    setSiteCloner({
      ...siteCloner,
      options: {
        ...siteCloner.options,
        [option]: value
      }
    });
  };
  
  const startCloning = async () => {
    if (!siteCloner.url) return;
    
    // Reset and start cloning
    setSiteCloner({
      ...siteCloner,
      status: 'cloning',
      progress: 0
    });
    
    try {
      // Simulate the cloning process
      for (let i = 1; i <= 10; i++) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setSiteCloner(prev => ({
          ...prev,
          progress: i * 10
        }));
      }
      
      // Simulate success after completion
      setSiteCloner(prev => ({
        ...prev,
        status: 'success',
        progress: 100,
        result: {
          filesCloned: Math.floor(Math.random() * 30) + 10,
          totalSize: `${(Math.random() * 5).toFixed(1)} MB`,
          mainHtmlFile: 'index.html'
        }
      }));
    } catch (error) {
      setSiteCloner(prev => ({
        ...prev,
        status: 'error',
        result: {
          filesCloned: 0,
          totalSize: '0 KB',
          mainHtmlFile: '',
          error: "Failed to clone the website. Please check the URL and try again."
        }
      }));
    }
  };
  
  // Render different tools based on the active tab
  switch (activeTab) {
    case "api-scraper":
      return (
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="url">URL to Scrape</Label>
                  <div className="flex mt-1.5">
                    <Input
                      id="url"
                      name="url"
                      placeholder="https://example.com"
                      value={apiRequest.url}
                      onChange={handleApiInputChange}
                      className="flex-1 rounded-r-none"
                    />
                    <Button 
                      onClick={fetchApiData} 
                      className="rounded-l-none"
                      disabled={apiResult?.status === 'loading' || !apiRequest.url}
                    >
                      {apiResult?.status === 'loading' ? (
                        <>
                          <Loader2 className="size-4 mr-2 animate-spin" />
                          Fetching...
                        </>
                      ) : (
                        <>
                          <Search className="size-4 mr-2" />
                          Scrape
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="selector">CSS Selector (Optional)</Label>
                  <Input
                    id="selector"
                    name="selector"
                    placeholder=".main-content, #results, article"
                    value={apiRequest.selector}
                    onChange={handleApiInputChange}
                    className="mt-1.5"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Target specific elements using CSS selectors. Leave empty to fetch the entire page.
                  </p>
                </div>
                
                <div className="border-t pt-3 mt-3">
                  <h4 className="text-sm font-medium mb-3">Include in Results</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="option-metadata" 
                        checked={apiRequest.options.metadata}
                        onCheckedChange={() => handleApiOptionChange('metadata')}
                      />
                      <Label htmlFor="option-metadata" className="text-sm cursor-pointer">Metadata</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="option-structured" 
                        checked={apiRequest.options.structured}
                        onCheckedChange={() => handleApiOptionChange('structured')}
                      />
                      <Label htmlFor="option-structured" className="text-sm cursor-pointer">Structured Data</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="option-images" 
                        checked={apiRequest.options.images}
                        onCheckedChange={() => handleApiOptionChange('images')}
                      />
                      <Label htmlFor="option-images" className="text-sm cursor-pointer">Images</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="option-serp" 
                        checked={apiRequest.options.serp}
                        onCheckedChange={() => handleApiOptionChange('serp')}
                      />
                      <Label htmlFor="option-serp" className="text-sm cursor-pointer">SERP Data</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="option-styles" 
                        checked={apiRequest.options.styles}
                        onCheckedChange={() => handleApiOptionChange('styles')}
                      />
                      <Label htmlFor="option-styles" className="text-sm cursor-pointer">CSS</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="option-scripts" 
                        checked={apiRequest.options.scripts}
                        onCheckedChange={() => handleApiOptionChange('scripts')}
                      />
                      <Label htmlFor="option-scripts" className="text-sm cursor-pointer">JavaScript</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="option-headers" 
                        checked={apiRequest.options.headers}
                        onCheckedChange={() => handleApiOptionChange('headers')}
                      />
                      <Label htmlFor="option-headers" className="text-sm cursor-pointer">Headers</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="option-cookies" 
                        checked={apiRequest.options.cookies}
                        onCheckedChange={() => handleApiOptionChange('cookies')}
                      />
                      <Label htmlFor="option-cookies" className="text-sm cursor-pointer">Cookies</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {apiResult && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="flex items-center gap-2">
                    <Globe className="size-4" />
                    Results
                    {apiResult.status === 'loading' && (
                      <Badge variant="outline" className="ml-2 bg-muted/30">
                        <Loader2 className="size-3 mr-1 animate-spin" />
                        Loading...
                      </Badge>
                    )}
                    {apiResult.status === 'success' && (
                      <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-500">
                        <CheckCircle className="size-3 mr-1" />
                        Success
                      </Badge>
                    )}
                    {apiResult.status === 'error' && (
                      <Badge variant="outline" className="ml-2 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-500">
                        <XCircle className="size-3 mr-1" />
                        Error
                      </Badge>
                    )}
                  </h3>
                </div>
                
                {apiResult.status === 'error' ? (
                  <Alert variant="destructive">
                    <AlertTriangle className="size-4" />
                    <AlertDescription>
                      {apiResult.error || "An error occurred while processing your request."}
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Tabs value={activeResultTab} onValueChange={setActiveResultTab} className="space-y-4">
                    <TabsList className="w-full">
                      <TabsTrigger value="preview" className="flex-1">
                        <Eye className="size-4 mr-1.5" />
                        Preview
                      </TabsTrigger>
                      <TabsTrigger value="json" className="flex-1">
                        <FileJson className="size-4 mr-1.5" />
                        JSON
                      </TabsTrigger>
                      {apiResult.data.images && apiResult.data.images.length > 0 && (
                        <TabsTrigger value="images" className="flex-1">
                          <Image className="size-4 mr-1.5" />
                          Images
                        </TabsTrigger>
                      )}
                      {apiResult.data.serp && (
                        <TabsTrigger value="serp" className="flex-1">
                          <Search className="size-4 mr-1.5" />
                          SERP
                        </TabsTrigger>
                      )}
                    </TabsList>
                    
                    <TabsContent value="preview" className="space-y-4">
                      {apiResult.status === 'loading' ? (
                        <div className="h-60 flex items-center justify-center">
                          <Loader2 className="size-10 animate-spin text-muted" />
                        </div>
                      ) : (
                        <>
                          {apiResult.data.title && (
                            <div className="space-y-1.5">
                              <h4 className="text-sm text-muted-foreground">Page Title</h4>
                              <div className="p-3 border rounded-md">{apiResult.data.title}</div>
                            </div>
                          )}
                          
                          {apiResult.data.description && (
                            <div className="space-y-1.5">
                              <h4 className="text-sm text-muted-foreground">Description</h4>
                              <div className="p-3 border rounded-md">{apiResult.data.description}</div>
                            </div>
                          )}
                          
                          {apiResult.data.html && (
                            <div className="space-y-1.5">
                              <h4 className="text-sm text-muted-foreground">HTML Content</h4>
                              <div className="p-3 border rounded-md bg-muted/5 max-h-[400px] overflow-auto">
                                <pre className="whitespace-pre-wrap text-xs">
                                  {apiResult.data.html.length > 5000 
                                    ? apiResult.data.html.substring(0, 5000) + "..."
                                    : apiResult.data.html
                                  }
                                </pre>
                              </div>
                            </div>
                          )}
                          
                          {apiResult.data.metadata && Object.keys(apiResult.data.metadata).length > 0 && (
                            <div className="space-y-1.5">
                              <h4 className="text-sm text-muted-foreground">Metadata</h4>
                              <div className="p-3 border rounded-md">
                                <div className="grid grid-cols-2 gap-2">
                                  {Object.entries(apiResult.data.metadata).map(([key, value]) => (
                                    <div key={key} className="overflow-hidden">
                                      <div className="font-medium text-xs">{key}</div>
                                      <div className="text-xs truncate text-muted-foreground">{value}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="json">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <h4 className="text-sm text-muted-foreground">Raw JSON Data</h4>
                          <Button variant="outline" size="sm">
                            <Download className="size-4 mr-1.5" />
                            Download
                          </Button>
                        </div>
                        <div className="p-3 border rounded-md bg-muted/5 max-h-[500px] overflow-auto">
                          <pre className="whitespace-pre-wrap text-xs">
                            {JSON.stringify(apiResult.data, null, 2)}
                          </pre>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="images">
                      {apiResult.data.images && apiResult.data.images.length > 0 ? (
                        <div className="space-y-2">
                          <h4 className="text-sm text-muted-foreground">
                            Images Found: {apiResult.data.images.length}
                          </h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {apiResult.data.images.map((image, index) => (
                              <div key={index} className="border rounded-md overflow-hidden">
                                <ImageWithFallback
                                  src={image}
                                  alt={`Image ${index + 1}`}
                                  width={200}
                                  height={150}
                                  className="w-full h-36 object-cover"
                                />
                                <div className="p-2 text-xs truncate text-muted-foreground">
                                  {image.split('/').pop()}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <Image className="size-12 mx-auto text-muted-foreground opacity-20" />
                          <p className="mt-4 text-muted-foreground">No images were found on this page</p>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="serp">
                      {apiResult.data.serp && (
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <h4 className="text-sm text-muted-foreground">
                              Organic Results: {apiResult.data.serp.organic.length}
                            </h4>
                            <div className="space-y-3">
                              {apiResult.data.serp.organic.map((result, index) => (
                                <div key={index} className="border p-3 rounded-md">
                                  <div className="text-xs text-muted-foreground">#{result.position}</div>
                                  <h5 className="text-blue-600 dark:text-blue-400">{result.title}</h5>
                                  <div className="text-xs text-green-700 dark:text-green-500 mb-1">
                                    {result.link}
                                  </div>
                                  <p className="text-sm">{result.snippet}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {apiResult.data.serp.relatedSearches && apiResult.data.serp.relatedSearches.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="text-sm text-muted-foreground">Related Searches</h4>
                              <div className="flex flex-wrap gap-2">
                                {apiResult.data.serp.relatedSearches.map((term, index) => (
                                  <Badge key={index} variant="outline">{term}</Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      );
      
    case "site-cloner":
      return (
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="clone-url">Website URL to Clone</Label>
                  <div className="flex mt-1.5">
                    <Input
                      id="clone-url"
                      placeholder="https://example.com"
                      value={siteCloner.url}
                      onChange={handleSiteClonerInputChange}
                      className="flex-1 rounded-r-none"
                      disabled={siteCloner.status === 'cloning'}
                    />
                    <Button 
                      onClick={startCloning} 
                      className="rounded-l-none"
                      disabled={siteCloner.status === 'cloning' || !siteCloner.url}
                    >
                      {siteCloner.status === 'cloning' ? (
                        <>
                          <Loader2 className="size-4 mr-2 animate-spin" />
                          Cloning...
                        </>
                      ) : (
                        <>
                          <Copy className="size-4 mr-2" />
                          Clone Site
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-2">
                  <h4 className="font-medium mb-3">Cloning Options</h4>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="recursive">Recursive Cloning</Label>
                            <p className="text-xs text-muted-foreground">Clone linked pages from the same domain</p>
                          </div>
                          <Switch
                            id="recursive"
                            checked={siteCloner.options.recursive}
                            onCheckedChange={(checked) => handleSiteClonerOptionChange('recursive', checked)}
                            disabled={siteCloner.status === 'cloning'}
                          />
                        </div>
                        
                        {siteCloner.options.recursive && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="maxDepth">Max Depth</Label>
                              <Select
                                value={siteCloner.options.maxDepth.toString()}
                                onValueChange={(value) => handleSiteClonerOptionChange('maxDepth', parseInt(value))}
                                disabled={siteCloner.status === 'cloning'}
                              >
                                <SelectTrigger className="w-20">
                                  <SelectValue placeholder="Depth" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">1</SelectItem>
                                  <SelectItem value="2">2</SelectItem>
                                  <SelectItem value="3">3</SelectItem>
                                  <SelectItem value="4">4</SelectItem>
                                  <SelectItem value="5">5</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              How many levels of linked pages to follow. Higher values take longer.
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="include-assets">Include Assets</Label>
                          <Switch
                            id="include-assets"
                            checked={siteCloner.options.includeAssets}
                            onCheckedChange={(checked) => handleSiteClonerOptionChange('includeAssets', checked)}
                            disabled={siteCloner.status === 'cloning'}
                          />
                        </div>
                        
                        {siteCloner.options.includeAssets && (
                          <div className="border rounded-md p-3 space-y-3">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="option-images" 
                                checked={siteCloner.options.downloadImages}
                                onCheckedChange={(checked) => 
                                  handleSiteClonerOptionChange('downloadImages', checked === true)
                                }
                                disabled={siteCloner.status === 'cloning'}
                              />
                              <Label htmlFor="option-images" className="text-sm cursor-pointer">Download Images</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="option-styles" 
                                checked={siteCloner.options.downloadStyles}
                                onCheckedChange={(checked) => 
                                  handleSiteClonerOptionChange('downloadStyles', checked === true)
                                }
                                disabled={siteCloner.status === 'cloning'}
                              />
                              <Label htmlFor="option-styles" className="text-sm cursor-pointer">Download CSS Files</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="option-scripts" 
                                checked={siteCloner.options.downloadScripts}
                                onCheckedChange={(checked) => 
                                  handleSiteClonerOptionChange('downloadScripts', checked === true)
                                }
                                disabled={siteCloner.status === 'cloning'}
                              />
                              <Label htmlFor="option-scripts" className="text-sm cursor-pointer">Download JavaScript Files</Label>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="space-y-0.5">
                        <Label htmlFor="optimize">Optimize for Production</Label>
                        <p className="text-xs text-muted-foreground">Minify HTML, CSS, JS and compress images</p>
                      </div>
                      <Switch
                        id="optimize"
                        checked={siteCloner.options.optimizeForProduction}
                        onCheckedChange={(checked) => handleSiteClonerOptionChange('optimizeForProduction', checked)}
                        disabled={siteCloner.status === 'cloning'}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {siteCloner.status !== 'idle' && (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="flex items-center gap-2">
                      <Copy className="size-4" />
                      Cloning Results
                    </h3>
                    
                    {siteCloner.status === 'cloning' && (
                      <Badge variant="outline" className="bg-muted/30">
                        <Loader2 className="size-3 mr-1 animate-spin" />
                        Cloning...
                      </Badge>
                    )}
                    {siteCloner.status === 'success' && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-500">
                        <CheckCircle className="size-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                    {siteCloner.status === 'error' && (
                      <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-500">
                        <XCircle className="size-3 mr-1" />
                        Failed
                      </Badge>
                    )}
                  </div>
                  
                  {siteCloner.status === 'cloning' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Cloning in progress...</span>
                        <span>{siteCloner.progress}%</span>
                      </div>
                      <Progress value={siteCloner.progress} className="h-2" />
                    </div>
                  )}
                  
                  {siteCloner.status === 'error' && siteCloner.result?.error && (
                    <Alert variant="destructive">
                      <AlertTriangle className="size-4" />
                      <AlertDescription>{siteCloner.result.error}</AlertDescription>
                    </Alert>
                  )}
                  
                  {siteCloner.status === 'success' && siteCloner.result && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border rounded-md p-4 text-center">
                          <div className="text-2xl font-semibold">{siteCloner.result.filesCloned}</div>
                          <div className="text-sm text-muted-foreground">Files Cloned</div>
                        </div>
                        <div className="border rounded-md p-4 text-center">
                          <div className="text-2xl font-semibold">{siteCloner.result.totalSize}</div>
                          <div className="text-sm text-muted-foreground">Total Size</div>
                        </div>
                        <div className="border rounded-md p-4 text-center">
                          <div className="text-2xl font-semibold">{siteCloner.result.mainHtmlFile}</div>
                          <div className="text-sm text-muted-foreground">Main HTML File</div>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4 mt-2">
                        <h4 className="font-medium mb-3">Preview & Download</h4>
                        <Tabs defaultValue="preview" className="space-y-4">
                          <TabsList className="w-full">
                            <TabsTrigger value="preview" className="flex-1">
                              <Eye className="size-4 mr-1.5" />
                              Preview
                            </TabsTrigger>
                            <TabsTrigger value="files" className="flex-1">
                              <Code className="size-4 mr-1.5" />
                              Files
                            </TabsTrigger>
                            <TabsTrigger value="terminal" className="flex-1">
                              <Terminal className="size-4 mr-1.5" />
                              Console
                            </TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="preview" className="border rounded-md h-[400px] overflow-hidden">
                            <div className="bg-muted/20 p-2 border-b flex items-center">
                              <Input 
                                value={siteCloner.url} 
                                readOnly 
                                className="bg-background"
                              />
                            </div>
                            <div className="flex items-center justify-center h-[calc(400px-41px)] bg-white dark:bg-black">
                              <div className="text-center">
                                <Globe className="size-16 text-muted-foreground/30 mx-auto mb-4" />
                                <p className="text-muted-foreground">
                                  Preview available when downloading the cloned site
                                </p>
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="files" className="border rounded-md p-4 h-[400px] overflow-auto">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2 bg-muted/20 p-2 rounded">
                                <FileDigit className="size-4 text-blue-500" />
                                <span className="font-medium">index.html</span>
                                <span className="text-xs text-muted-foreground">12.4 KB</span>
                              </div>
                              <div className="flex items-center space-x-2 bg-muted/20 p-2 rounded">
                                <FileDigit className="size-4 text-purple-500" />
                                <span className="font-medium">style.css</span>
                                <span className="text-xs text-muted-foreground">5.2 KB</span>
                              </div>
                              <div className="flex items-center space-x-2 bg-muted/20 p-2 rounded">
                                <FileDigit className="size-4 text-yellow-500" />
                                <span className="font-medium">main.js</span>
                                <span className="text-xs text-muted-foreground">8.7 KB</span>
                              </div>
                              <div className="pl-6 space-y-2">
                                <div className="flex items-center space-x-2 bg-muted/10 p-2 rounded">
                                  <FileDigit className="size-4 text-yellow-500" />
                                  <span className="font-medium">vendor.js</span>
                                  <span className="text-xs text-muted-foreground">45.3 KB</span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-muted-foreground text-xs">+{siteCloner.result.filesCloned - 4} more files</span>
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="terminal" className="border rounded-md bg-black text-green-500 font-mono text-xs p-4 h-[400px] overflow-auto">
                            <pre>
{`> site-cloner starting...
> Target URL: ${siteCloner.url}
> Options: recursive=${siteCloner.options.recursive ? 'true' : 'false'}, maxDepth=${siteCloner.options.maxDepth}, includeAssets=${siteCloner.options.includeAssets ? 'true' : 'false'}

[1/4] Analyzing site structure...
  - Found ${Math.floor(Math.random() * 20) + 5} pages to clone
  - Found ${Math.floor(Math.random() * 30) + 10} assets to download

[2/4] Downloading HTML content...
  - index.html (12.4 KB)
  - about.html (8.2 KB)
  - contact.html (6.7 KB)
  ...

[3/4] Processing assets...
  - Processing CSS files: ${siteCloner.options.downloadStyles ? 'OK' : 'SKIPPED'}
  - Processing JS files: ${siteCloner.options.downloadScripts ? 'OK' : 'SKIPPED'}
  - Processing images: ${siteCloner.options.downloadImages ? 'OK' : 'SKIPPED'}
  - Total files processed: ${siteCloner.result.filesCloned}

[4/4] ${siteCloner.options.optimizeForProduction ? 'Optimizing for production...' : 'Finalizing clone...'}
${siteCloner.options.optimizeForProduction ? '  - Minifying HTML, CSS, JS\n  - Compressing images\n  - Total size reduction: 42%' : ''}

> Clone completed successfully
> Total size: ${siteCloner.result.totalSize}
> Files cloned: ${siteCloner.result.filesCloned}
> Main file: ${siteCloner.result.mainHtmlFile}
> Time elapsed: ${Math.floor(Math.random() * 30) + 10} seconds

Clone is ready for download!`}
                            </pre>
                          </TabsContent>
                        </Tabs>
                        
                        <div className="flex justify-end mt-4">
                          <Button className="gap-1.5">
                            <Download className="size-4" />
                            Download Clone (.zip)
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      );
      
    default:
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <Globe className="size-16 text-muted-foreground mb-4" />
          <h3 className="mb-2">Select a Web Tool</h3>
          <p className="text-center text-muted-foreground max-w-md">
            Choose a tool from the menu above to scrape website data or clone entire sites.
          </p>
        </div>
      );
  }
}

// Helper function to generate mock API response for demonstration
function generateMockApiResponse(request: APIScraperRequest): APIScraperResult['data'] {
  const domain = extractDomain(request.url);
  
  // Generate a predictable but random-looking result based on the URL
  const mockData: APIScraperResult['data'] = {
    url: request.url,
    title: `${capitalizeFirstLetter(domain)} - Official Website`,
    description: `Welcome to ${capitalizeFirstLetter(domain)}, the leading platform for ${domain.includes('e') ? 'technology solutions' : 'innovative services'}. Discover our ${domain.length > 6 ? 'premium' : 'standard'} offerings.`,
  };
  
  // Add HTML content if requested
  mockData.html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${mockData.title}</title>
  <meta name="description" content="${mockData.description}">
</head>
<body>
  <header>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <h1>Welcome to ${capitalizeFirstLetter(domain)}</h1>
    <p>${mockData.description}</p>
    <!-- More content would be here -->
  </main>
  <footer>
    <p>&copy; ${new Date().getFullYear()} ${capitalizeFirstLetter(domain)}. All rights reserved.</p>
  </footer>
</body>
</html>`;
  
  // Add metadata if requested
  if (request.options.metadata) {
    mockData.metadata = {
      "title": mockData.title,
      "description": mockData.description,
      "og:title": mockData.title,
      "og:description": mockData.description,
      "og:type": "website",
      "og:url": request.url,
      "og:image": `https://${domain}/og-image.jpg`,
      "twitter:card": "summary_large_image",
      "twitter:title": mockData.title,
      "twitter:description": mockData.description,
      "twitter:image": `https://${domain}/twitter-image.jpg`,
      "robots": "index, follow",
      "canonical": request.url,
      "viewport": "width=device-width, initial-scale=1.0",
    };
  }
  
  // Add structured data if requested
  if (request.options.structured) {
    mockData.structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": capitalizeFirstLetter(domain),
      "url": request.url,
      "logo": `https://${domain}/logo.png`,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-555-123-4567",
        "contactType": "customer service"
      },
      "sameAs": [
        `https://www.facebook.com/${domain}`,
        `https://www.twitter.com/${domain}`,
        `https://www.linkedin.com/company/${domain}`
      ]
    };
  }
  
  // Add images if requested
  if (request.options.images) {
    mockData.images = [
      `https://source.unsplash.com/random/800x600?${domain}`,
      `https://source.unsplash.com/random/600x400?${extractKeyword(domain, 0)}`,
      `https://source.unsplash.com/random/400x300?${extractKeyword(domain, 1)}`,
      `https://source.unsplash.com/random/300x200?${extractKeyword(domain, 2)}`,
      `https://source.unsplash.com/random/200x200?${extractKeyword(domain, 3)}`,
    ];
  }
  
  // Add SERP data if requested
  if (request.options.serp) {
    mockData.serp = {
      organic: [
        {
          title: `${capitalizeFirstLetter(domain)} - Official Website`,
          link: request.url,
          snippet: `${capitalizeFirstLetter(domain)} is the leading provider of ${domain.includes('e') ? 'technology solutions' : 'innovative services'} with a focus on ${domain.length > 6 ? 'enterprise' : 'consumer'} applications.`,
          position: 1
        },
        {
          title: `About ${capitalizeFirstLetter(domain)} | Our Story`,
          link: `${request.url}/about`,
          snippet: `Learn about our journey, mission and values. ${capitalizeFirstLetter(domain)} was founded in ${2000 + (domain.length % 20)} with a vision to transform the industry.`,
          position: 2
        },
        {
          title: `${capitalizeFirstLetter(domain)} Services - What We Offer`,
          link: `${request.url}/services`,
          snippet: `Explore our comprehensive range of services designed to help your business grow. From ${extractKeyword(domain, 0)} to ${extractKeyword(domain, 1)}.`,
          position: 3
        },
        {
          title: `Contact ${capitalizeFirstLetter(domain)} - Support & Sales`,
          link: `${request.url}/contact`,
          snippet: `Get in touch with our team for inquiries about our services, technical support, or partnership opportunities.`,
          position: 4
        }
      ],
      relatedSearches: [
        `${domain} reviews`,
        `${domain} vs ${shuffleString(domain)}`,
        `${domain} pricing`,
        `${domain} alternatives`,
        `${domain} ${extractKeyword(domain, 0)} tutorial`,
        `${domain} download`
      ]
    };
  }
  
  return mockData;
}

// Helper functions for generating mock data
function extractDomain(url: string): string {
  try {
    const hostname = new URL(url).hostname;
    return hostname.replace(/^www\./, '').split('.')[0];
  } catch (e) {
    // If the URL is invalid, just return the input as a fallback
    return url.replace(/^https?:\/\//, '').replace(/^www\./, '').split('.')[0].split('/')[0];
  }
}

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function extractKeyword(str: string, index: number): string {
  const keywords = [
    'digital', 'analytics', 'solution', 'cloud',
    'service', 'platform', 'product', 'system',
    'technology', 'software', 'app', 'data',
    'online', 'tool', 'strategy', 'business'
  ];
  
  // Use a consistent mapping from string to keyword
  const charCode = str.charCodeAt(index % str.length) || 0;
  return keywords[charCode % keywords.length];
}

function shuffleString(str: string): string {
  if (str.length <= 1) return str;
  const arr = str.split('');
  const last = arr.length - 1;
  
  // Simple deterministic shuffle
  for (let i = 0; i < arr.length - 1; i++) {
    const j = (last - i) % arr.length;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  
  return arr.join('');
}
