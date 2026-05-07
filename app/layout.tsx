import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils"; // Siguraduhing tama ang import path na 'to
import Navbar from "@/components/shared/Navbar";
import StarsCanvas from "@/components/canvas/Stars";
import CustomCursor from "@/components/shared/CustomCursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kevin Macandog | Full Stack Developer Portfolio",
  description: "Full Stack Software Developer specializing in React.js, Vue.js, Node.js, PHP and Laravel. Building efficient, scalable, and user-friendly applications with clean, maintainable code.",
  keywords: [
    "Full Stack Developer", "Software Engineer", "Software Developer", 
    "Kevin Portfolio", "Kvein Macandog", "Web Developer", 
    "React Developer", "Node.js Developer", "Next.js Developer", 
    "Kevin Godnacam", "Macandog Portfolio", "Macandog Software Developer"
  ],
  alternates: {
    canonical: "https://kevinmacandog.com", // Palitan mo ng actual domain mo
  },
  openGraph: {
    title: "Kevin Macandog | Full Stack Developer Portfolio",
    description: "Explore the interactive portfolio of Kevin Macandog, a Software Developer focused on modern web technologies.",
    icons: {
      icon: [
        {
          url: '/img/logo.png',
          href: '/img/logo.png',
        },
      ],
      apple: [
        {
          url: '/img/logo.png',
          sizes: '180x180',
          type: 'image/png',
        },
      ],
    },
    url: "https://kevinmacandog.com",
    siteName: "Kevin Macandog Portfolio",
    images: [
      {
        url: "/img/me.jpg", // Siguraduhin na .png o .jpg ang tama
        width: 1200,
        height: 630,
        alt: "Kevin Macandog Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Dagdagan ng suppressHydrationWarning dito:
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={cn(
        inter.className, 
        "bg-background text-slate-200 antialiased overflow-x-hidden"
      )} suppressHydrationWarning>
        <CustomCursor />
        <Navbar />
        <StarsCanvas />
        {children}
      </body>
    </html>
  );
}