import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { ConvexClerkProvider } from "@/components/providers/convex-clerk-provider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: {
    default: "Diffshot — Turn Your Code Into Customers",
    template: "%s | Diffshot",
  },
  description:
    "Auto-generate visual changelog tweets from your GitHub commits. Ship code, share progress, grow your audience.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://diffshot.app"),
  openGraph: {
    title: "Diffshot — Turn Your Code Into Customers",
    description:
      "Auto-generate visual changelog tweets from your GitHub commits. Ship code, share progress, grow your audience.",
    siteName: "Diffshot",
    type: "website",
    images: ["/Diffshot_Final_Logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diffshot — Turn Your Code Into Customers",
    description:
      "Auto-generate visual changelog tweets from your GitHub commits. Ship code, share progress, grow your audience.",
    images: ["/Diffshot_Final_Logo.png"],
  },
  icons: {
    icon: "/favicon_final.png",
    apple: "/favicon_final.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ConvexClerkProvider>
          {children}
          <Toaster />
          <Analytics />
          <SpeedInsights />
        </ConvexClerkProvider>
      </body>
    </html>
  );
}
