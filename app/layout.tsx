"use client";
import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "next-themes";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="dark:bg-stone-900 bg-slate-50">
        <ThemeProvider enableSystem={true} attribute="class">
          <div className="h-screen w-full flex flex-col justify-between overflow-hidden">
            <Navbar />
            <div className="flex flex-grow justify-center overflow-hidden w-full">
              <div className="m-auto w-full h-full">{children}</div>
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
