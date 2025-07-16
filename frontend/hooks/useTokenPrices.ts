import { useEffect, useState } from "react";
import { useTokenList } from "@/hooks/useTokenList";

export function useTokenPrices(mintAddresses: string[]) {
  const [prices, setPrices] = useState<{ [mint: string]: number }>({});
  const { tokens: tokenList } = useTokenList();

  useEffect(() => {
    if (!mintAddresses.length) return;
    // Only fetch once per change of mintAddresses or tokenList
    let cancelled = false;
    const fetchPrices = async () => {
      // Map mint addresses to symbols using tokenList
      const mintToSymbol: Record<string, string> = {};
      mintAddresses.forEach(mint => {
        const meta = tokenList.find(t => t.address.toLowerCase() === mint.toLowerCase());
        if (meta && meta.symbol) {
          mintToSymbol[mint] = meta.symbol.toUpperCase();
        }
      });
      const symbols = Object.values(mintToSymbol);
      if (!symbols.length) {
        setPrices({});
        return;
      }
      try {
        const res = await fetch(
          `/api/cmc-prices?symbols=${symbols.join(",")}`
        );
        if (cancelled) return;
        const data = await res.json();
        // Map back to mint addresses
        const priceMap: { [mint: string]: number } = {};
        for (const mint in mintToSymbol) {
          const symbol = mintToSymbol[mint];
          const price = data.data?.[symbol]?.[0]?.quote?.USD?.price;
          priceMap[mint] = price || 0;
        }
        setPrices(priceMap);
      } catch {
        if (!cancelled) setPrices({});
      }
    };
    fetchPrices();
    return () => { cancelled = true; };
  }, [mintAddresses, tokenList]);

  return prices;
}