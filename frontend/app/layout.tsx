import "./globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";

import localFont from "next/font/local";

import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SolanaProvider } from "@/components/counter/provider/Solana";
import { Toaster } from "sonner";

const polySansNeutral = localFont({
  src: "./PolySans Neutral.ttf",
  variable: "--font-poly-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CircuitX Swap - Private Solana Swaps",
  description: "Private swap and send functionality on Solana using Privacy Cash",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${polySansNeutral.variable} font-sans antialiased bg-gray-950 text-white`}
      >
        <SolanaProvider>
          {children}
          <Toaster
            position="bottom-right"
            theme="dark"
            closeButton
            richColors={false}
            toastOptions={{
              style: {
                background: "#171717",
                color: "white",
                border: "1px solid rgba(75, 85, 99, 0.3)",
                borderRadius: "0.5rem",
                padding: "0.75rem 1rem",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
              },
              className: "toast-container",
            }}
          />
        </SolanaProvider>
        <Analytics />
      </body>
    </html>
  );
}
