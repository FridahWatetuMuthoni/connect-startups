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

```

```
