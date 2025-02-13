import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { client } from "./sanity/lib/client";
import {
  AUTHOR_BY_GITHUB_ID_QUERY,
  AUTHOR_BY_GOOGLE_ID_QUERY,
} from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Google,
    Credentials({
      name: "Email and Password",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          required: true,
        },
        password: {
          label: "Password",
          type: "password",
          required: true,
        },
      },
      async authorize({
        email,
        password,
      }: {
        email: string;
        password: string;
      }) {
        const user = await client.fetch(
          `*[_type=='author' && email==$email][0]`,
          {
            email: email,
          }
        );

        console.log(user);

        if (!user) {
          throw new Error("User not found");
        }
        const isValid = password === user.password;
        if (!isValid) {
          throw new Error("Invalid Credentials");
        }

        console.log(isValid);

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          bio: user.bio,
          image: user.image,
          authorId: user._id, // Include the authorId in user session
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "credentials") {
        console.log("Logging in with credentials...");
        return true; // Allow sign-in with email/password
      }

      const { name, email, image } = user;
      const { login, bio, id, sub } = profile || {};

      const isGithub = account?.provider === "github";
      const providerKey = isGithub ? "githubId" : "googleId";
      const providerId = isGithub ? id : sub;

      const query =
        account?.provider === "github"
          ? AUTHOR_BY_GITHUB_ID_QUERY
          : AUTHOR_BY_GOOGLE_ID_QUERY;

      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(query, {
          [providerKey]: String(providerId),
        });

      console.log(`Existing user ${existingUser}`);

      if (!existingUser) {
        const idField =
          account?.provider === "github" ? "githubId" : "googleId";
        const value =
          account?.provider == "github" ? profile?.id : profile?.sub;
        await writeClient.create({
          _type: "author",
          [idField]: String(value),
          name: name,
          username: account?.provider === "github" ? login : email,
          email: email,
          image: image,
          bio: bio || "",
        });
      }
      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const { id, sub } = profile;
        const isGithub = account?.provider === "github";
        const providerKey = isGithub ? "githubId" : "googleId";
        const providerId = isGithub ? id : sub;

        const query =
          account?.provider === "github"
            ? AUTHOR_BY_GITHUB_ID_QUERY
            : AUTHOR_BY_GOOGLE_ID_QUERY;

        const user = await client.withConfig({ useCdn: false }).fetch(query, {
          [providerKey]: String(providerId),
        });

        if (user) {
          token.id = user._id;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token.id) {
        Object.assign(session, { authorId: token.id });
      }
      return session;
    },
  },
});

export async function loginWithProvider(provider: string) {
  return signIn(provider);
}
