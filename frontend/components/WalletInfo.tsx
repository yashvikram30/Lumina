import React from "react";
import NeobrutalCard from "./ui/NeobrutalCard";

interface NetworkSwitcherProps {
  network: "mainnet-beta" | "devnet";
  onNetworkChange: (network: "mainnet-beta" | "devnet") => void;
}

const NetworkSwitcher: React.FC<NetworkSwitcherProps> = ({ network, onNetworkChange }) => {
  return (
    <NeobrutalCard className="flex items-center gap-2 px-2 py-1 bg-yellow-100 border-2 border-black rounded-lg shadow-neobrutalism">
      {/* <label htmlFor="network-select" className="font-mono text-xs text-black mr-2">Network:</label> */}
      <select
        id="network-select"
        value={network}
        onChange={e => onNetworkChange(e.target.value as "mainnet-beta" | "devnet")}
        className="font-mono text-xs border-2 border-black rounded  bg-white focus:outline-none focus:ring-2 focus:ring-pink-400"
      >
        <option value="mainnet-beta">Mainnet</option>
        <option value="devnet">Devnet</option>
      </select>
    </NeobrutalCard>
  );
};

export default NetworkSwitcher;