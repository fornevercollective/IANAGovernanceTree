
/**
 * Project Download Helper
 * 
 * This script helps prepare the Internet Infrastructure Explorer project
 * for download as a ZIP file. It identifies all project files and creates
 * a manifest that can be used to package them.
 * 
 * Usage:
 * 1. Run this script: node download-project.js
 * 2. Follow the instructions printed in the console
 */

const fs = require('fs');
const path = require('path');

// Configuration
const PROJECT_ROOT = path.resolve(__dirname, '..');
const OUTPUT_FILE = path.join(PROJECT_ROOT, 'project-manifest.json');

// Files/directories to exclude from the ZIP
const EXCLUDE = [
  'node_modules',
  '.git',
  'dist',
  'build',
  '.DS_Store',
  'project-manifest.json',
  'scripts/download-project.js'
];

/**
 * Walk through directory and collect all files recursively
 */
function walkDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const relativePath = path.relative(PROJECT_ROOT, filePath);
    
    // Skip excluded files/directories
    if (EXCLUDE.some(excluded => relativePath.includes(excluded))) {
      return;
    }
    
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath, fileList);
    } else {
      fileList.push({
        path: relativePath,
        size: stat.size
      });
    }
  });
  
  return fileList;
}

/**
 * Create project manifest
 */
function createManifest() {
  console.log('Building project manifest...');
  
  try {
    const fileList = walkDir(PROJECT_ROOT);
    
    const manifest = {
      name: 'Internet Infrastructure Explorer',
      version: '1.0.0',
      generatedAt: new Date().toISOString(),
      totalFiles: fileList.length,
      totalSize: fileList.reduce((acc, file) => acc + file.size, 0),
      files: fileList
    };
    
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2));
    
    console.log(`Project manifest created successfully with ${fileList.length} files!`);
    console.log(`Total project size: ${(manifest.totalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Manifest saved to: ${OUTPUT_FILE}`);
    console.log('\nNext Steps:');
    console.log('1. Use a ZIP tool to compress all project files');
    console.log('2. Include this manifest in the ZIP for reference');
    console.log('3. Share the ZIP file for download');
  } catch (error) {
    console.error('Error creating project manifest:', error);
  }
}

// Execute the script
createManifest();
