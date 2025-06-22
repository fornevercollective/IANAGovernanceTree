
import { TreeNodeProps } from "../components/TreeNode";

// Enhanced mock representation of IANA governance structure with CDNs
export const mockGovernanceData: Omit<TreeNodeProps, 'level' | 'onNodeSelect'>[] = [
  {
    id: "1",
    name: "ICANN",
    description: "Internet Corporation for Assigned Names and Numbers - Oversees global internet domain name system",
    children: [
      {
        id: "1.1",
        name: "IANA Functions Operator",
        description: "Operates core internet functions including protocol parameters, domain names, and IP addresses",
        children: [
          {
            id: "1.1.1",
            name: "Protocol Parameters Registry",
            description: "Maintains protocol parameter registries in conjunction with standards-development organizations",
          },
          {
            id: "1.1.2",
            name: "Root Zone Management",
            description: "Manages the root zone of the Domain Name System",
            children: [
              {
                id: "1.1.2.1",
                name: "DNS Root Servers",
                description: "Authoritative servers for the DNS root zone",
                children: [
                  {
                    id: "1.1.2.1.1",
                    name: "TLD Infrastructure",
                    description: "Top-Level Domain infrastructure connecting to CDNs and service providers",
                    children: [
                      {
                        id: "1.1.2.1.1.1",
                        name: "CDN Infrastructure",
                        description: "Content Delivery Networks serving as intermediate caching layers",
                        children: [
                          {
                            id: "cdn-1",
                            name: "Cloudflare",
                            description: "Operates one of the world's largest networks with 275+ cities in 100+ countries",
                            type: "cdn"
                          },
                          {
                            id: "cdn-2",
                            name: "Akamai",
                            description: "Pioneer CDN provider with 300,000+ servers in 130+ countries",
                            type: "cdn"
                          },
                          {
                            id: "cdn-3",
                            name: "Fastly",
                            description: "Edge cloud platform providing CDN, security and edge computing services",
                            type: "cdn"
                          },
                          {
                            id: "cdn-4",
                            name: "AWS CloudFront",
                            description: "Amazon Web Services' global content delivery network",
                            type: "cdn"
                          },
                          {
                            id: "cdn-5",
                            name: "Google Cloud CDN",
                            description: "Google's content delivery network leveraging Google's global edge network",
                            type: "cdn"
                          },
                          {
                            id: "cdn-6",
                            name: "Microsoft Azure CDN",
                            description: "Microsoft's global content delivery network integrated with Azure services",
                            type: "cdn"
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "1.1.3",
            name: "Internet Number Resources",
            description: "Coordinates the global pool of IP addresses and AS numbers",
          }
        ]
      },
      {
        id: "1.2",
        name: "ICANN Board",
        description: "Responsible for overall policy direction for ICANN",
        children: [
          {
            id: "1.2.1",
            name: "Governance Committee",
            description: "Oversees governance framework",
          },
          {
            id: "1.2.2",
            name: "Audit Committee",
            description: "Monitors financial accounting and reporting",
          }
        ]
      }
    ]
  },
  {
    id: "2",
    name: "IAB",
    description: "Internet Architecture Board - Provides oversight of Internet technical standards process",
    children: [
      {
        id: "2.1",
        name: "IETF",
        description: "Internet Engineering Task Force - Develops and promotes Internet standards",
        children: [
          {
            id: "2.1.1",
            name: "IESG",
            description: "Internet Engineering Steering Group - Manages technical specification process",
          },
          {
            id: "2.1.2",
            name: "Working Groups",
            description: "Topic-specific groups focusing on protocol development",
            children: [
              {
                id: "2.1.2.1",
                name: "HTTPBis Working Group",
                description: "Group responsible for HTTP protocol specifications",
                children: [
                  {
                    id: "2.1.2.1.1",
                    name: "HTTP/2 Standard",
                    description: "Protocol standard that influences CDN implementation and efficiency",
                  },
                  {
                    id: "2.1.2.1.2",
                    name: "HTTP/3 Standard",
                    description: "Latest HTTP version using QUIC transport protocol, adopted by major CDNs",
                    children: [
                      {
                        id: "cdn-http3-1",
                        name: "Cloudflare HTTP/3 Implementation",
                        description: "Early adopter of HTTP/3 across global network",
                        type: "cdn"
                      },
                      {
                        id: "cdn-http3-2",
                        name: "Fastly HTTP/3 Implementation",
                        description: "HTTP/3 implementation in Fastly's edge network",
                        type: "cdn"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "2.2",
        name: "IRTF",
        description: "Internet Research Task Force - Focuses on long-term research related to Internet protocols",
        children: [
          {
            id: "2.2.1",
            name: "Research Groups",
            description: "Groups conducting research on Internet-related topics",
            children: [
              {
                id: "2.2.1.1",
                name: "DINRG",
                description: "Decentralized Internet Infrastructure Research Group",
                children: [
                  {
                    id: "2.2.1.1.1",
                    name: "CDN Decentralization Research",
                    description: "Research on decentralizing content delivery infrastructure",
                    children: [
                      {
                        id: "cdn-research-1",
                        name: "Cloudflare Distributed Web Gateway",
                        description: "IPFS and distributed web gateway services",
                        type: "cdn"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "3",
    name: "RIRs",
    description: "Regional Internet Registries - Manage IP address allocation for specific regions",
    children: [
      {
        id: "3.1",
        name: "AFRINIC",
        description: "African Network Information Centre - Serves Africa region",
      },
      {
        id: "3.2",
        name: "APNIC",
        description: "Asia Pacific Network Information Centre - Serves Asia-Pacific region",
        children: [
          {
            id: "3.2.1",
            name: "APNIC IP Allocations",
            description: "IP address blocks allocated to Asia-Pacific entities",
            children: [
              {
                id: "cdn-ap-1",
                name: "Cloudflare APAC Infrastructure",
                description: "IP allocations for Cloudflare's Asia-Pacific edge nodes",
                type: "cdn"
              },
              {
                id: "cdn-ap-2",
                name: "Akamai APAC Infrastructure",
                description: "IP allocations for Akamai's Asia-Pacific servers",
                type: "cdn"
              }
            ]
          }
        ]
      },
      {
        id: "3.3",
        name: "ARIN",
        description: "American Registry for Internet Numbers - Serves North America",
        children: [
          {
            id: "3.3.1",
            name: "ARIN IP Allocations",
            description: "IP address blocks allocated to North American entities",
            children: [
              {
                id: "cdn-na-1",
                name: "Cloudflare North American Infrastructure",
                description: "IP allocations for Cloudflare's North American edge nodes",
                type: "cdn"
              },
              {
                id: "cdn-na-2",
                name: "Akamai North American Infrastructure",
                description: "IP allocations for Akamai's North American servers",
                type: "cdn"
              },
              {
                id: "cdn-na-3",
                name: "Fastly North American Infrastructure",
                description: "IP allocations for Fastly's North American points of presence",
                type: "cdn"
              },
              {
                id: "cdn-na-4",
                name: "Amazon CloudFront North American Infrastructure",
                description: "IP allocations for AWS CloudFront's North American edge locations",
                type: "cdn"
              }
            ]
          }
        ]
      },
      {
        id: "3.4",
        name: "LACNIC",
        description: "Latin American and Caribbean Network Information Centre - Serves Latin America and Caribbean",
      },
      {
        id: "3.5",
        name: "RIPE NCC",
        description: "Réseaux IP Européens Network Coordination Centre - Serves Europe, Middle East, and parts of Central Asia",
        children: [
          {
            id: "3.5.1",
            name: "RIPE IP Allocations",
            description: "IP address blocks allocated to European and Middle Eastern entities",
            children: [
              {
                id: "cdn-eu-1",
                name: "Cloudflare European Infrastructure",
                description: "IP allocations for Cloudflare's European edge nodes",
                type: "cdn"
              },
              {
                id: "cdn-eu-2",
                name: "Akamai European Infrastructure",
                description: "IP allocations for Akamai's European servers",
                type: "cdn"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "4",
    name: "PTI",
    description: "Public Technical Identifiers - Affiliate of ICANN responsible for IANA functions",
  },
  {
    id: "5",
    name: "Major CDN Organizations",
    description: "Parent companies of global Content Delivery Networks",
    children: [
      {
        id: "5.1",
        name: "Cloudflare, Inc.",
        description: "Parent company of Cloudflare CDN founded in 2009",
        children: [
          {
            id: "5.1.1",
            name: "Cloudflare Global Network",
            description: "Operates CDN, security services, and edge computing platform",
            type: "cdn"
          }
        ]
      },
      {
        id: "5.2",
        name: "Akamai Technologies",
        description: "Pioneer CDN provider founded in 1998",
        children: [
          {
            id: "5.2.1",
            name: "Akamai Intelligent Edge Platform",
            description: "Global distributed platform for content delivery and cloud security",
            type: "cdn"
          }
        ]
      },
      {
        id: "5.3",
        name: "Fastly, Inc.",
        description: "Edge computing and CDN provider founded in 2011",
        children: [
          {
            id: "5.3.1",
            name: "Fastly Edge Cloud",
            description: "Programmable edge cloud platform with CDN capabilities",
            type: "cdn"
          }
        ]
      },
      {
        id: "5.4",
        name: "Amazon Web Services",
        description: "Cloud computing division of Amazon",
        children: [
          {
            id: "5.4.1",
            name: "Amazon CloudFront",
            description: "AWS's content delivery network service",
            type: "cdn"
          }
        ]
      },
      {
        id: "5.5",
        name: "Google LLC",
        description: "Multinational technology company",
        children: [
          {
            id: "5.5.1",
            name: "Google Cloud CDN",
            description: "Content delivery service using Google's global edge network",
            type: "cdn"
          }
        ]
      },
      {
        id: "5.6",
        name: "Microsoft Corporation",
        description: "Multinational technology company",
        children: [
          {
            id: "5.6.1",
            name: "Azure CDN",
            description: "Microsoft's global content delivery network service",
            type: "cdn"
          }
        ]
      }
    ]
  }
];
