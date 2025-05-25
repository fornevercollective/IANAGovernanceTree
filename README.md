# IANAGovernanceTree
IANA Governance Tree
iana-governance-tree/
├── README.md
├── data/
│   ├── iana.json                   # Core governance hierarchy (IANA → RIRs → ISPs)
│   ├── rir_asn_map.csv             # ASN to RIR mapping (for IP block ownership)
│   ├── asn_ownership.csv           # ASN → Organization names
│   ├── ip_to_asn.db                # SQLite DB for fast IP-to-ASN lookup
├── tools/
│   ├── traceroute_parser.py        # Script to parse traceroute output and resolve governance
│   ├── geoip_lookup.py             # GeoIP resolution tool (optional)
│   ├── whois_resolver.py           # WHOIS resolution for IP or ASN ownership
├── visualizations/
│   ├── governance_tree_diagram.png # Diagram of the governance tree (optional graphic)
│   ├── traceroute_flowmap.svg      # SVG visual of a traceroute path over governance levels
├── scripts/
│   ├── update_data_sources.sh      # Pull data from RIR/WHOIS APIs
│   ├── build_ip_asn_db.py          # Compile raw IP/ASN data into local DB
├── notebooks/
│   ├── analysis.ipynb              # Jupyter notebook for exploring and analyzing mappings
├── config/
│   ├── traceroute_config.yaml      # Config file for traceroute parsing and thresholds
│   ├── rirs.yaml                   # RIR metadata (region, URL, WHOIS formats)
└── LICENSE                         # Optional open source license
