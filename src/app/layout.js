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
// This is the main layout of the website with all
export default function DashboardLayout({ children }) {
  return (
    <html lang="en" data-theme="white">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Bookme</title>
        {/* <link
          rel="icon"
          href="assets/images/tangular-logo.svg"
          type="image/svg+xml"
        /> */}
      </head>
      <body className={inter.className}>
        {/*global search provider*/}
        <SearchProvider>
          {" "}
          {/* Wrap children inside provider */}
          <div>
            <div className="bg-white">
              <main>
                {/* <Header /> */}
                <div className="min-h-[100vh]  ">{children}</div>
                <Footer />
              </main>
            </div>
          </div>
        </SearchProvider>
      </body>
    </html>
  );
}
