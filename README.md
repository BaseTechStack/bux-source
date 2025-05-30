# APPNAME

This project was created using [BaseUX (bux)](https://github.com/BaseTechStack/bux), a modern command-line tool for scaffolding Bux applications with pre-configured best practices and UI components.

## Overview

APPNAME is built on Nuxt 3 with the following features:

- **Nuxt 3**: The latest version of Nuxt.js with the best performance and features
- **Nuxt UI v3**: Modern UI components library with a clean, minimalist design
- **TypeScript**: Full TypeScript support throughout the codebase
- **Pinia**: State management solution with a clean, modular approach
- **Entity Generation**: Built-in tooling to quickly create data models and CRUD interfaces
- **Theme Support**: Light/dark mode with customizable color schemes

## Setup

bux new APPNAME

bux run dev

bux run build

bux run preview


## GitHub Actions Workflow

This project includes a pre-configured GitHub Actions workflow template that can be used for CI/CD. The template is stored in the `github/workflows` directory (without the leading dot) to prevent it from being activated immediately upon project creation.

### Activating GitHub Actions

To enable GitHub Actions for your project:

1. Rename the `github` directory to `.github`:

```bash
mv github .github
```

2. Configure the necessary secrets in your GitHub repository settings:
   - `CAPROVER_SERVER`: Your CapRover server URL
   - `CAPROVER_APP`: The name of your CapRover application
   - `CAPROVER_APP_TOKEN`: Your CapRover application token

3. Push your changes to GitHub

The workflow will automatically build and deploy your Nuxt application to CapRover when changes are pushed to the main branch.

## Production

Build the application for production:

```bash
bux run build
```

Locally preview production build:

```bash
bux run generate
```

Deploy to CapRover:

```bash
caprover deploy
```

Locally preview production build:

```bash
bux run preview
```

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
