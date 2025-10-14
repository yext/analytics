# NPM Publishing with OIDC

This repository uses GitHub Actions with OIDC (OpenID Connect) to automatically publish the `@yext/analytics` package to npm.

## Overview

The workflow defined in `.github/workflows/publish-npm.yml` automatically publishes a new version to npm whenever a version tag (e.g., `v1.2.0`) is pushed to the repository.

## Features

- **OIDC Authentication**: Uses GitHub's OIDC provider for secure authentication with npm
- **Provenance**: Automatically generates provenance attestations for supply chain security
- **Automated Testing**: Runs all tests before publishing to ensure package quality
- **Manual Trigger**: Can be manually triggered via GitHub Actions UI if needed

## Setup Instructions

### 1. Configure npm Token

To enable publishing, you need to configure an npm automation token:

1. Go to [npmjs.com](https://www.npmjs.com/) and log in with an account that has publish access to `@yext/analytics`
2. Navigate to Access Tokens: https://www.npmjs.com/settings/YOUR_USERNAME/tokens
3. Click "Generate New Token" → "Granular Access Token"
4. Configure the token:
   - **Token name**: `yext-analytics-github-actions`
   - **Expiration**: Set according to your security policy
   - **Packages and scopes**: Select the `@yext/analytics` package with "Read and write" permission
5. Copy the generated token

### 2. Add Token to GitHub Secrets

1. Go to the repository settings: https://github.com/yext/analytics/settings/secrets/actions
2. Click "New repository secret"
3. Name: `NPM_TOKEN`
4. Value: Paste the token from step 1
5. Click "Add secret"

### 3. Enable Provenance on npm

For the provenance feature to work correctly:

1. Ensure your npm account has 2FA enabled
2. The package should be configured to accept provenance attestations (this is automatic for new publishes)

## How to Publish a New Version

1. Update the version in `package.json`:
   ```bash
   npm version patch  # or minor, or major
   ```

2. Push the tag to GitHub:
   ```bash
   git push origin main --tags
   ```

3. The GitHub Action will automatically:
   - Run all tests
   - Build the package
   - Publish to npm with provenance
   - Generate supply chain attestations

4. Monitor the workflow progress at: https://github.com/yext/analytics/actions/workflows/publish-npm.yml

## Provenance Benefits

Publishing with provenance provides:

- **Transparency**: Anyone can verify where and how the package was built
- **Security**: Cryptographic proof that the package came from this repository
- **Trust**: Users can verify the package hasn't been tampered with
- **Compliance**: Meets supply chain security requirements (e.g., SLSA)

## Troubleshooting

### Publishing Fails with "403 Forbidden"

- Verify the `NPM_TOKEN` secret is configured correctly
- Ensure the token has write permissions for `@yext/analytics`
- Check that the token hasn't expired

### Provenance Generation Fails

- Ensure `id-token: write` permission is set in the workflow
- Verify the workflow is running from a GitHub-hosted runner
- Check that npm version supports provenance (npm 9.5.0+)

### Tests Fail Before Publishing

The workflow will not publish if tests fail. Review the test logs and fix any issues before attempting to publish again.

## Manual Publishing

If you need to publish manually (not recommended):

```bash
npm ci
npm run build
npm publish --provenance --access public
```

Note: Manual publishing may not include the same provenance guarantees as the automated workflow.
