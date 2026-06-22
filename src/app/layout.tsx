import "./globals.css";
import { Manrope } from "next/font/google";
import Providers from "./providers";

const manrope = Manrope({ subsets: ["latin"] });  
import type { Metadata } from "next";
import { ChatbotWidget } from "./components/ChatbotWidget";

export const metadata: Metadata = {
  title: "Trace Labs - Creating Software for SaaS companies",
  description: "Trace Labs",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.className} bg-slate-50`}>
        <Providers>
          {children}
          <ChatbotWidget/>
        </Providers>
      </body>
    </html>
  );
}