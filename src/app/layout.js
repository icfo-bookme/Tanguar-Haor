"use client";
import React from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import { SearchProvider } from "@/SearchContext";

// Font setup at module scope
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function DashboardLayout({ children }) {
  return (
    <html lang="en" data-theme="white">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Bookme</title>
        <link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
  integrity="sha512-b+nQTCdtTBIRIbraqNEwsjB6UvL3UEMkXnhzd8awtCYh0Kcsjl9uEgwVFVbhoj3uu1DO1ZMacNvLoyJJiNfcvg==" 
  crossOrigin="anonymous"
  referrerPolicy="no-referrer"
/>

      </head>
      <body className={inter.className}>
        <SearchProvider>
          {" "}
          {/* Wrap children inside provider */}
          <div>
            <div className="bg-white">
              <main>
                <Header /> {/* No need to pass props manually */}
                {children}
                <Footer />
              </main>
            </div>
          </div>
        </SearchProvider>
      </body>
    </html>
  );
}
