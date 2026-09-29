import "./globals.css";
import React from "react";

export const metadata = {
  title: "ROOMZERO - Private Edge AI Sensor",
  description: "Private AI that understands events, not identities.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-zinc-100 min-h-screen antialiased selection:bg-cyan-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
