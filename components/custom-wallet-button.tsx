'use client'

import { useState, useEffect } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletName, WalletReadyState } from '@solana/wallet-adapter-base'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Wallet, Copy } from "lucide-react"
import { motion } from "framer-motion"
import '@/app/globals.css'

// 自定义钱包按钮组件
export default function CustomWalletButton() {
  const { wallets, select, wallet, disconnect, connecting, connected, publicKey } = useWallet()
  const [showWalletList, setShowWalletList] = useState(false)
  const [showWalletInfo, setShowWalletInfo] = useState(false)
  const [copied, setCopied] = useState(false)

  // 确保组件只在客户端渲染
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  // 渲染钱包列表弹窗
  const renderWalletList = () => (
    <Dialog open={showWalletList} onOpenChange={setShowWalletList}>
      <DialogContent className="bg-purple-700 text-yellow-400">
        <DialogHeader>
          <DialogTitle>选择钱包连接</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          {wallets.filter((wallet) => wallet.readyState !== WalletReadyState.Unsupported).map((wallet) => (
            <Button
              key={wallet.adapter.name}
              onClick={() => {
                select(wallet.adapter.name as WalletName)
                setShowWalletList(false)
              }}
              className="justify-start bg-purple-600 text-yellow-400 hover:bg-purple-500"
            >
              <img src={wallet.adapter.icon} alt={wallet.adapter.name} className="w-5 h-5 mr-2" />
              {wallet.adapter.name}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )

  // 渲染钱包信息弹窗
  const renderWalletInfo = () => (
    <Dialog open={showWalletInfo} onOpenChange={setShowWalletInfo}>
      <DialogContent className="bg-purple-700 text-yellow-400">
        <DialogHeader>
          <DialogTitle>钱包信息</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <Button
            onClick={() => {
              navigator.clipboard.writeText(publicKey?.toBase58() || '')
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            }}
            className="justify-start bg-purple-600 text-yellow-400 hover:bg-purple-500"
          >
            <Copy className="w-4 h-4 mr-2" />
            {copied ? '已复制!' : truncateAddress(publicKey?.toBase58() || '')}
          </Button>
          <Button
            onClick={() => {
              disconnect()
              setShowWalletInfo(false)
            }}
            className="justify-start bg-purple-600 text-yellow-400 hover:bg-purple-500"
          >
            断开连接
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )

  // 截断地址显示
  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  return (
    <div className="fixed top-4 right-4">
      <motion.div
        initial={false}
        animate={{
          width: connected ? 'auto' : 48,
          height: 48,
          transition: { duration: 0.3 }
        }}
      >
        <Button
          onClick={() => connected ? setShowWalletInfo(true) : setShowWalletList(true)}
          className={`h-12 rounded-full bg-pizzapurple text-yellow-200 hover:bg-purple-500 ${
            connected ? 'px-4' : 'w-12'
          } flex items-center space-x-2 overflow-hidden`}
        >
          {connected ? (
            <>
              <img
                src={wallet?.adapter.icon}
                alt={wallet?.adapter.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium">
                {publicKey && truncateAddress(publicKey.toBase58())}
              </span>
            </>
          ) : (
            <Wallet className="h-6 w-6" />
          )}
        </Button>
      </motion.div>
      {renderWalletList()}
      {renderWalletInfo()}
    </div>
  )
}

// 'use client'

// import { useState, useEffect } from 'react'
// import { useWallet } from '@solana/wallet-adapter-react'
// import { WalletName, WalletReadyState } from '@solana/wallet-adapter-base'
// import { Button } from "@/components/ui/button"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Wallet } from "lucide-react"

// export default function CustomWalletButton() {
//   const { wallets, select, wallet, disconnect, connecting, connected, publicKey } = useWallet()
//   const [showWalletList, setShowWalletList] = useState(false)

//   const [mounted, setMounted] = useState(false)
//   useEffect(() => setMounted(true), [])
//   if (!mounted) return null

//   const renderWalletList = () => (
//     <Dialog open={showWalletList} onOpenChange={setShowWalletList}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Connect a wallet</DialogTitle>
//         </DialogHeader>
//         <div className="grid gap-4">
//           {wallets.filter((wallet) => wallet.readyState !== WalletReadyState.Unsupported).map((wallet) => (
//             <Button
//               key={wallet.adapter.name}
//               onClick={() => {
//                 select(wallet.adapter.name as WalletName)
//                 setShowWalletList(false)
//               }}
//               className="justify-start"
//             >
//               <img src={wallet.adapter.icon} alt={wallet.adapter.name} className="w-5 h-5 mr-2" />
//               {wallet.adapter.name}
//             </Button>
//           ))}
//         </div>
//       </DialogContent>
//     </Dialog>
//   )

//   const truncateAddress = (address: string) => {
//     return `${address.slice(0, 4)}...${address.slice(-4)}`
//   }

//   return (
//     <div className="fixed top-4 right-4">
//       {!connected ? (
//         <Button
//           onClick={() => setShowWalletList(true)}
//           className="w-12 h-12 rounded-full bg-yellow-400 hover:bg-yellow-500 p-0"
//         >
//           <Wallet className="h-6 w-6 text-purple-600" />
//         </Button>
//       ) : (
//         <Button
//           onClick={disconnect}
//           className="h-12 rounded-full bg-yellow-400 hover:bg-yellow-500 px-4 flex items-center space-x-2"
//         >
//           <img
//             src={wallet?.adapter.icon}
//             alt={wallet?.adapter.name}
//             className="w-8 h-8 rounded-full"
//           />
//           <span className="text-purple-600 font-medium">
//             {publicKey && truncateAddress(publicKey.toBase58())}
//           </span>
//         </Button>
//       )}
//       {renderWalletList()}
//     </div>
//   )
// }