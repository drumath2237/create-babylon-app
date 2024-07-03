# create-babylon-app

[![Build](https://github.com/drumath2237/create-babylon/actions/workflows/node.js.yml/badge.svg)](https://github.com/drumath2237/create-babylon/actions/workflows/node.js.yml)

## About

A CLI for scaffolding Babylon.js Web App.

## Environment

- Node.js v18
- pnpm v8
- Babylon.js 6.7.0

## Usage

You can use create-babylon-app by typing following command on the shell.

```
npm create babylon-app
```

## Templates

This provides following templates.

- Vite
  - TypeScript
  - JavaScript
- ~~Webpack (node ready)~~

## For Development

### Release Flow

- (in local) create `release/x.x.x` branch
- (in local) `pnpm set:version`
- (Pull Req) Create PR and merge it
  - then, publish to npm

## Author

[@drumath2237](https://twitter.com/ninisan_drumath)
