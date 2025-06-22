
import React from 'react';
import { Copy } from 'lucide-react';
import { Button } from './ui/button';
import { FlowNode } from './FlowVisualization';

interface TerminalOutputProps {
  nodes: FlowNode[];
  totalTime?: number;
}

export function TerminalOutput({ nodes, totalTime = 0 }: TerminalOutputProps) {
  const [isCopied, setIsCopied] = React.useState(false);
  
  // Generate the complete terminal output text
  const generateTerminalOutput = () => {
    const lines: string[] = [];
    lines.push('=== WEBSITE TRACE RESULTS ===');
    lines.push(`Total response time: ${totalTime}ms`);
    lines.push('');
    lines.push('--- TRACE PATH ---');
    
    // Format the nodes recursively
    const formatNodes = (nodeList: FlowNode[], indent: string = '') => {
      nodeList.forEach((node, index) => {
        const isLast = index === nodeList.length - 1;
        const prefix = isLast ? '└── ' : '├── ';
        const childIndent = isLast ? '    ' : '│   ';
        
        // Format node data
        const latencyInfo = node.latency !== undefined ? ` [${node.latency}ms]` : '';
        const ipInfo = node.ipAddress ? ` (${node.ipAddress})` : '';
        const orgInfo = node.organization ? ` - ${node.organization}` : '';
        const govInfo = node.governanceEntityId ? ' [IANA GOV ENTITY]' : '';
        
        lines.push(`${indent}${prefix}${node.name}${latencyInfo}${ipInfo}${orgInfo}${govInfo}`);
        
        // Process children
        if (node.children && node.children.length > 0) {
          formatNodes(node.children, indent + childIndent);
        }
      });
    };
    
    // Start with the top level nodes
    formatNodes(nodes);
    
    // Add governance connections section if any exist
    const governanceConnections = findGovernanceConnections(nodes);
    if (governanceConnections.length > 0) {
      lines.push('');
      lines.push('--- GOVERNANCE CONNECTIONS ---');
      governanceConnections.forEach(conn => {
        lines.push(`* ${conn.nodeName} → IANA Governance Entity: ${conn.govId}`);
      });
    }
    
    // Add system info
    lines.push('');
    lines.push('--- SYSTEM INFO ---');
    lines.push(`Trace completed: ${new Date().toISOString()}`);
    lines.push('Protocol: HTTP/HTTPS');
    lines.push('Trace method: DNS lookup, HTTP request, ICMP ping');
    
    return lines.join('\n');
  };
  
  // Find all governance connections in the tree
  const findGovernanceConnections = (nodeList: FlowNode[]): { nodeName: string, govId: string }[] => {
    const connections: { nodeName: string, govId: string }[] = [];
    
    const traverse = (nodes: FlowNode[]) => {
      nodes.forEach(node => {
        if (node.governanceEntityId) {
          connections.push({
            nodeName: node.name,
            govId: node.governanceEntityId
          });
        }
        
        if (node.children) {
          traverse(node.children);
        }
      });
    };
    
    traverse(nodeList);
    return connections;
  };
  
  // Copy terminal output to clipboard
  const copyToClipboard = () => {
    const output = generateTerminalOutput();
    navigator.clipboard.writeText(output)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(err => console.error('Failed to copy text: ', err));
  };
  
  const terminalOutput = generateTerminalOutput();
  
  return (
    <div className="terminal-output-container">
      <div className="flex items-center justify-between mb-4">
        <h4>Terminal Output</h4>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={copyToClipboard}
          className="flex items-center gap-1"
        >
          <Copy className="size-4" />
          {isCopied ? 'Copied!' : 'Copy Text'}
        </Button>
      </div>
      
      <div className="bg-[rgba(106,0,255,0.08)] dark:bg-zinc-900 text-[rgba(236,26,184,1)] font-mono p-4 rounded-md overflow-x-auto whitespace-pre text-sm">
        {terminalOutput}
      </div>
      
      <div className="mt-4 text-sm text-muted-foreground">
        This terminal-style output can be used with proxy instancing tools and command-line utilities 
        to automate trace analysis and monitoring.
      </div>
    </div>
  );
}
