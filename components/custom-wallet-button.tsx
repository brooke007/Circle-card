'use client'

import { useState, useEffect } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletName, WalletReadyState } from '@solana/wallet-adapter-base'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Wallet } from "lucide-react"

export default function CustomWalletButton() {
  const { wallets, select, wallet, disconnect, connecting, connected, publicKey } = useWallet()
  const [showWalletList, setShowWalletList] = useState(false)

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const renderWalletList = () => (
    <Dialog open={showWalletList} onOpenChange={setShowWalletList}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect a wallet</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          {wallets.filter((wallet) => wallet.readyState !== WalletReadyState.Unsupported).map((wallet) => (
            <Button
              key={wallet.adapter.name}
              onClick={() => {
                select(wallet.adapter.name as WalletName)
                setShowWalletList(false)
              }}
              className="justify-start"
            >
              <img src={wallet.adapter.icon} alt={wallet.adapter.name} className="w-5 h-5 mr-2" />
              {wallet.adapter.name}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  return (
    <div className="fixed top-4 right-4">
      {!connected ? (
        <Button
          onClick={() => setShowWalletList(true)}
          className="w-12 h-12 rounded-full bg-yellow-400 hover:bg-yellow-500 p-0"
        >
          <Wallet className="h-6 w-6 text-purple-600" />
        </Button>
      ) : (
        <Button
          onClick={disconnect}
          className="h-12 rounded-full bg-yellow-400 hover:bg-yellow-500 px-4 flex items-center space-x-2"
        >
          <img
            src={wallet?.adapter.icon}
            alt={wallet?.adapter.name}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-purple-600 font-medium">
            {publicKey && truncateAddress(publicKey.toBase58())}
          </span>
        </Button>
      )}
      {renderWalletList()}
    </div>
  )
}