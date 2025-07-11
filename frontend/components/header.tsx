"use client";
import WalletButton from "./WalletButton";
import WalletInfo from "./WalletInfo";

const Header = () => (
  <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem" }}>
    <h1>Solana Portfolio Tracker</h1>
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <WalletInfo />
      <WalletButton />
    </div>
  </header>
);

export default Header;