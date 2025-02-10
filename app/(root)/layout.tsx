import React from "react";
import Navbar from "../components/Navbar";
import { SessionProvider } from "next-auth/react";

function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-work-sans">
      <SessionProvider>
        <Navbar />
        {children}
      </SessionProvider>
    </main>
  );
}

export default layout;
