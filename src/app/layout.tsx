import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "mock_drone_forum",
  description: "A mock drone forum.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <Link href="/">drone_forum</Link>
        </header>
        <main>{children}</main>
        <footer></footer>
      </body>
    </html>
  );
}
