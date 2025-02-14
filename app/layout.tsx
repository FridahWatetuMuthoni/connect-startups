import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "easymde/dist/easymde.min.css";
import Navbar from "./components/Navbar";
import { SessionProvider } from "next-auth/react";
import { auth } from "../auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "World Startups",
  description:
    "It is a place where different people all over the world showcase their startups",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth(); // Fetch session on the server

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider session={session}>
          {" "}
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
