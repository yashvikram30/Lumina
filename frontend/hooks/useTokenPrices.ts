import { useEffect, useState } from "react";

export function useTokenPrices(mintAddresses: string[]) {
  const [prices, setPrices] = useState<{ [mint: string]: number }>({});

  useEffect(() => {
    if (!mintAddresses.length) return;

    const fetchPrices = async () => {
      const entries = await Promise.all(
        mintAddresses.map(async (address) => {
          const res = await fetch(`https://public-api.birdeye.so/public/price?address=${address}`);
          const data = await res.json();
          return [address, data.data?.value || 0];
        })
      );
      setPrices(Object.fromEntries(entries));
    };

    fetchPrices();
  }, [mintAddresses]);

  return prices;
}