import type { Metadata } from "next";
import { Outfit, Arya } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const arya = Arya({
  subsets: ["devanagari", "latin"],
  weight: ["400", "700"],
  variable: "--font-arya",
});

export const metadata: Metadata = {
  title: "Coder Wala Music | Coding ke Liye Best Lofi & Focus Music",
  description: "Coders aur developers ke liye best background music player — lofi, focus beats aur coding vibes, bina ruke continuous play. Made with love by Vikesh.",
  keywords: "coder music, coding music player, lofi for coders, dev music, programmer music india, coding beats",
  openGraph: {
    title: "Coder Wala Music",
    description: "Coding karte waqt sunne wala best music player",
    url: "https://coder-wala-music.vercel.app",
    siteName: "Coder Wala Music",
    images: ["/og-image.png"],
    locale: "hi_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coder Wala Music",
    description: "Coding ke liye best background music",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${arya.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full bg-black font-sans text-white">
        {children}
      </body>
    </html>
  );
}
