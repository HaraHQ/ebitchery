import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "eBitchery",
  description: "Join use to become Bitchkultur",
  icons: [{ rel: "image/png", url: "/favicon.png" }],
  openGraph: {
    images: [
      {
        url: '/face_right.png',
        width: 350,
        height: 200,
        alt: 'eBitchery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/face_right.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
