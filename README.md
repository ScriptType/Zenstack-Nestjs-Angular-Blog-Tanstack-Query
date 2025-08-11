<div align="center">
    <h1>ZenStack SaaS Demo</h1>
    <a href="https://twitter.com/intent/tweet?text=Wow%20%40zenstackhq">
        <img src="https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Fzenstackhq%2Fzenstack">
    </a>
    <a href="https://discord.gg/6HhebQynfz">
        <img src="https://img.shields.io/discord/1035538056146595961">
    </a>
</div>

# A Collaborative Todo Sample - ZenStack + Nuxt

This project is a simple Blog app to Highlight Zenstack with RPC Flavour and Tanstack-Query-Angular built with [Angular](https://angular.dev), [betterAuth](https://www.better-auth.com/), and [ZenStack](https://github.com/zenstackhq/zenstack).

## Features

- User signup/signin
- Creating Posts/Filtering

## Implementation

- Data model is located at `/schema.zmodel`.
- [TanStack Query](https://tanstack.com/query) RPC hooks are generated under `apps/angular/generatedAPI` folder.

## Running the sample

1. Install dependencies

   ```bash
   pnpm install
   ```

1. Generate server and client-side code from model

   ```bash
   pnpm run generate
   ```

1. Start dev server

   ```bash
   pnpm run dev
   ```

For more information on using ZenStack, visit [https://zenstack.dev](https://zenstack.dev).
