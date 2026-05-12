import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Plus_Jakarta_Sans,
  Hind,
  Noto_Sans_Malayalam,
  Noto_Sans_Tamil,
  Noto_Sans_Bengali,
  Noto_Sans_Oriya,
} from "next/font/google";
import { ServiceWorkerRegister } from "@/components/worker/ServiceWorkerRegister";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["500", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const hind = Hind({
  subsets: ["devanagari", "latin"],
  variable: "--font-hind",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const malayalam = Noto_Sans_Malayalam({
  subsets: ["malayalam"],
  variable: "--font-malayalam",
  display: "swap",
  weight: ["400", "500", "700"],
});

const tamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  variable: "--font-tamil",
  display: "swap",
  weight: ["400", "500", "700"],
});

const bengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-bengali",
  display: "swap",
  weight: ["400", "500", "700"],
});

const odia = Noto_Sans_Oriya({
  subsets: ["oriya"],
  variable: "--font-odia",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Clean Warks Training",
  description: "Multilingual training app for Clean Warks cleaning workers",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "CW Training",
  },
};

export const viewport: Viewport = {
  themeColor: "#468dcb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${jakarta.variable} ${hind.variable} ${malayalam.variable} ${tamil.variable} ${bengali.variable} ${odia.variable}`}
    >
      <body className="font-body antialiased">
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
