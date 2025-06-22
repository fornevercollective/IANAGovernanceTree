import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export function NetworkTools() {
  const [pingDomain, setPingDomain] = useState("");
  const [pingResult, setPingResult] = useState("");
  const [pingLoading, setPingLoading] = useState(false);
  
  const [tracerouteDomain, setTracerouteDomain] = useState("");
  const [tracerouteResult, setTracerouteResult] = useState("");
  const [tracerouteLoading, setTracerouteLoading] = useState(false);
  
  const [dnsLookupDomain, setDnsLookupDomain] = useState("");
  const [dnsLookupResult, setDnsLookupResult] = useState("");
  const [dnsLookupLoading, setDnsLookupLoading] = useState(false);
  
  const [packetCaptureDomain, setPacketCaptureDomain] = useState("");
  const [packetCaptureResult, setPacketCaptureResult] = useState("");
  const [packetCaptureLoading, setPacketCaptureLoading] = useState(false);

  // Mock network operations
  const handlePing = async () => {
    if (!pingDomain) return;
    
    setPingLoading(true);
    
    // Simulate network operation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockPingResult = `ping ${pingDomain}
PING ${pingDomain} (${generateRandomIP()}): 56 data bytes
64 bytes from ${generateRandomIP()}: icmp_seq=0 ttl=64 time=12.345 ms
64 bytes from ${generateRandomIP()}: icmp_seq=1 ttl=64 time=11.234 ms
64 bytes from ${generateRandomIP()}: icmp_seq=2 ttl=64 time=13.456 ms
64 bytes from ${generateRandomIP()}: icmp_seq=3 ttl=64 time=10.987 ms
64 bytes from ${generateRandomIP()}: icmp_seq=4 ttl=64 time=12.678 ms

--- ${pingDomain} ping statistics ---
5 packets transmitted, 5 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 10.987/12.140/13.456/0.987 ms`;
    
    setPingResult(mockPingResult);
    setPingLoading(false);
  };

  const handleTraceroute = async () => {
    if (!tracerouteDomain) return;
    
    setTracerouteLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockTracerouteResult = `traceroute ${tracerouteDomain}
traceroute to ${tracerouteDomain} (${generateRandomIP()}), 30 hops max, 60 byte packets
 1  gateway (192.168.1.1)  1.234 ms  1.123 ms  1.345 ms
 2  10.0.0.1 (10.0.0.1)  8.567 ms  8.234 ms  8.789 ms
 3  isp-router.net (203.0.113.1)  15.234 ms  15.123 ms  15.345 ms
 4  backbone1.isp.net (203.0.113.10)  22.456 ms  22.234 ms  22.567 ms
 5  backbone2.isp.net (203.0.113.20)  28.789 ms  28.456 ms  28.890 ms
 6  edge-router.cdn.net (198.51.100.1)  35.123 ms  35.234 ms  35.345 ms
 7  ${tracerouteDomain} (${generateRandomIP()})  42.567 ms  42.345 ms  42.678 ms`;
    
    setTracerouteResult(mockTracerouteResult);
    setTracerouteLoading(false);
  };

  const handleDnsLookup = async () => {
    if (!dnsLookupDomain) return;
    
    setDnsLookupLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockDnsResult = `nslookup ${dnsLookupDomain}
Server:     8.8.8.8
Address:    8.8.8.8#53

Non-authoritative answer:
Name:   ${dnsLookupDomain}
Address: ${generateRandomIP()}
Name:   ${dnsLookupDomain}
Address: ${generateRandomIP()}

Authoritative answers can be found from:
${dnsLookupDomain}
    nameserver = ns1.${dnsLookupDomain}.
    nameserver = ns2.${dnsLookupDomain}.
    nameserver = ns3.${dnsLookupDomain}.
ns1.${dnsLookupDomain}
    internet address = ${generateRandomIP()}
ns2.${dnsLookupDomain}
    internet address = ${generateRandomIP()}
ns3.${dnsLookupDomain}
    internet address = ${generateRandomIP()}`;
    
    setDnsLookupResult(mockDnsResult);
    setDnsLookupLoading(false);
  };

  const handlePacketCapture = async () => {
    if (!packetCaptureDomain) return;
    
    setPacketCaptureLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    const mockPacketResult = `tcpdump -i eth0 -c 10 host ${packetCaptureDomain}
tcpdump: verbose output suppressed, use -v or -vv for full protocol decode
listening on eth0, link-type EN10MB (Ethernet), capture size 262144 bytes

14:30:12.123456 IP ${generateRandomIP()}.52438 > ${packetCaptureDomain}.http: Flags [S], seq 1234567890, win 65535, length 0
14:30:12.145678 IP ${packetCaptureDomain}.http > ${generateRandomIP()}.52438: Flags [S.], seq 987654321, ack 1234567891, win 65535, length 0
14:30:12.145890 IP ${generateRandomIP()}.52438 > ${packetCaptureDomain}.http: Flags [.], ack 987654322, win 65535, length 0
14:30:12.146123 IP ${generateRandomIP()}.52438 > ${packetCaptureDomain}.http: Flags [P.], seq 1234567891:1234568291, ack 987654322, win 65535, length 400
14:30:12.167890 IP ${packetCaptureDomain}.http > ${generateRandomIP()}.52438: Flags [.], ack 1234568291, win 65535, length 0
14:30:12.168123 IP ${packetCaptureDomain}.http > ${generateRandomIP()}.52438: Flags [P.], seq 987654322:987655722, ack 1234568291, win 65535, length 1400
14:30:12.168345 IP ${generateRandomIP()}.52438 > ${packetCaptureDomain}.http: Flags [.], ack 987655722, win 65535, length 0
14:30:12.169456 IP ${packetCaptureDomain}.http > ${generateRandomIP()}.52438: Flags [F.], seq 987655722, ack 1234568291, win 65535, length 0
14:30:12.169678 IP ${generateRandomIP()}.52438 > ${packetCaptureDomain}.http: Flags [F.], seq 1234568291, ack 987655723, win 65535, length 0
14:30:12.169890 IP ${packetCaptureDomain}.http > ${generateRandomIP()}.52438: Flags [.], ack 1234568292, win 65535, length 0

10 packets captured
10 packets received by filter
0 packets dropped by kernel`;
    
    setPacketCaptureResult(mockPacketResult);
    setPacketCaptureLoading(false);
  };

  const generateRandomIP = () => {
    return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="lark-icon-sm bg-primary/10 rounded-full flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10">
          <span className="lark-icon text-primary">nt</span>
        </div>
        <div>
          <h3 className="font-mono font-medium text-sm sm:text-base">network diagnostics</h3>
          <p className="font-mono text-xs sm:text-sm text-muted-foreground">terminal-based network analysis tools</p>
        </div>
      </div>

      {/* Main Tool Interface */}
      <div className="lark-card">
        <div className="flex items-center gap-2 mb-4">
          <span className="lark-icon text-primary">tl</span>
          <h4 className="font-mono text-sm font-medium">diagnostic tools</h4>
          <p className="font-mono text-xs text-muted-foreground ml-auto">ping, traceroute, dns, packet capture</p>
        </div>

        <Tabs defaultValue="ping" className="w-full">
          {/* Lark-styled Tab Navigation */}
          <div className="border-b mb-4">
            <TabsList className="bg-transparent border-0 p-0 h-auto space-x-0 w-full justify-start">
              <TabsTrigger 
                value="ping"
                className="lark-nav-tab animate-underline data-[state=active]:lark-nav-tab-active data-[state=inactive]:lark-nav-tab-inactive"
              >
                <span className="lark-icon mr-2">pg</span>
                <span className="font-mono text-sm">ping</span>
              </TabsTrigger>
              <TabsTrigger 
                value="traceroute"
                className="lark-nav-tab animate-underline data-[state=active]:lark-nav-tab-active data-[state=inactive]:lark-nav-tab-inactive ml-6"
              >
                <span className="lark-icon mr-2">tr</span>
                <span className="font-mono text-sm">traceroute</span>
              </TabsTrigger>
              <TabsTrigger 
                value="dns"
                className="lark-nav-tab animate-underline data-[state=active]:lark-nav-tab-active data-[state=inactive]:lark-nav-tab-inactive ml-6"
              >
                <span className="lark-icon mr-2">dn</span>
                <span className="font-mono text-sm">dns lookup</span>
              </TabsTrigger>
              <TabsTrigger 
                value="packet"
                className="lark-nav-tab animate-underline data-[state=active]:lark-nav-tab-active data-[state=inactive]:lark-nav-tab-inactive ml-6"
              >
                <span className="lark-icon mr-2">pc</span>
                <span className="font-mono text-sm">packet capture</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* Ping Tab */}
          <TabsContent value="ping" className="space-y-4 mt-0">
            <div className="flex gap-2">
              <div className="flex-grow">
                <Input 
                  placeholder="enter domain to ping (e.g., example.com)" 
                  value={pingDomain}
                  onChange={(e) => setPingDomain(e.target.value)}
                  className="lark-input-standard font-mono"
                />
              </div>
              <Button
                onClick={handlePing}
                disabled={pingLoading || !pingDomain}
                className="lark-button-primary animate-accent-line"
              >
                {pingLoading ? (
                  <>
                    <span className="lark-icon mr-2 animate-pulse">◯</span>
                    <span className="font-mono">pinging...</span>
                  </>
                ) : (
                  <>
                    <span className="lark-icon mr-2">pg</span>
                    <span className="font-mono">ping</span>
                  </>
                )}
              </Button>
            </div>
            
            {pingResult && (
              <div className="lark-card bg-terminal-bg border-2 border-dashed border-terminal-cursor/30">
                <div className="flex items-center gap-2 mb-3">
                  <span className="lark-icon text-terminal-cursor">tm</span>
                  <h5 className="font-mono text-sm font-medium text-terminal-fg">terminal output</h5>
                  <div className="ml-auto flex items-center gap-1">
                    <div className="lark-status-dot bg-terminal-cursor"></div>
                    <span className="font-mono text-xs text-terminal-cursor">active</span>
                  </div>
                </div>
                <Textarea 
                  readOnly 
                  value={pingResult}
                  className="font-mono text-xs h-64 bg-transparent border-0 text-terminal-fg placeholder:text-terminal-cursor/50 resize-none focus:ring-0 lark-terminal-cursor"
                />
              </div>
            )}
          </TabsContent>
          
          {/* Traceroute Tab */}
          <TabsContent value="traceroute" className="space-y-4 mt-0">
            <div className="flex gap-2">
              <div className="flex-grow">
                <Input 
                  placeholder="enter domain for traceroute (e.g., example.com)" 
                  value={tracerouteDomain}
                  onChange={(e) => setTracerouteDomain(e.target.value)}
                  className="lark-input-standard font-mono"
                />
              </div>
              <Button
                onClick={handleTraceroute}
                disabled={tracerouteLoading || !tracerouteDomain}
                className="lark-button-primary animate-accent-line"
              >
                {tracerouteLoading ? (
                  <>
                    <span className="lark-icon mr-2 animate-pulse">◯</span>
                    <span className="font-mono">tracing...</span>
                  </>
                ) : (
                  <>
                    <span className="lark-icon mr-2">tr</span>
                    <span className="font-mono">trace</span>
                  </>
                )}
              </Button>
            </div>
            
            {tracerouteResult && (
              <div className="lark-card bg-terminal-bg border-2 border-dashed border-terminal-cursor/30">
                <div className="flex items-center gap-2 mb-3">
                  <span className="lark-icon text-terminal-cursor">tm</span>
                  <h5 className="font-mono text-sm font-medium text-terminal-fg">terminal output</h5>
                  <div className="ml-auto flex items-center gap-1">
                    <div className="lark-status-dot bg-terminal-cursor"></div>
                    <span className="font-mono text-xs text-terminal-cursor">active</span>
                  </div>
                </div>
                <Textarea 
                  readOnly 
                  value={tracerouteResult}
                  className="font-mono text-xs h-64 bg-transparent border-0 text-terminal-fg placeholder:text-terminal-cursor/50 resize-none focus:ring-0"
                />
              </div>
            )}
          </TabsContent>
          
          {/* DNS Lookup Tab */}
          <TabsContent value="dns" className="space-y-4 mt-0">
            <div className="flex gap-2">
              <div className="flex-grow">
                <Input 
                  placeholder="enter domain for dns lookup (e.g., example.com)" 
                  value={dnsLookupDomain}
                  onChange={(e) => setDnsLookupDomain(e.target.value)}
                  className="lark-input-standard font-mono"
                />
              </div>
              <Button
                onClick={handleDnsLookup}
                disabled={dnsLookupLoading || !dnsLookupDomain}
                className="lark-button-primary animate-accent-line"
              >
                {dnsLookupLoading ? (
                  <>
                    <span className="lark-icon mr-2 animate-pulse">◯</span>
                    <span className="font-mono">looking up...</span>
                  </>
                ) : (
                  <>
                    <span className="lark-icon mr-2">dn</span>
                    <span className="font-mono">lookup</span>
                  </>
                )}
              </Button>
            </div>
            
            {dnsLookupResult && (
              <div className="lark-card bg-terminal-bg border-2 border-dashed border-terminal-cursor/30">
                <div className="flex items-center gap-2 mb-3">
                  <span className="lark-icon text-terminal-cursor">tm</span>
                  <h5 className="font-mono text-sm font-medium text-terminal-fg">terminal output</h5>
                  <div className="ml-auto flex items-center gap-1">
                    <div className="lark-status-dot bg-terminal-cursor"></div>
                    <span className="font-mono text-xs text-terminal-cursor">active</span>
                  </div>
                </div>
                <Textarea 
                  readOnly 
                  value={dnsLookupResult}
                  className="font-mono text-xs h-64 bg-transparent border-0 text-terminal-fg placeholder:text-terminal-cursor/50 resize-none focus:ring-0"
                />
              </div>
            )}
          </TabsContent>
          
          {/* Packet Capture Tab */}
          <TabsContent value="packet" className="space-y-4 mt-0">
            <div className="flex gap-2">
              <div className="flex-grow">
                <Input 
                  placeholder="enter domain for packet capture (e.g., example.com)" 
                  value={packetCaptureDomain}
                  onChange={(e) => setPacketCaptureDomain(e.target.value)}
                  className="lark-input-standard font-mono"
                />
              </div>
              <Button
                onClick={handlePacketCapture}
                disabled={packetCaptureLoading || !packetCaptureDomain}
                className="lark-button-primary animate-accent-line"
              >
                {packetCaptureLoading ? (
                  <>
                    <span className="lark-icon mr-2 animate-pulse">◯</span>
                    <span className="font-mono">capturing...</span>
                  </>
                ) : (
                  <>
                    <span className="lark-icon mr-2">pc</span>
                    <span className="font-mono">capture</span>
                  </>
                )}
              </Button>
            </div>
            
            {packetCaptureResult && (
              <div className="lark-card bg-terminal-bg border-2 border-dashed border-terminal-cursor/30">
                <div className="flex items-center gap-2 mb-3">
                  <span className="lark-icon text-terminal-cursor">tm</span>
                  <h5 className="font-mono text-sm font-medium text-terminal-fg">terminal output</h5>
                  <div className="ml-auto flex items-center gap-1">
                    <div className="lark-status-dot bg-terminal-cursor"></div>
                    <span className="font-mono text-xs text-terminal-cursor">active</span>
                  </div>
                </div>
                <Textarea 
                  readOnly 
                  value={packetCaptureResult}
                  className="font-mono text-xs h-64 bg-transparent border-0 text-terminal-fg placeholder:text-terminal-cursor/50 resize-none focus:ring-0"
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Quick Tools Section */}
      <div className="lark-card">
        <div className="flex items-center gap-2 mb-4">
          <span className="lark-icon text-primary">qt</span>
          <h4 className="font-mono text-sm font-medium">quick commands</h4>
          <p className="font-mono text-xs text-muted-foreground ml-auto">common network diagnostics</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={() => {
              setPingDomain("8.8.8.8");
              handlePing();
            }}
            className="lark-button-abbreviation text-left p-3 h-auto flex-col items-start animate-border-grow"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="lark-icon">gs</span>
              <span className="font-mono text-sm">google dns</span>
            </div>
            <span className="font-mono text-xs text-muted-foreground">ping 8.8.8.8</span>
          </button>
          
          <button
            onClick={() => {
              setDnsLookupDomain("github.com");
              handleDnsLookup();
            }}
            className="lark-button-abbreviation text-left p-3 h-auto flex-col items-start animate-border-grow"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="lark-icon">gh</span>
              <span className="font-mono text-sm">github</span>
            </div>
            <span className="font-mono text-xs text-muted-foreground">nslookup github.com</span>
          </button>
          
          <button
            onClick={() => {
              setTracerouteDomain("cloudflare.com");
              handleTraceroute();
            }}
            className="lark-button-abbreviation text-left p-3 h-auto flex-col items-start animate-border-grow"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="lark-icon">cf</span>
              <span className="font-mono text-sm">cloudflare</span>
            </div>
            <span className="font-mono text-xs text-muted-foreground">traceroute cloudflare.com</span>
          </button>
          
          <button
            onClick={() => {
              setPacketCaptureDomain("example.com");
              handlePacketCapture();
            }}
            className="lark-button-abbreviation text-left p-3 h-auto flex-col items-start animate-border-grow"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="lark-icon">ex</span>
              <span className="font-mono text-sm">example</span>
            </div>
            <span className="font-mono text-xs text-muted-foreground">tcpdump example.com</span>
          </button>
        </div>
      </div>
    </div>
  );
}