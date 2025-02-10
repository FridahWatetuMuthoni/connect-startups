import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Google,
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     username: {
    //       label: "Username",
    //       type: "text",
    //       placeholder: "username",
    //     },
    //     password: {
    //       label: "Password",
    //       type: "password",
    //       placeholder: "password",
    //     },
    //   },
    //   async authorize(
    //     credentials: Record<"username" | "password", string> | undefined
    //   ) {
    //     //This is where you need to retrieve user data from a database
    //     // to verify with credentials
    //     if (!credentials) {
    //       return null;
    //     }
    //     const user = { id: 1, username: "fridah", password: "123456" };

    //     if (
    //       credentials?.username === user.username &&
    //       credentials?.password === user.password
    //     ) {
    //       return user;
    //     }
    //     return null;
    //   },
    // }),
  ],
});

export async function loginWithProvider(provider: string) {
  return signIn(provider);
}
