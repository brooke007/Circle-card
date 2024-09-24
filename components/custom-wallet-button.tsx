"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletName, WalletReadyState } from "@solana/wallet-adapter-base";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Wallet, Copy } from "lucide-react";
import { motion } from "framer-motion";
import "@/app/globals.css";

// Custom Wallet Button Component
export default function CustomWalletButton() {
  const { wallets, select, wallet, disconnect, connected, publicKey } = useWallet();
  const [showWalletList, setShowWalletList] = useState(false);
  const [showWalletInfo, setShowWalletInfo] = useState(false);
  const [copied, setCopied] = useState(false);

  // Ensure the component is only rendered on the client side
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // Render wallet list dialog
  const renderWalletList = () => (
    <Dialog open={showWalletList} onOpenChange={setShowWalletList}>
      <DialogContent className="bg-white text-gray-800">
        <DialogHeader>
          <DialogTitle>Select a Wallet</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          {wallets
            .filter(wallet => wallet.readyState !== WalletReadyState.Unsupported)
            .map(wallet => (
              <Button
                key={wallet.adapter.name}
                onClick={() => {
                  select(wallet.adapter.name as WalletName);
                  setShowWalletList(false);
                }}
                className="justify-start bg-gray-200 text-gray-800 hover:bg-gray-300"
              >
                <img src={wallet.adapter.icon} alt={wallet.adapter.name} className="w-5 h-5 mr-2" />
                {wallet.adapter.name}
              </Button>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );

  // Render wallet info dialog
  const renderWalletInfo = () => (
    <Dialog open={showWalletInfo} onOpenChange={setShowWalletInfo}>
      <DialogContent className="bg-white text-gray-800">
        <DialogHeader>
          <DialogTitle>Wallet Info</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <Button
            onClick={() => {
              navigator.clipboard.writeText(publicKey?.toBase58() || "");
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="justify-start bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            <Copy className="w-4 h-4 mr-2" />
            {copied ? "Copied!" : truncateAddress(publicKey?.toBase58() || "")}
          </Button>
          <Button
            onClick={() => {
              disconnect();
              setShowWalletInfo(false);
            }}
            className="justify-start bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Disconnect
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  // Truncate address display
  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <div className="fixed top-4 right-4">
      <motion.div
        initial={false}
        animate={{
          width: connected ? "auto" : 48,
          height: 48,
          transition: { duration: 0.3 },
        }}
      >
        <Button
          onClick={() => (connected ? setShowWalletInfo(true) : setShowWalletList(true))}
          className={`h-12 rounded-full bg-white text-gray-800 hover:bg-gray-200 border border-gray-300 shadow-lg ${
            connected ? "px-4" : "w-12"
          } flex items-center space-x-2 overflow-hidden`}
        >
          {connected ? (
            <>
              <img src={wallet?.adapter.icon} alt={wallet?.adapter.name} className="w-8 h-8 rounded-full" />
              <span className="font-medium">{publicKey && truncateAddress(publicKey.toBase58())}</span>
            </>
          ) : (
            <Wallet className="h-8 w-8 text-gray-800" />
          )}
        </Button>
      </motion.div>
      {renderWalletList()}
      {renderWalletInfo()}
    </div>
  );
}
