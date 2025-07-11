import { useEffect, useState } from "react";

export function useTokenList(){
    const [tokens, setTokens] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // fetches all the tokens using the useEffect
    useEffect(()=>{
        fetch("https://cdn.jsdelivr.net/gh/solana-labs/token-list@main/src/tokens/solana.tokenlist.json")
        .then(res => res.json())
        .then(data => {
            setTokens(data.tokens);
            setLoading(false);
        })
    },[])

    return {tokens, loading};
}
  