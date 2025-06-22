
# Internet Infrastructure Explorer
<img width="1200" alt="iana 1" src="https://github.com/user-attachments/assets/c86324bd-d9b3-4459-9106-81fdfbc64fd8" />
<img width="1200" alt="iana 0" src="https://github.com/user-attachments/assets/4560d26d-db31-4622-bf67-1022787320f9" />


A comprehensive web application for analyzing and visualizing internet governance structures, website trace routes, and network data flow.

![Internet Infrastructure Explorer](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop)

## 🚀 Features

- **Website Tracer**: Visualize how websites connect through DNS, IP addressing, and hosting infrastructure
- **IANA Governance Structure**: Interactive vertical hierarchical tree visualization of internet governance
- **Terminal Output**: Text-based representation for command-line tools and proxy instancing
- **Advanced Data Analysis Tools**:
  - PCAP Analysis and packet inspection
  - Interactive Hex Editor (similar to hexed.it)
  - PGP and Cryptography Tools
  - SocialBlade metrics integration
  - Security diagnostic tools
  - Bug Bounty programs explorer
  - API inspection capabilities

## 📋 Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher (or yarn/pnpm)

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/internet-infrastructure-explorer.git
   cd internet-infrastructure-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🧩 Project Structure

```
├── App.tsx                   # Main application component
├── components/               # React components
│   ├── AdvancedAnalysis.tsx  # Data analysis tools
│   ├── FlowVisualization.tsx # Network flow visualization
│   ├── GovernanceTabs.tsx    # IANA governance structure tabs
│   ├── WebsiteTracer.tsx     # Website tracing functionality
│   ├── ui/                   # UI components (ShadCN based)
├── lib/                      # Utility functions and data
├── styles/                   # Global styles
```

## 🎮 Usage

### Website Tracing

1. Enter a website URL in the main input field
2. Click "Trace Website" to analyze the network path
3. View the results in Visual Trace, Terminal View, or Performance Analysis tabs

### Data Analysis

1. Navigate to the "Data Analysis" tab
2. Select from various analysis tools in the submenu:
   - PCAP Analysis
   - Hex Editor
   - Cryptography
   - SocialBlade
   - Security Tools
   - Bug Bounties
   - API Inspector

### Governance Structure

1. Navigate to the "Governance Structure" tab
2. Explore the IANA hierarchical tree visualization
3. Click on entities to view detailed information

## 🔧 Configuration

Custom configuration can be set in the `.env` file:

```
# API Configuration (if integrating with backend services)
API_URL=http://your-api-url
```

## 📦 Deployment

The application can be built for production using:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

The production-ready files will be in the `dist` directory.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Based on React and TailwindCSS v4
- Uses ShadCN UI components
- Icons from Lucide React
