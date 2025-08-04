import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import SpreadingDotsBackground from "@/components/common/SpreadingDotsBackground";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "styxgzi",
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
        className={`${inter.className} overflow-y-scroll overflow-x-hidden bg-gradient-to-b from-gray-900 via-blue-950 to-gray-900`}
      >
        <NextUIProvider>
          <Toaster />
          <SpreadingDotsBackground 
            dotCount={180}
            dotSize={3}
            dotColor="#60a5fa"
            lineColor="#3b82f6"
            lineOpacity={0.15}
            maxDistance={100}
            pulseFrequency={3}
            pulseSize={100}
            pulseColor="#60a5fa"
            mouseInfluence={0.1}
          />
          <div className="max-w-[100vw] overflow-hidden">
            {children}
          </div>
        </NextUIProvider>
      </body>
    </html>
  );
}
