import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ConvexClerkProvider } from "@/components/providers/convex-clerk-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
