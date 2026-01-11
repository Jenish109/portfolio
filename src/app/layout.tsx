import type { Metadata } from "next";
import { Roboto_Mono, Anonymous_Pro } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";
import { ChatProvider } from "@/context/ChatProvider";
import { profile } from "@/data/profile";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const anonymousPro = Anonymous_Pro({
  variable: "--font-anonymous-pro",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} | ${profile.role}`,
  description: profile.tagline,
  keywords: [
    "Developer",
    "Portfolio",
    "React",
    "Next.js",
    "TypeScript",
    "Web Development",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} | ${profile.role}`,
    description: profile.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${robotoMono.variable} ${anonymousPro.variable} antialiased`}
      >
        <ThemeProvider defaultTheme="dark">
          {/* Noise Overlay for texture */}
          <div className="noise-overlay" aria-hidden="true" />
          
          {/* Gradient Orbs */}
          <div className="gradient-orb gradient-orb-1" aria-hidden="true" />
          <div className="gradient-orb gradient-orb-2" aria-hidden="true" />
          
          <ChatProvider>{children}</ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
