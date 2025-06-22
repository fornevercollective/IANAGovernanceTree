
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { TreeNodeProps } from "./VerticalTreeNode";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { FileText, Globe, Link2, Terminal, Cloud, Network, BarChart4, Clock } from "lucide-react";

interface InfoPanelProps {
  selectedNode: TreeNodeProps | null;
}

export function InfoPanel({ selectedNode }: InfoPanelProps) {
  if (!selectedNode) {
    return (
      <Card className="h-full">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Globe className="size-12 text-muted-foreground/50 mb-4" />
            <h4>No entity selected</h4>
            <p className="text-muted-foreground">
              Select an entity from the governance tree to view details.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Determine if the node is a CDN based on its ID or name
  const isCDN = selectedNode.id.startsWith("cdn") || 
                selectedNode.name.includes("CDN") || 
                selectedNode.name.includes("Cloudflare") ||
                selectedNode.name.includes("Akamai") ||
                selectedNode.name.includes("Fastly") ||
                selectedNode.name.includes("CloudFront");

  // Mock data for the selected node with enhanced CDN details
  const mockNodeDetails = {
    id: selectedNode.id,
    name: selectedNode.name,
    description: selectedNode.description || 
      "This entity is responsible for governance and coordination of internet resources.",
    type: isCDN ? "CDN Provider" :
          selectedNode.id.startsWith("1") ? "Governance Body" : 
          selectedNode.id.startsWith("2") ? "Advisory Committee" : 
          selectedNode.id.startsWith("3") ? "Registry Operator" : 
          selectedNode.id.startsWith("5") ? "Corporate Entity" : "Technical Group",
    established: isCDN ? 
      (selectedNode.name.includes("Cloudflare") ? "2009" :
       selectedNode.name.includes("Akamai") ? "1998" :
       selectedNode.name.includes("Fastly") ? "2011" :
       selectedNode.name.includes("CloudFront") ? "2008" :
       selectedNode.name.includes("Azure") ? "2009" : "2000") : "1998",
    website: isCDN ?
      (selectedNode.name.includes("Cloudflare") ? "https://cloudflare.com" :
       selectedNode.name.includes("Akamai") ? "https://akamai.com" :
       selectedNode.name.includes("Fastly") ? "https://fastly.com" :
       selectedNode.name.includes("CloudFront") ? "https://aws.amazon.com/cloudfront" :
       selectedNode.name.includes("Google") ? "https://cloud.google.com/cdn" :
       selectedNode.name.includes("Azure") ? "https://azure.microsoft.com/services/cdn" : 
       "https://example.org") : "https://example.org",
    relatedEntities: isCDN ? 
      [
        { id: "1.1", name: "IANA Functions Operator" },
        { id: "3", name: "Regional Internet Registries" }
      ] :
      [
        { id: "1.1", name: "Board of Directors" },
        { id: "2.3", name: "Technical Advisory Group" }
      ],
    terminalCommand: isCDN ? 
      `curl -I ${selectedNode.name.toLowerCase().includes("cloudflare") ? "https://cloudflare.com" :
        selectedNode.name.toLowerCase().includes("akamai") ? "https://akamai.com" :
        selectedNode.name.toLowerCase().includes("fastly") ? "https://fastly.com" :
        selectedNode.name.toLowerCase().includes("cloudfront") ? "https://aws.amazon.com" :
        selectedNode.name.toLowerCase().includes("google") ? "https://cloud.google.com" :
        "https://example.com"}` :
      selectedNode.id === "1" ? "dig +trace @198.41.0.4 example.com" : 
      selectedNode.id === "3.3" ? "whois -h whois.arin.net 104.18.22.41" :
      "traceroute example.com",
    // CDN specific properties
    cdn: isCDN ? {
      pops: selectedNode.name.includes("Cloudflare") ? 275 :
            selectedNode.name.includes("Akamai") ? 340 :
            selectedNode.name.includes("Fastly") ? 95 :
            selectedNode.name.includes("CloudFront") ? 410 :
            selectedNode.name.includes("Google") ? 146 :
            selectedNode.name.includes("Azure") ? 170 : 100,
      countries: selectedNode.name.includes("Cloudflare") ? 100 :
                selectedNode.name.includes("Akamai") ? 135 :
                selectedNode.name.includes("Fastly") ? 58 :
                selectedNode.name.includes("CloudFront") ? 96 :
                selectedNode.name.includes("Google") ? 88 :
                selectedNode.name.includes("Azure") ? 110 : 50,
      protocols: selectedNode.name.includes("Cloudflare") || 
                selectedNode.name.includes("Fastly") ? 
                ["HTTP/1.1", "HTTP/2", "HTTP/3 (QUIC)", "TLS 1.3"] :
                ["HTTP/1.1", "HTTP/2", "TLS 1.2"],
      services: selectedNode.name.includes("Cloudflare") ? 
                ["CDN", "DDoS Protection", "DNS", "WAF", "Workers (Edge Computing)"] :
                selectedNode.name.includes("Fastly") ?
                ["CDN", "Edge Computing", "Image Optimization", "WAF"] :
                ["CDN", "Media Delivery", "Security"]
    } : null
  };

  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2">
                {isCDN && <Cloud className="size-5 text-blue-500" />}
                {mockNodeDetails.name}
              </h3>
              <Badge variant={isCDN ? "secondary" : "outline"} className={isCDN ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300" : ""}>
                {mockNodeDetails.type}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-2">
              {mockNodeDetails.description}
            </p>
          </div>

          <Tabs defaultValue={isCDN ? "cdn-info" : "info"}>
            <TabsList className="w-full">
              <TabsTrigger value={isCDN ? "cdn-info" : "info"} className="flex-1">
                {isCDN ? <Cloud className="size-4 mr-1.5" /> : <FileText className="size-4 mr-1.5" />}
                Info
              </TabsTrigger>
              <TabsTrigger value="terminal" className="flex-1">
                <Terminal className="size-4 mr-1.5" />
                Terminal
              </TabsTrigger>
              <TabsTrigger value="relations" className="flex-1">
                <Link2 className="size-4 mr-1.5" />
                Relations
              </TabsTrigger>
              {isCDN && (
                <TabsTrigger value="metrics" className="flex-1">
                  <BarChart4 className="size-4 mr-1.5" />
                  Metrics
                </TabsTrigger>
              )}
            </TabsList>
            
            {/* Standard Info Tab (for non-CDN entities) */}
            <TabsContent value="info" className="mt-4">
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Established</div>
                  <div>{mockNodeDetails.established}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Website</div>
                  <div className="text-primary">{mockNodeDetails.website}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Governance ID</div>
                  <div>{mockNodeDetails.id}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Role</div>
                  <div className="mt-1">
                    {mockNodeDetails.type === "Governance Body" && (
                      "Oversees and administers internet resources and policy development."
                    )}
                    {mockNodeDetails.type === "Registry Operator" && (
                      "Maintains and operates registries of internet identifiers."
                    )}
                    {mockNodeDetails.type === "Technical Group" && (
                      "Develops and maintains technical standards and protocols."
                    )}
                    {mockNodeDetails.type === "Advisory Committee" && (
                      "Provides advice and recommendations on specific policy areas."
                    )}
                    {mockNodeDetails.type === "Corporate Entity" && (
                      "Commercial organization providing internet infrastructure services."
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* CDN Info Tab (only for CDN entities) */}
            <TabsContent value="cdn-info" className="mt-4">
              {mockNodeDetails.cdn && (
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Established</div>
                    <div>{mockNodeDetails.established}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Website</div>
                    <div className="text-primary">{mockNodeDetails.website}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Points of Presence</div>
                      <div className="flex items-center gap-1">
                        <Globe className="size-4 text-blue-500" />
                        {mockNodeDetails.cdn.pops}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Countries</div>
                      <div>{mockNodeDetails.cdn.countries}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Supported Protocols</div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {mockNodeDetails.cdn.protocols.map((protocol, index) => (
                        <Badge key={index} variant="outline">{protocol}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Services</div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {mockNodeDetails.cdn.services.map((service, index) => (
                        <Badge key={index} variant="secondary">{service}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">IANA Relationship</div>
                    <div className="mt-1">
                      CDNs rely on IP address allocations from Regional Internet Registries (RIRs) 
                      which are coordinated by IANA. They also depend on the DNS system managed 
                      under ICANN's authority.
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="terminal" className="mt-4">
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Terminal Command</div>
                  <div className="bg-black dark:bg-zinc-900 text-green-500 font-mono p-3 rounded-md overflow-x-auto whitespace-pre text-sm">
                    $ {mockNodeDetails.terminalCommand}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {isCDN ? "HTTP Header Response" : "Lookup Example"}
                  </div>
                  <div className="bg-black dark:bg-zinc-900 text-green-500 font-mono p-3 rounded-md overflow-x-auto whitespace-pre text-sm">
                    {isCDN && `
HTTP/2 200 
date: Wed, 28 May 2025 09:13:44 GMT
content-type: text/html; charset=UTF-8
${selectedNode.name.includes("Cloudflare") ? `cf-ray: 7a82e5469f7d2a76-IAD
cf-cache-status: DYNAMIC
server: cloudflare` :
selectedNode.name.includes("Fastly") ? `fastly-debug-digest: a8e67c83ad91af39abf61d8c94dc96999c1a820cfafebd731be48c9acd17889f
x-served-by: cache-iad2127-IAD
x-cache: HIT
server: Varnish` :
selectedNode.name.includes("Akamai") ? `x-akamai-transformed: 9 - 0 pmb=mRUM,1
akamai-request-bc: [a=23.103.46.132,b=70101115,c=g,n=US_VA_ASHBURN,o=8075]
server: AkamaiGHost` :
selectedNode.name.includes("CloudFront") ? `x-cache: Hit from cloudfront
via: 1.1 1234567890abcdef.cloudfront.net (CloudFront)
x-amz-cf-pop: IAD89-C1
x-amz-cf-id: abcdefghijklmnopqrstuvwxyz01234567890ABCDEFGH==` :
`x-served-by: cache-iad-exa78291
server: NetInfra`
}
strict-transport-security: max-age=31536000
vary: Accept-Encoding
x-content-type-options: nosniff
x-frame-options: DENY
x-xss-protection: 1; mode=block
                    `}
                    {mockNodeDetails.id === "1" && !isCDN && `
;; ANSWER SECTION:
example.com.		59	IN	A	93.184.216.34
example.com.		59	IN	A	93.184.216.34

;; AUTHORITY SECTION:
example.com.		172800	IN	NS	a.iana-servers.net.
example.com.		172800	IN	NS	b.iana-servers.net.

;; Query time: 28 msec
;; SERVER: 198.41.0.4#53(198.41.0.4)
                    `}
                    {mockNodeDetails.id === "3.3" && !isCDN && `
NetRange:       93.184.216.0 - 93.184.216.255
CIDR:           93.184.216.0/24
NetName:        EDGECAST-NETBLK-03
NetHandle:      NET-93-184-216-0-1
RegDate:        2012-05-25
Updated:        2012-05-25
Ref:            https://rdap.arin.net/registry/ip/93.184.216.0
                    `}
                    {!["1", "3.3"].includes(mockNodeDetails.id) && !isCDN && `
traceroute to example.com (93.184.216.34), 30 hops max
  1   192.168.0.1  1.501 ms  1.376 ms  1.386 ms
  2   10.0.0.1  15.347 ms  15.321 ms  16.019 ms
  3   172.16.0.1  32.446 ms  32.425 ms  32.383 ms
  4   93.184.216.34  43.35 ms  43.26 ms  43.79 ms
                    `}
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  {isCDN ? 
                    "These HTTP headers reveal CDN information, indicating how content is being served through the provider's infrastructure." :
                    "These terminal commands can be used to interact with this governance entity's infrastructure and verify its authority over specific internet resources."
                  }
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="relations" className="mt-4">
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Related Governance Entities</div>
                  <div className="space-y-2">
                    {mockNodeDetails.relatedEntities.map(entity => (
                      <div key={entity.id} className="border p-2 rounded-md">
                        <div className="font-medium">{entity.name}</div>
                        <div className="text-xs text-muted-foreground">ID: {entity.id}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Functions</div>
                  <ul className="list-disc pl-5 space-y-1">
                    {mockNodeDetails.type === "Governance Body" && (
                      <>
                        <li>Policy development and coordination</li>
                        <li>Resource allocation oversight</li>
                        <li>Registry management</li>
                      </>
                    )}
                    {mockNodeDetails.type === "Registry Operator" && (
                      <>
                        <li>Resource assignment and registration</li>
                        <li>Database maintenance</li>
                        <li>Allocation policy implementation</li>
                      </>
                    )}
                    {mockNodeDetails.type === "Technical Group" && (
                      <>
                        <li>Protocol development</li>
                        <li>Standards creation</li>
                        <li>Technical coordination</li>
                      </>
                    )}
                    {mockNodeDetails.type === "Advisory Committee" && (
                      <>
                        <li>Stakeholder representation</li>
                        <li>Policy review</li>
                        <li>Recommendations</li>
                      </>
                    )}
                    {mockNodeDetails.type === "CDN Provider" && (
                      <>
                        <li>Content distribution and caching</li>
                        <li>Traffic optimization</li>
                        <li>DDoS protection</li>
                        <li>Edge computing services</li>
                        <li>Security enhancement</li>
                      </>
                    )}
                    {mockNodeDetails.type === "Corporate Entity" && (
                      <>
                        <li>Internet infrastructure services</li>
                        <li>Technology development</li>
                        <li>Commercial service provision</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </TabsContent>

            {/* CDN Metrics Tab (only for CDN entities) */}
            {isCDN && (
              <TabsContent value="metrics" className="mt-4">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Key Performance Indicators</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border rounded-md p-3 text-center">
                        <div className="text-2xl font-semibold text-blue-500">
                          {Math.floor(Math.random() * 20 + 10)} ms
                        </div>
                        <div className="text-sm text-muted-foreground">Average Latency</div>
                      </div>
                      <div className="border rounded-md p-3 text-center">
                        <div className="text-2xl font-semibold text-green-500">99.99%</div>
                        <div className="text-sm text-muted-foreground">Uptime</div>
                      </div>
                      <div className="border rounded-md p-3 text-center">
                        <div className="text-2xl font-semibold text-amber-500">
                          {Math.floor(Math.random() * 100 + 100)} Tbps
                        </div>
                        <div className="text-sm text-muted-foreground">Network Capacity</div>
                      </div>
                      <div className="border rounded-md p-3 text-center">
                        <div className="text-2xl font-semibold text-purple-500">
                          {mockNodeDetails.cdn?.pops || 100}
                        </div>
                        <div className="text-sm text-muted-foreground">Points of Presence</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Protocol Support</div>
                    <div className="space-y-2">
                      {(mockNodeDetails.cdn?.protocols || []).map((protocol, index) => (
                        <div key={index} className="flex justify-between items-center bg-muted/20 p-2 rounded">
                          <span>{protocol}</span>
                          <Badge variant="outline" className={
                            protocol.includes("HTTP/3") ? "bg-green-50 text-green-700" : 
                            protocol.includes("HTTP/2") ? "bg-blue-50 text-blue-700" : 
                            "bg-muted"
                          }>
                            {protocol.includes("HTTP/3") ? "Next Generation" : 
                             protocol.includes("HTTP/2") ? "Standard" : "Legacy"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-2">IP Address Allocations</div>
                    <div className="bg-black dark:bg-zinc-900 text-green-500 font-mono p-3 rounded-md overflow-x-auto whitespace-pre text-sm">
                      {`
$ whois -h ${selectedNode.name.includes("Cloudflare") ? "whois.arin.net" : 
              selectedNode.name.includes("Akamai") ? "whois.arin.net" :
              selectedNode.name.includes("Fastly") ? "whois.ripe.net" : "whois.arin.net"} ${
                selectedNode.name.includes("Cloudflare") ? "104.16.0.0" : 
                selectedNode.name.includes("Akamai") ? "23.72.0.0" :
                selectedNode.name.includes("Fastly") ? "151.101.0.0" : "205.251.192.0"
              }

NetRange:       ${
  selectedNode.name.includes("Cloudflare") ? "104.16.0.0 - 104.31.255.255" : 
  selectedNode.name.includes("Akamai") ? "23.72.0.0 - 23.111.255.255" :
  selectedNode.name.includes("Fastly") ? "151.101.0.0 - 151.101.255.255" : "205.251.192.0 - 205.251.255.255"
}
CIDR:           ${
  selectedNode.name.includes("Cloudflare") ? "104.16.0.0/12" : 
  selectedNode.name.includes("Akamai") ? "23.72.0.0/11" :
  selectedNode.name.includes("Fastly") ? "151.101.0.0/16" : "205.251.192.0/18"
}
NetName:        ${
  selectedNode.name.includes("Cloudflare") ? "CLOUDFLARENET" : 
  selectedNode.name.includes("Akamai") ? "AKAMAI" :
  selectedNode.name.includes("Fastly") ? "EU-FASTLY-NET" : "AMAZON-CLOUDFRONT"
}
Organization:   ${
  selectedNode.name.includes("Cloudflare") ? "Cloudflare, Inc." : 
  selectedNode.name.includes("Akamai") ? "Akamai Technologies, Inc." :
  selectedNode.name.includes("Fastly") ? "Fastly, Inc." : "Amazon.com, Inc."
}
RegDate:        ${
  selectedNode.name.includes("Cloudflare") ? "2014-03-28" : 
  selectedNode.name.includes("Akamai") ? "2010-12-17" :
  selectedNode.name.includes("Fastly") ? "2015-06-12" : "2011-08-09"
}
Parent:         ${
  selectedNode.name.includes("Cloudflare") ? "NET104 (NET-104-0-0-0-0)" : 
  selectedNode.name.includes("Akamai") ? "NET23 (NET-23-0-0-0-0)" :
  selectedNode.name.includes("Fastly") ? "NET151 (NET-151-0-0-0-0)" : "NET205 (NET-205-0-0-0-0)"
}
`}
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    CDN providers are allocated IP address blocks by Regional Internet Registries (RIRs) 
                    which receive their authority from IANA. These allocations enable CDNs to deploy their 
                    edge networks globally.
                  </div>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}
