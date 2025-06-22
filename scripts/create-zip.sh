
#!/bin/bash

# Internet Infrastructure Explorer - ZIP Creation Script
# This script creates a ZIP archive of the project, excluding unnecessary files

# Output file name
ZIP_NAME="internet-infrastructure-explorer.zip"

# Ensure we're in the project root directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT" || { echo "Failed to navigate to project root"; exit 1; }

echo "Creating ZIP archive of Internet Infrastructure Explorer..."
echo "Working directory: $(pwd)"

# Check if zip command is available
if ! command -v zip &> /dev/null; then
    echo "Error: 'zip' command not found."
    echo "Please install zip using your package manager:"
    echo "  - On Ubuntu/Debian: sudo apt install zip"
    echo "  - On macOS: brew install zip"
    echo "  - On Windows: Install from http://gnuwin32.sourceforge.net/packages/zip.htm"
    exit 1
fi

# Create temporary directory listing
echo "Creating file list..."
TEMP_FILE_LIST=$(mktemp)

# List all files, excluding unnecessary ones
find . -type f \
    ! -path "./node_modules/*" \
    ! -path "./.git/*" \
    ! -path "./dist/*" \
    ! -path "./build/*" \
    ! -path "./.DS_Store" \
    ! -path "./.vscode/*" \
    ! -path "./.idea/*" \
    ! -name "*.log" \
    ! -name "npm-debug.log*" \
    ! -name "yarn-debug.log*" \
    ! -name "yarn-error.log*" \
    ! -name ".env*" \
    ! -name "$ZIP_NAME" \
    > "$TEMP_FILE_LIST"

# Count files
FILE_COUNT=$(wc -l < "$TEMP_FILE_LIST")
echo "Found $FILE_COUNT files to include in the ZIP archive."

# Create the ZIP file
echo "Creating ZIP archive..."
zip -r "$ZIP_NAME" . \
    -i@"$TEMP_FILE_LIST" \
    -x "node_modules/*" ".git/*" "dist/*" "build/*" ".DS_Store" ".vscode/*" ".idea/*" "*.log" "npm-debug.log*" "yarn-debug.log*" "yarn-error.log*" ".env*" "$ZIP_NAME"

# Clean up temporary file
rm "$TEMP_FILE_LIST"

# Check if ZIP creation was successful
if [ $? -eq 0 ]; then
    ZIP_SIZE=$(du -h "$ZIP_NAME" | cut -f1)
    echo "Success! Created $ZIP_NAME ($ZIP_SIZE)"
    echo "Location: $(pwd)/$ZIP_NAME"
    
    echo -e "\nNext steps:"
    echo "1. Upload this ZIP file to your preferred hosting service"
    echo "2. Share the download link with users"
    echo "3. Users can follow the instructions in GITHUB_IMPLEMENTATION.md to set up the project"
else
    echo "Error: Failed to create ZIP archive."
    exit 1
fi
