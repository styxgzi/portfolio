import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import CursorGlow from "@/components/common/CursorGlow";
import OpeningAnimation from "@/components/common/OpeningAnimation";
import Snowfall from "@/components/common/Snowfall";
import FloatingShapes from "@/components/common/FloatingShapes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "msxcodes - portfolio website",
  description: "This is a portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/glaxy.png?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </head>
      <body
        className={`${inter.className} gradient-bg overflow-y-scroll overflow-x-hidden`}
      >
        <OpeningAnimation />
        <FloatingShapes />
        <Snowfall />
        <CursorGlow />
        <NextUIProvider>
          <Toaster />
          <div className="max-w-[100vw] overflow-hidden">
            {children}
          </div>
        </NextUIProvider>
      </body>
    </html>
  );
}
