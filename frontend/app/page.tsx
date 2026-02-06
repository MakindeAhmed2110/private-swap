"use client";

import { WalletButton } from "@/components/counter/WalletButton";
import { PointsDisplay } from "@/components/points/PointsDisplay";
import { SendPrivately } from "@/components/swap/SendPrivately";
import { SwapPrivately } from "@/components/swap/SwapPrivately";
import { useState, useEffect } from "react";
import { Shield, ArrowLeftRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const LG_BREAKPOINT = 1024;

export default function Home() {
  const [activeTab, setActiveTab] = useState<"send" | "swap">("send");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const m = window.matchMedia(`(max-width: ${LG_BREAKPOINT - 1}px)`);
    setIsMobile(m.matches);
    const handler = () => setIsMobile(m.matches);
    m.addEventListener("change", handler);
    return () => m.removeEventListener("change", handler);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>

      {/* Header */}
      <header className="relative z-20 w-full px-4 sm:px-6 md:px-8 py-4 sm:py-6 border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <Image
              src="/logo.jpg"
              alt="CircuitX Swap Logo"
              width={32}
              height={32}
              className="rounded sm:w-10 sm:h-10"
            />
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
              circuitx_swap
            </h1>
          </Link>

          {/* Center: Navigation Box */}
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:flex">
            <div className="flex items-center border border-gray-700 rounded-lg bg-gray-900/50 backdrop-blur-sm overflow-hidden">
              <Link
                href="/"
                className="px-6 py-2 text-sm font-medium text-white transition-colors border-r border-gray-700"
              >
                Swap
              </Link>
              <Link
                href="/docs"
                className="px-6 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors border-r border-gray-700"
              >
                Docs
              </Link>
              <Link
                href="/tokenomics"
                className="px-6 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                Tokenomics
              </Link>
            </div>
          </div>

          {/* Right: Mobile Menu & Wallet Connect */}
          <div className="flex items-center gap-2 sm:gap-4 ml-auto">
            {/* Mobile Hamburger Menu */}
            <div className="lg:hidden relative">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              
              {/* Mobile Menu Dropdown */}
              {mobileMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 bg-black/50 z-30"
                    onClick={() => setMobileMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900 border border-gray-800 rounded-lg shadow-xl z-40 overflow-hidden">
                    <Link
                      href="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white hover:text-black transition-colors"
                    >
                      <span className="text-sm font-medium">Swap</span>
                    </Link>
                    <Link
                      href="/docs"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white hover:text-black transition-colors border-t border-gray-800"
                    >
                      <span className="text-sm font-medium">Docs</span>
                    </Link>
                    <Link
                      href="/tokenomics"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white hover:text-black transition-colors border-t border-gray-800"
                    >
                      <span className="text-sm font-medium">Tokenomics</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setLeaderboardOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 text-left text-gray-300 hover:bg-white hover:text-black transition-colors border-t border-gray-800"
                    >
                      <span className="text-sm font-medium">Leaderboard</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Points + Wallet */}
            <PointsDisplay
              leaderboardOpen={leaderboardOpen}
              onLeaderboardOpenChange={setLeaderboardOpen}
              showLeaderboardTrigger={!isMobile}
            />
            <div className="scale-90 sm:scale-100">
              <WalletButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-7xl">
          {/* Feature Tabs */}
          <div className="flex justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
            <button
              onClick={() => setActiveTab("send")}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${
                activeTab === "send"
                  ? "bg-white text-black"
                  : "bg-gray-800/50 text-gray-400 hover:bg-gray-800"
              }`}
            >
              <Shield className="inline-block mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Shield assets</span>
              <span className="sm:hidden">Shield</span>
            </button>
            <button
              onClick={() => setActiveTab("swap")}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${
                activeTab === "swap"
                  ? "bg-white text-black"
                  : "bg-gray-800/50 text-gray-400 hover:bg-gray-800"
              }`}
            >
              <ArrowLeftRight className="inline-block mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Swap Privately</span>
              <span className="sm:hidden">Swap</span>
            </button>
          </div>

          {/* Feature Content */}
          <div className="flex justify-center">
            {activeTab === "send" ? <SendPrivately /> : <SwapPrivately />}
          </div>
        </div>
      </div>

      <footer className="relative z-10 mt-auto py-8 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">Powered by Jupiter & Privacy Cash</p>
            <div className="flex items-center gap-6">
              <a
                href="https://x.com/i/communities/2015047501058097323"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>Join X Community</span>
              </a>
              <a
                href="https://x.com/circuitx_app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>CircuitX X</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
