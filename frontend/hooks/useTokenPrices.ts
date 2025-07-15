import { useEffect, useState } from "react";

// Map supported mints to Coingecko IDs
const COINGECKO_MINTS: Record<string, string> = {
  // Wrapped SOL mainnet
  "So11111111111111111111111111111111111111112": "solana",
  // USDC mainnet (correct address)
  "EPjFWdd5AufqSSqeM2q8VsJb9KztnwYk2bB6Pp8XKX": "usd-coin",
  // USDT mainnet
  "Es9vMFrzaCERZ6t2kF9Q4FQp9Qd8Q6Qd8Q6Qd8Q6Qd8Q": "tether",
  // BONK mainnet
  "DezX6SeB1bGzjKz5u5h5u5h5u5h5u5h5u5h5u5h5u5h5": "bonk",
  // ETH (Wormhole) mainnet
  "2ndtZr1n2y1k1t1v1u1w1x1y1z1A1B1C1D1E1F1G1H1I1J1K1L1M1N1O1P1Q1R1S1T1U1V1W1X1Y1Z": "ethereum",
  // BTC (Wormhole) mainnet
  "9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E": "bitcoin",
  // SUI (Wormhole) mainnet
  "7XSzF1Q6Xo8Xz8Q6Qd8Q6Qd8Q6Qd8Q6Qd8Q6Qd8Q6Qd8Q": "sui",
  // Add more mappings as needed
};

export function useTokenPrices(mintAddresses: string[]) {
  const [prices, setPrices] = useState<{ [mint: string]: number }>({});

  useEffect(() => {
    if (!mintAddresses.length) return;

    const fetchPrices = async () => {
      const entries = await Promise.all(
        mintAddresses.map(async (address) => {
          const coingeckoId = COINGECKO_MINTS[address];
          if (coingeckoId) {
            try {
              const res = await fetch(
                `https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoId}&vs_currencies=usd`
              );
              const data = await res.json();
              return [address, data[coingeckoId]?.usd || 0];
            } catch {
              return [address, 0];
            }
          }
          // For unsupported tokens, return 0
          return [address, 0];
        })
      );
      setPrices(Object.fromEntries(entries));
    };

    fetchPrices();
  }, [mintAddresses]);

  return prices;
}