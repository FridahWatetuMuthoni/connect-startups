## Getting Started

Create a new project

```bash
npx create-next-app connect-startups
```

Run the development server:

```bash
npm run dev
```

## Authentication

Installing NextAuth

```bash
npm install next-auth
```

## How to generate a secret key

Go online and get an openssl terminal and type this to generate a key

```bash
openssl rand -base64 32
```

Or use auth secret to generate one

```bash
npx auth secret
```

## Form Server Actions

```tsx
<form
  action={async () => {
    "use server";
    const response = await signIn("google");
    console.log(`response:${response}`);
  }}
></form>
```

## Installing Prisma

Installing Prisma

```bash
npm install @prisma/client @auth/prisma-adapter prisma
```

```bash
npm prisma init
```

## Sanity Configuration

1. Copy the Create a new Studio with Sanity CLI code

Example Code

```bash
npm create sanity@latest -- --project aksa00rm --dataset production --template clean --typescript --output-path studio-startup-hub
cd studio-startup-hub
```

2. Install Sanity

install sanity

```bash
npm install next-sanity@canary
```

install sanity markdown plugin

```bash
npm install sanity-plugin-markdown
```

install a markdown parser

```bash
npm install markdown-it
npm install --save-dev @types/markdown-it
```

## Extract Types from sanity

### extract types from sanity

```bash
npx sanity@latest schema extract --path=./sanity/extract.json
```

### Create a json file named 'sanity-typegen.json'

```json
{
  "path": "./src/**/*.{ts,tsx,js,jsx}",
  "schema": "./sanity/extract.json",
  "generates": "./sanity.types.ts"
}
```

### create types

```bash
npx sanity@latest typegen generate
```

## Next.js caching functionality

1. You fetch data and set {next:{revalidate:60}}
2. It first looks at the cache to check if their is existing data
3. If there is no data at the cache, it fetches data dirctly from the database/source
4. After fetching data from the source, it sets the data to the cache
5. If less than 60 seconds has passed, and the same data is requested, it will return the data from the cache

## Implementing Live Content API

Live content API is a feature that allows you to fetch data from Sanity in real-time. Immediately a post is created it shows on the dashboard.

installing it

```bash
npm install server-only
```

create a new file in sanity/lib called live.ts
4:02:48
