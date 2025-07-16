import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";

// Wrapped SOL mint address (same for mainnet and devnet)
const WSOL_MINT = "So11111111111111111111111111111111111111112";

export function useTokenBalances() {
    const { publicKey } = useWallet();
    const { connection } = useConnection();
    const [tokens, setTokens] = useState<{ mint: string; amount: number; decimals: number }[]>([]);

    useEffect(() => {
        if (!publicKey) {
            setTokens([]);
            return;
        }

        const fetchTokens = async () => {
            // Fetch SPL tokens
            const response = await connection.getParsedTokenAccountsByOwner(
                publicKey,
                { programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA") }
            );
            const tokenList = response.value.map((accountInfo) => {
                const info = accountInfo.account.data.parsed.info;
                return {
                    mint: info.mint,
                    amount: info.tokenAmount.uiAmount,
                    decimals: info.tokenAmount.decimals,
                };
            });
            // Fetch native SOL balance
            const solLamports = await connection.getBalance(publicKey);
            const solToken = {
                mint: WSOL_MINT,
                amount: solLamports / 1e9, // Convert lamports to SOL
                decimals: 9,
            };
            const newTokens = [solToken, ...tokenList];
            // Deep equality check
            const isEqual = (
                a: { mint: string; amount: number; decimals: number }[],
                b: { mint: string; amount: number; decimals: number }[]
            ) => {
                if (a.length !== b.length) return false;
                for (let i = 0; i < a.length; i++) {
                    if (a[i].mint !== b[i].mint || a[i].amount !== b[i].amount || a[i].decimals !== b[i].decimals) {
                        return false;
                    }
                }
                return true;
            };
            setTokens(prevTokens => (isEqual(prevTokens, newTokens) ? prevTokens : newTokens));
        };

        fetchTokens();
    }, [publicKey, connection]);

    return tokens;
}