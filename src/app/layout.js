"use client"
import React, { useState } from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import "./globals.css";
import { Inter, Roboto } from "next/font/google";

// Font setup at module scope
const inter = Inter({
  subsets: ["latin"], 
  display: "swap", 
});
const roboto = Inter({
  subsets: ["latin"], 
});

export default function DashboardLayout({ children }) {

  // Clone the children and pass the necessary props (e.g., searchTerm and setSearchTerm)
  
  return (
    <html lang="en" data-theme="white">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Bookme</title>
      </head>
      <body className={roboto.className}> {/* Applying the Roboto font globally */}
        <div>

          {/* Main content */}
          <div className="bg-white">
            <main className="">
              <div className="">
                {/* Additional content or spaces */}
              </div>
              {children} {/* Render the children with the added props */}
            </main>
          </div>

          
        </div>
      </body>
    </html>
  );
}
