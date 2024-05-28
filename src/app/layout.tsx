import "./globals.css"
import { Inter as FontSans } from "next/font/google"
import { extractRouterConfig } from "uploadthing/server"
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin"
import { cn } from "@/lib/utils"
import React from "react"
import Navbar from "@/components/header/navbar"
import { Toaster } from "@/components/ui/toaster"
import "@uploadthing/react/styles.css";
import { ourFileRouter } from "./api/uploadthing/core"
import { Analytics } from "@vercel/analytics/react"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-[#ebe6e6] font-sans antialiased overflow-x-clip",
          fontSans.variable
        )}
      >
        <Navbar />
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        {children}
        <Analytics/>
        <Toaster />
      </body>
    </html>
  )
}
