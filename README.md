# IANAGovernanceTree
IANA Governance Tree
![F3633B8A-9000-489A-AEA3-ECF88935C71E](https://github.com/user-attachments/assets/a4bd9960-2f32-4584-a448-db85659bccfd)

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

# 
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
# 
