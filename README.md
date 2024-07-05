# :sparkles: create-babylon-app

[![Build](https://github.com/drumath2237/create-babylon-app/actions/workflows/ci.yml/badge.svg)](https://github.com/drumath2237/create-babylon-app/actions/workflows/ci.yml)
[![Release](https://github.com/drumath2237/create-babylon-app/actions/workflows/release.yml/badge.svg)](https://github.com/drumath2237/create-babylon-app/actions/workflows/release.yml)
![NPM Version](https://img.shields.io/npm/v/create-babylon-app?logo=npm&color=red)
![NPM Downloads](https://img.shields.io/npm/dm/create-babylon-app?logo=npm&color=red)
![Babylon Version](https://img.shields.io/badge/Babylon.js-v7-red)

## About

A CLI for scaffolding Babylon.js Web App :wrench:

## Environment

- Node.js v20
- pnpm v9
- Babylon.js 7.11.1~

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

- (in local) create `release/vx.x.x` branch
- (in local) `pnpm set:version`
- (Pull Req) Create PR and merge it
  - then, automatically published to npm

## Author

[@drumath2237](https://twitter.com/ninisan_drumath)
