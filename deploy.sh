#!/bin/bash
npm run build
realm-cli login --api-key="$ATLAS_PUBLIC_API_KEY" --private-api-key="$ATLAS_PRIVATE_API_KEY"
cp -vaR build/ app/hosting/files
cd app
realm-cli push -y --project="$ATLAS_PROJECT_ID" --remote="$REALM_CLIENT_APP_ID" --include-hosting 
