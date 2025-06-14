import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SmartPR - AI-Powered Code Reviews",
  description: "Get instant, intelligent code reviews powered by AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
