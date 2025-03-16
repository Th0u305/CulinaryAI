import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/navbar";
import { ContextProvider } from "../ContextProvider/ContextProvider";
import { Toaster } from "@/components/ui/sonar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "CulinaryAI - Smart Recipe Generator",
  description: "Find recipes based on ingredients you already have",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="">
            <Toaster richColors position="bottom-right" />
            <ContextProvider>
              <Navbar />
              {children}
            </ContextProvider>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
