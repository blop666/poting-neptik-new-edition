import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
// @ts-ignore
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "Nevtik",
  description: "Nevtik",
  icons: {
    icon: "/Nevtik.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.className} antialiased min-h-screen bg-[radial-gradient(#ED1C2415_3px,transparent_1px)] bg-size-[30px_30px]`}>
        {children}
      </body>
    </html>
  );
}
