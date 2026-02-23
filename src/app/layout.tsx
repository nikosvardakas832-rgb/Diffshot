import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { ConvexClerkProvider } from "@/components/providers/convex-clerk-provider";
import { Toaster } from "@/components/ui/sonner";
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

// All pages need runtime auth/data — skip static generation
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Diffshot — Turn Your Code Into Customers",
  description:
    "Auto-generate visual changelog tweets from your GitHub commits. Ship code, share progress, grow your audience.",
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
        </ConvexClerkProvider>
      </body>
    </html>
  );
}
