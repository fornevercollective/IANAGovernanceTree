# IANAGovernanceTree
IANA Governance Tree
-
![F3633B8A-9000-489A-AEA3-ECF88935C71E](https://github.com/user-attachments/assets/a4bd9960-2f32-4584-a448-db85659bccfd "IANA" {width=120px height=120px})
-
Who Owns IANA?

The Internet Assigned Numbers Authority (IANA) is not “owned” in a traditional sense. It is operated by the Internet Corporation for Assigned Names and Numbers (ICANN) and governed by the global internet community.

Governance Summary:
	•	IANA Functions Operator:
→ ICANN (Internet Corporation for Assigned Names and Numbers)
ICANN manages IANA and performs:
	•	Global IP address allocations (delegated to RIRs)
	•	DNS root zone management
	•	Protocol parameter assignments (in coordination with IETF)
	•	Policy Authority:
	•	Global Multistakeholder Community: Includes governments, private sector, academia, civil society
	•	IETF (Internet Engineering Task Force): Defines technical standards
	•	RIRs (e.g., ARIN, RIPE NCC): Regional implementation of IP policy
	•	U.S. Government (formerly):
	•	IANA was historically overseen by the U.S. Department of Commerce (NTIA)
	•	In October 2016, the U.S. transitioned stewardship of IANA to the global multistakeholder community via ICANN

⸻

TL;DR:
IANA is operated by ICANN, which is governed by a global multistakeholder community. It is not owned by any single entity or government.

⸻

## 
iana-governance-tree/
├── README.md
├── data/
│   ├── iana.json                 # Core governance hierarchy (IANA → RIRs → ISPs)
│   ├── rir_asn_map.csv           # ASN to RIR mapping (for IP block ownership)
│   ├── asn_ownership.csv         # ASN → Organization names
│   ├── ip_to_asn.db              # SQLite DB for fast IP-to-ASN lookup
├── tools/
│   ├── traceroute_parser.py      # Script to parse traceroute output and resolve governance
│   ├── geoip_lookup.py           # GeoIP resolution tool (optional)
│   ├── whois_resolver.py         # WHOIS resolution for IP or ASN ownership
├── visualizations/
│   ├── governance_tree_diagram.png  # Diagram of the governance tree (optional graphic)
│   ├── traceroute_flowmap.svg       # SVG visual of a traceroute path over governance levels
├── scripts/
│   ├── update_data_sources.sh    # Pull data from RIR/WHOIS APIs
│   ├── build_ip_asn_db.py        # Compile raw IP/ASN data into local DB
├── notebooks/
│   ├── analysis.ipynb            # Jupyter notebook for exploring and analyzing mappings
├── config/
│   ├── traceroute_config.yaml    # Config file for traceroute parsing and thresholds
│   ├── rirs.yaml                 # RIR metadata (region, URL, WHOIS formats)
└── LICENSE                       # Optional open source license
## 



> The IANA (Internet Assigned Numbers Authority) governance model is a system of multistakeholder cooperation and coordination. It involves various organizations like ICANN, IETF, and RIRs working together to manage and distribute internet resources. IANA's primary function is to allocate IP addresses and manage the DNS root, ensuring a stable and functional internet infrastructure. This model is characterized by open communication, public reporting, and independent reviews, fostering transparency and accountability. 
Here's a more detailed breakdown:
Key Players and Their Roles:
ICANN:
.
Oversees the IANA and manages the DNS root and generic top-level domains (gTLDs).
IANA:
.
Allocates IP addresses and manages the DNS root, working closely with ICANN and other organizations.
IETF:
.
Sets policies and standards for internet protocols, coordinating with IANA to assign and maintain these parameters.
Regional Internet Registries (RIRs):
.
Distribute IP addresses within specific regions, collaborating with IANA to ensure a global allocation system. 
Governance Principles:
Multistakeholder Governance:
A system where various groups (government, industry, civil society, technical community) participate in decision-making. 
Open Communication and Transparency:
Regular consultations, public reporting, and independent performance reviews ensure transparency and accountability. 
Coordination and Collaboration:
IAna, ICANN, IETF, and RIRs work together to maintain a stable and functional internet. 
Technical Expertise:
The IETF, for example, provides the technical expertise for protocol development and management. 
Key Areas of Management:
IP Addresses:
.
IANA allocates IP addresses to RIRs, which then distribute them to local Internet registries. 
DNS Root:
.
IANA manages the root zone of the DNS, which is the foundation of the internet's domain name system. 
Protocol Parameters:
.
IANA coordinates with the IETF to manage and allocate protocol parameters used in internet communication. 
In essence, the IANA governance map reflects a distributed and collaborative approach to managing the internet. This ensures a stable, functional, and open internet for everyone..
> 
