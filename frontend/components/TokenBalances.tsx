"use client";
import { useTokenBalances } from "@/hooks/useTokenBalances";
import { useTokenList } from "@/hooks/useTokenList";
const fallbackLogo = "/vercel.svg";

const TokenBalances = () => {
  const tokens = useTokenBalances();
  const { tokens: tokenList, loading } = useTokenList();

  if (!tokens.length) return (
    <div>No tokens found.</div>
  )
  if (loading) return (<div> Loading... </div>)

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 24 }}>
      <thead>
        <tr>
          <th style={{ padding: "8px", textAlign: "left" }}>Logo</th>
          <th style={{ padding: "8px", textAlign: "left" }}>Name</th>
          <th style={{ padding: "8px", textAlign: "left" }}>Symbol</th>
          <th style={{ padding: "8px", textAlign: "right" }}>Amount</th>
          <th style={{ padding: "8px", textAlign: "right" }}>Decimals</th>
          <th style={{ padding: "8px", textAlign: "left" }}>Mint Address</th>
        </tr>
      </thead>
      <tbody>
        {tokens.map((token) => {
          const tokenMeta = tokenList.find(t => t.address === token.mint);
          console.log("Wallet mint:", token.mint, "Matched meta:", tokenMeta);
          return (
            <tr key={token.mint}>
            <td>
              <img
                src={tokenMeta?.logoURI || fallbackLogo}
                alt={tokenMeta?.symbol || "Unknown Token"}
                width={24}
                height={24}
                style={{ verticalAlign: "middle", borderRadius: 4 }}
              />
            </td>
            <td style={{ padding: "8px" }}>{tokenMeta?.name || "Devnet Token"}</td>
            <td style={{ padding: "8px" }}>{tokenMeta?.symbol || "Devnet Symbol"}</td>
            <td style={{ padding: "8px", textAlign: "right" }}>{token.amount}</td>
            <td style={{ padding: "8px", textAlign: "right" }}>{token.decimals}</td>
            <td style={{ padding: "8px", fontSize: "0.85em", color: "#888" }}>{token.mint}</td>
          </tr>
          )
        })}
      </tbody>
    </table>
  );
};

export default TokenBalances;