"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { fetchPoints } from "@/lib/points-api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function PointsDisplay() {
  const { publicKey, connected } = useWallet();
  const [points, setPoints] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const refreshPoints = () => {
    if (!publicKey) return;
    setLoading(true);
    fetchPoints(publicKey.toBase58())
      .then((res) => setPoints(res.points))
      .catch(() => setPoints(null))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!connected || !publicKey) {
      setPoints(null);
      return;
    }
    refreshPoints();
  }, [connected, publicKey]);

  useEffect(() => {
    const handler = () => refreshPoints();
    window.addEventListener("circuitx-points-awarded", handler);
    return () => window.removeEventListener("circuitx-points-awarded", handler);
  }, [publicKey]);

  if (!connected) return null;

  return (
    <div className="flex items-center gap-2">
      <div className="hidden sm:flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-900/50 px-3 py-1.5 text-sm text-gray-300">
        {loading && points === null ? (
          <span className="animate-pulse">...</span>
        ) : (
          <span className="font-medium text-white">{points ?? 0} pts</span>
        )}
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-700 bg-gray-900/50 text-gray-300 hover:bg-gray-800 hover:text-white text-xs sm:text-sm"
          >
            Leaderboard
          </Button>
        </DialogTrigger>
        <DialogContent className="border-gray-800 bg-gray-900 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Points Leaderboard</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-400 py-4">Coming soon.</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
