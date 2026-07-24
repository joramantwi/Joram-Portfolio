import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Joram Antwi · Dynamics 365 Functional Consultant",
  description:
    "Professional portfolio of Joram Antwi — Microsoft Dynamics 365 CE, Power Platform and CRM solutions consultant based in London, UK.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
