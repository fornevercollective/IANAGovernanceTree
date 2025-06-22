
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { CircleDot, Loader2, Globe, Network, FileSearch, Activity, Search } from "lucide-react";

export function NetworkTools() {
  const [pingDomain, setPingDomain] = useState("");
  const [pingLoading, setPingLoading] = useState(false);
  const [pingResult, setPingResult] = useState<string | null>(null);
  
  const [tracerouteDomain, setTracerouteDomain] = useState("");
  const [tracerouteLoading, setTracerouteLoading] = useState(false);
  const [tracerouteResult, setTracerouteResult] = useState<string | null>(null);
  
  const [dnsLookupDomain, setDnsLookupDomain] = useState("");
  const [dnsLookupLoading, setDnsLookupLoading] = useState(false);
  const [dnsLookupResult, setDnsLookupResult] = useState<string | null>(null);
  
  const [packetCaptureDomain, setPacketCaptureDomain] = useState("");
  const [packetCaptureLoading, setPacketCaptureLoading] = useState(false);
  const [packetCaptureResult, setPacketCaptureResult] = useState<string | null>(null);
  
  // Mock ping function
  const handlePing = async () => {
    if (!pingDomain) return;
    
    setPingLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockPingResult = `PING ${pingDomain} (104.17.96.20): 56 data bytes
64 bytes from 104.17.96.20: icmp_seq=0 ttl=57 time=24.118 ms
64 bytes from 104.17.96.20: icmp_seq=1 ttl=57 time=25.334 ms
64 bytes from 104.17.96.20: icmp_seq=2 ttl=57 time=23.943 ms
64 bytes from 104.17.96.20: icmp_seq=3 ttl=57 time=24.628 ms
64 bytes from 104.17.96.20: icmp_seq=4 ttl=57 time=24.245 ms

--- ${pingDomain} ping statistics ---
5 packets transmitted, 5 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 23.943/24.454/25.334/0.532 ms`;
    
    setPingResult(mockPingResult);
    setPingLoading(false);
  };
  
  // Mock traceroute function
  const handleTraceroute = async () => {
    if (!tracerouteDomain) return;
    
    setTracerouteLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockTracerouteResult = `traceroute to ${tracerouteDomain} (104.17.96.20), 30 hops max, 60 byte packets
 1  192.168.1.1 (192.168.1.1)  2.192 ms  1.860 ms  1.708 ms
 2  10.0.0.1 (10.0.0.1)  12.324 ms  14.243 ms  14.172 ms
 3  172.16.30.1 (172.16.30.1)  15.460 ms  15.401 ms  15.343 ms
 4  edge-router.isp.net (203.0.113.5)  18.645 ms  18.566 ms  18.491 ms
 5  core1.isp.net (203.0.113.10)  22.173 ms  22.115 ms  22.051 ms
 6  104.17.96.20 (104.17.96.20)  24.432 ms  24.358 ms  24.285 ms`;
    
    setTracerouteResult(mockTracerouteResult);
    setTracerouteLoading(false);
  };
  
  // Mock DNS lookup function
  const handleDnsLookup = async () => {
    if (!dnsLookupDomain) return;
    
    setDnsLookupLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const mockDnsLookupResult = `; <<>> DiG 9.10.6 <<>> ${dnsLookupDomain}
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 54321
;; flags: qr rd ra; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 4096
;; QUESTION SECTION:
;${dnsLookupDomain}.			IN	A

;; ANSWER SECTION:
${dnsLookupDomain}.		300	IN	A	104.17.96.20
${dnsLookupDomain}.		300	IN	A	104.17.97.20

;; Query time: 28 msec
;; SERVER: 8.8.8.8#53(8.8.8.8)
;; WHEN: Tue May 27 14:28:32 GMT 2025
;; MSG SIZE  rcvd: 72`;
    
    setDnsLookupResult(mockDnsLookupResult);
    setDnsLookupLoading(false);
  };
  
  // Mock packet capture function
  const handlePacketCapture = async () => {
    if (!packetCaptureDomain) return;
    
    setPacketCaptureLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const mockPacketCaptureResult = `14:28:45.123456 IP 192.168.1.100.54321 > ${packetCaptureDomain}.443: Flags [S], seq 1000:1000, win 64240, options [mss 1460,sackOK,TS val 123456789 ecr 0,nop,wscale 7], length 0
14:28:45.234567 IP ${packetCaptureDomain}.443 > 192.168.1.100.54321: Flags [S.], seq 2000:2000, ack 1001, win 65535, options [mss 1460,sackOK,TS val 987654321 ecr 123456789,nop,wscale 7], length 0
14:28:45.345678 IP 192.168.1.100.54321 > ${packetCaptureDomain}.443: Flags [.], ack 1, win 502, options [nop,nop,TS val 123456790 ecr 987654321], length 0
14:28:45.456789 IP 192.168.1.100.54321 > ${packetCaptureDomain}.443: Flags [P.], seq 1:517, ack 1, win 502, options [nop,nop,TS val 123456791 ecr 987654321], length 516: TLS ClientHello
14:28:45.567890 IP ${packetCaptureDomain}.443 > 192.168.1.100.54321: Flags [.], ack 517, win 501, options [nop,nop,TS val 987654322 ecr 123456791], length 0
14:28:45.678901 IP ${packetCaptureDomain}.443 > 192.168.1.100.54321: Flags [P.], seq 1:1469, ack 517, win 501, options [nop,nop,TS val 987654323 ecr 123456791], length 1468: TLS ServerHello
14:28:45.789012 IP 192.168.1.100.54321 > ${packetCaptureDomain}.443: Flags [.], ack 1469, win 501, options [nop,nop,TS val 123456792 ecr 987654323], length 0`;
    
    setPacketCaptureResult(mockPacketCaptureResult);
    setPacketCaptureLoading(false);
  };
  
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="size-5" />
            Network Analysis Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="ping" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="ping">
                <CircleDot className="size-4 mr-1.5" />
                Ping
              </TabsTrigger>
              <TabsTrigger value="traceroute">
                <Activity className="size-4 mr-1.5" />
                Traceroute
              </TabsTrigger>
              <TabsTrigger value="dns">
                <Globe className="size-4 mr-1.5" />
                DNS Lookup
              </TabsTrigger>
              <TabsTrigger value="packet">
                <FileSearch className="size-4 mr-1.5" />
                Packet Capture
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="ping" className="space-y-4 mt-4">
              <div className="flex gap-2">
                <div className="flex-grow">
                  <Input 
                    placeholder="Enter domain to ping (e.g., example.com)" 
                    value={pingDomain}
                    onChange={(e) => setPingDomain(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handlePing}
                  disabled={pingLoading || !pingDomain}
                >
                  {pingLoading ? (
                    <>
                      <Loader2 className="size-4 mr-1.5 animate-spin" />
                      Pinging...
                    </>
                  ) : (
                    <>
                      <Search className="size-4 mr-1.5" />
                      Ping
                    </>
                  )}
                </Button>
              </div>
              
              {pingResult && (
                <Textarea 
                  readOnly 
                  value={pingResult}
                  className="font-mono text-xs h-64 bg-muted"
                />
              )}
            </TabsContent>
            
            <TabsContent value="traceroute" className="space-y-4 mt-4">
              <div className="flex gap-2">
                <div className="flex-grow">
                  <Input 
                    placeholder="Enter domain for traceroute (e.g., example.com)" 
                    value={tracerouteDomain}
                    onChange={(e) => setTracerouteDomain(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleTraceroute}
                  disabled={tracerouteLoading || !tracerouteDomain}
                >
                  {tracerouteLoading ? (
                    <>
                      <Loader2 className="size-4 mr-1.5 animate-spin" />
                      Tracing...
                    </>
                  ) : (
                    <>
                      <Search className="size-4 mr-1.5" />
                      Trace
                    </>
                  )}
                </Button>
              </div>
              
              {tracerouteResult && (
                <Textarea 
                  readOnly 
                  value={tracerouteResult}
                  className="font-mono text-xs h-64 bg-muted"
                />
              )}
            </TabsContent>
            
            <TabsContent value="dns" className="space-y-4 mt-4">
              <div className="flex gap-2">
                <div className="flex-grow">
                  <Input 
                    placeholder="Enter domain for DNS lookup (e.g., example.com)" 
                    value={dnsLookupDomain}
                    onChange={(e) => setDnsLookupDomain(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleDnsLookup}
                  disabled={dnsLookupLoading || !dnsLookupDomain}
                >
                  {dnsLookupLoading ? (
                    <>
                      <Loader2 className="size-4 mr-1.5 animate-spin" />
                      Looking up...
                    </>
                  ) : (
                    <>
                      <Search className="size-4 mr-1.5" />
                      Lookup
                    </>
                  )}
                </Button>
              </div>
              
              {dnsLookupResult && (
                <Textarea 
                  readOnly 
                  value={dnsLookupResult}
                  className="font-mono text-xs h-64 bg-muted"
                />
              )}
            </TabsContent>
            
            <TabsContent value="packet" className="space-y-4 mt-4">
              <div className="flex gap-2">
                <div className="flex-grow">
                  <Input 
                    placeholder="Enter domain for packet capture (e.g., example.com)" 
                    value={packetCaptureDomain}
                    onChange={(e) => setPacketCaptureDomain(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handlePacketCapture}
                  disabled={packetCaptureLoading || !packetCaptureDomain}
                >
                  {packetCaptureLoading ? (
                    <>
                      <Loader2 className="size-4 mr-1.5 animate-spin" />
                      Capturing...
                    </>
                  ) : (
                    <>
                      <Search className="size-4 mr-1.5" />
                      Capture
                    </>
                  )}
                </Button>
              </div>
              
              {packetCaptureResult && (
                <Textarea 
                  readOnly 
                  value={packetCaptureResult}
                  className="font-mono text-xs h-64 bg-muted"
                />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
