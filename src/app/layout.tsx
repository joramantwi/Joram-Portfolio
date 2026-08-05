import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Joram Antwi",
  description:
    "Portfolio of Joram Antwi — a Dynamics 365 professional with a software engineering background, building solutions across Dynamics 365 CE, ERP, Power Platform and Azure. Based in London, UK.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48 64x64 128x128 256x256" },
      { url: "/ja-logo.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/ja-logo.png",
  },
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
