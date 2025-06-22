
# Deployment Guide

This document provides instructions for deploying the Internet Infrastructure Explorer application to various platforms.

## Table of Contents

- [Local Development](#local-development)
- [Static Hosting](#static-hosting)
  - [Vercel](#vercel)
  - [Netlify](#netlify)
  - [GitHub Pages](#github-pages)
- [Docker Deployment](#docker-deployment)
- [CI/CD Integration](#cicd-integration)

## Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/internet-infrastructure-explorer.git
   cd internet-infrastructure-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the application.

## Static Hosting

### Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy the application:
   ```bash
   vercel
   ```

4. For production deployment:
   ```bash
   vercel --prod
   ```

### Netlify

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Deploy the application:
   ```bash
   netlify deploy
   ```

4. For production deployment:
   ```bash
   netlify deploy --prod
   ```

### GitHub Pages

1. Update the `package.json` file with your GitHub repository name:
   ```json
   "homepage": "https://yourusername.github.io/internet-infrastructure-explorer"
   ```

2. Add the following scripts to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Install GitHub Pages package:
   ```bash
   npm install --save-dev gh-pages
   ```

4. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

## Docker Deployment

1. Create a `Dockerfile` in the root directory:
   ```dockerfile
   FROM node:18-alpine as build
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . ./
   RUN npm run build

   FROM nginx:alpine
   COPY --from=build /app/dist /usr/share/nginx/html
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. Build the Docker image:
   ```bash
   docker build -t internet-infrastructure-explorer .
   ```

3. Run the Docker container:
   ```bash
   docker run -p 8080:80 internet-infrastructure-explorer
   ```

4. Access the application at [http://localhost:8080](http://localhost:8080).

## CI/CD Integration

### GitHub Actions

Create a `.github/workflows/deploy.yml` file:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install Dependencies
        run: npm install
        
      - name: Build
        run: npm run build
        
      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@4.1.5
        with:
          branch: gh-pages
          folder: dist
```

This will automatically deploy your application to GitHub Pages when you push changes to the main branch.
