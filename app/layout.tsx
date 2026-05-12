import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils"; // Siguraduhing tama ang import path na 'to
import Navbar from "@/components/shared/Navbar";
// import StarsCanvas from "@/components/canvas/Stars";
import CustomCursor from "@/components/shared/CustomCursor";
import ScrollToTop from "@/components/shared/ScrollToTop";
import { Toaster } from "react-hot-toast";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Kevin Macandog | Full Stack Developer",
  description: "Full Stack Software Developer specializing in React.js, Vue.js, Node.js, PHP and Laravel. Building efficient, scalable, and user-friendly applications with clean, maintainable code.",
  keywords: [
    "Full Stack Developer", "Software Engineer", "Software Developer", 
    "Kevin Portfolio", "Kvein Macandog", "Web Developer", 
    "React Developer", "Node.js Developer", "Next.js Developer", 
    "Kevin Godnacam", "Macandog Portfolio", "Macandog Software Developer"
  ],
  alternates: {
    canonical: "https://kevin-macandog.vercel.app", // Palitan mo ng actual domain mo
  },
  openGraph: {
    title: "Kevin Macandog | Portfolio",
    description: "Full Stack Software Developer specializing in React.js, Node.js, and Laravel. Explore my portfolio to see how I build efficient, scalable, and user-friendly web applications with clean code.",
    url: "https://kevin-macandog.vercel.app",
    siteName: "Kevin Macandog Portfolio",
    type: "website",
    images: [
      {
        url: "https://kevin-macandog.vercel.app/img/my-website.jpg", // Siguraduhin na .png o .jpg ang tama
        width: 1200,
        height: 630,
        alt: "Kevin Macandog - Full Stack Developer",
      },
    ],
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: "summary_large_image",
    title: "Kevin Macandog | Portfolio",
    description: "Full Stack Software Developer specializing in React.js, Node.js, and Laravel. Explore my portfolio to see how I build efficient, scalable, and user-friendly web applications with clean code.",
    images: ["https://kevin-macandog.vercel.app/img/my-website.jpg"],
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
      <head>
        <link rel="icon" href="/img/logo.png" sizes="any" />
        <link rel="apple-touch-icon" href="/img/logo.png" />
        
        {/* JSON-LD Structured Data para sa SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Kevin Macandog",
              "url": "https://kevin-macandog.vercel.app",
              "jobTitle": "Full Stack Software Developer",
              "knowsAbout": ["React.js", "Node.js", "Vue.js", "Laravel", "PHP", "MySQL"],
            }),
          }}
        />
      </head>
      <body className={cn(
        inter.className, 
        "bg-background text-slate-200 antialiased overflow-x-hidden"
      )} suppressHydrationWarning>
        <CustomCursor />
        <Navbar />
        {children}
        <Toaster
          toastOptions={{
            style: {
              background: '#333',
              color: '#fff',
              borderRadius: '10px',
            },
          }}
        />
        <ScrollToTop />
      </body>
    </html>
  );
}