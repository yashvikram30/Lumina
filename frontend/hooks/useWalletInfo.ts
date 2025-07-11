import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

export function useWalletInfo(){
    const {publicKey} = useWallet();
    const {connection} = useConnection();
    const [balance, setBalance] = useState<number | null>(null);

    // if there is no publickey, i.e. no wallet connected, then balance is 0
    useEffect(()=>{
        if(!publicKey){
            setBalance(null);
            return;
        }
        connection.getBalance(publicKey).then(lamports => {
            setBalance(lamports / 1e9); // Convert lamports to SOL
        });
    },[publicKey,connection]);

    return {
        publicKey,
        balance,
    };
}