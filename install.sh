#!/usr/bin/env bash

# Check system compatibility
UNSUPPORTED_ARCH=$(uname -m)
if [[ ! "$UNSUPPORTED_ARCH" =~ ^(x86_64|arm64)$ ]]; then
  echo "Error: This script is only supported on x86_64 or arm64 architectures."
  exit 1
fi


# Install Golang (if not already installed)
if [ ! -d "/usr/local/go" ]; then
  GO_VERSION=1.22.3  # Update with desired version if needed
  GO_URL="https://dl.google.com/go/$(GO_VERSION).linux-$UNSUPPORTED_ARCH.tar.gz"
  curl -L "$GO_URL" -o go.tar.gz && tar -C /usr/local -xzf go.tar.gz
  rm go.tar.gz  # Clean up downloaded archive
  export PATH=$PATH:/usr/local/go/bin
  echo "Golang $GO_VERSION installed"
fi


if ! command -v nvm &> /dev/null; then
  echo "Installing nvm..."
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  source ~/.bashrc
  echo "Installing Node.js version 22..."
  nvm install 22
fi


# Install project dependencies
npm ci  # Recommended for production-ready installations

# Build project using webpack
npm run build

# Create directory for bundled script with appropriate permissions
sudo mkdir -p /usr/local/bin/toolkit

# Copy bin.sh and toolkit.js (or adjust paths based on your project structure)
sudo cp ./bin.sh ./dist/toolkit.js /usr/local/bin/toolkit/

# Make bin.sh executable
sudo chmod +x /usr/local/bin/toolkit/bin.sh

# Update PATH environment variable (safer approach)
echo 'export PATH=$PATH:/usr/local/bin/toolkit' >> ~/.bashrc  # Append to shell configuration file
source ~/.bashrc  # Reload shell configuration to apply changes

echo "Project setup complete! Run 'toolkit' to execute the bundled script."
