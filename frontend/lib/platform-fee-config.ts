/**
 * Platform fee configuration for swap transactions
 */
import { PublicKey } from "@solana/web3.js";

// Platform fee wallet address - receives swap fees
export const PLATFORM_FEE_WALLET = new PublicKey("6bNkzakJCxVgGYXsLKpdQvxd4zoD7uCijvs3ixF5XffJ");

// Platform fee rate in basis points (25 = 0.25%, 50 = 0.5%, etc.)
// 25 basis points = 0.25% fee
export const PLATFORM_FEE_BPS = 25; // 0.25% platform fee

/**
 * Calculate platform fee amount in base units
 * @param swapAmount Amount being swapped in base units (lamports for SOL)
 * @returns Fee amount in base units
 */
export function calculatePlatformFee(swapAmount: number): number {
  return Math.floor((swapAmount * PLATFORM_FEE_BPS) / 10000);
}

/**
 * Get platform fee percentage as a readable string
 */
export function getPlatformFeePercentage(): string {
  return (PLATFORM_FEE_BPS / 100).toFixed(2);
}
