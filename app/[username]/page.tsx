"use client";

// import { useWallet } from '@solana/wallet-adapter-react'
// import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

import { notFound, useRouter } from "next/navigation";
import { getUserByCustomDomain } from "@/lib/data";
import FloatingActionButtons from "@/components/floating-action-buttons";
// import ProfileShow from '@/components/profile-show'
import CustomWalletButton from "@/components/custom-wallet-button";
import QRCodeShow from "@/components/QRCode-show";

export default function ProfilePage({ params }: { params: { username: string } }) {
  const user = getUserByCustomDomain(params.username);
  const router = useRouter();
  // const { publicKey } = useWallet()

  if (!user) {
    notFound();
  }

  // const socialLinks = getUserUrls(user.customDomain);

  const handleQRCodeClick = () => {
    router.push(`/${params.username}/show`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center relative p-4 overflow-hidden">
      <div className="fixed top-4 right-4 z-50">
        <CustomWalletButton />
      </div>
      <div className="h-24" />
      <div className="text-center mb-2">
        <h1 className="text-xl text-gray-800 font-bold">{user.customDomain}</h1>
      </div>
      <div onClick={handleQRCodeClick}>
        <QRCodeShow username={user.customDomain} />
      </div>
      <div className="h-24" />
      {/* Spacer for floating buttons */}
      <div className="fixed bottom-0 left-0 right-0 z-50 pb-6">
        <FloatingActionButtons username={user.customDomain} />
      </div>
    </div>
  );
}
