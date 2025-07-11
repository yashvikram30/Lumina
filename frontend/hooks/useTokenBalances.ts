import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";

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
            const response = await connection.getParsedTokenAccountsByOwner(
                publicKey,
                { programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA") }
            );
            // Parse the token info
            const tokenList = response.value.map((accountInfo) => {
                const info = accountInfo.account.data.parsed.info;
                return {
                    mint: info.mint,
                    amount: info.tokenAmount.uiAmount,
                    decimals: info.tokenAmount.decimals,
                };
            });
            setTokens(tokenList);
        };

        fetchTokens();
    }, [publicKey, connection]);

    return tokens;
}