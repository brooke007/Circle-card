"use client";

import { notFound, useRouter } from "next/navigation";
import { getUserByCustomDomain } from "@/lib/data";
import FloatingActionButtons from "@/components/floating-action-buttons";
import CustomWalletButton from "@/components/custom-wallet-button";
import QRCodeShow from "@/components/QRCode-show";
// import QRCodeScanner from "@/components/Scan-QRcode-show";

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
      <div className="relative z-10 flex flex-col items-center">
        <div className="h-16" />
        <div className="flex justify-center items-center h-48">
          <img src="/circle-logo.png" alt="Circle Logo" className="h-auto w-96" />
        </div>
        <div className="text-center mb-2">
          <h1 className="text-xl text-gray-800 font-bold">{user.customDomain}</h1>
        </div>
        <div onClick={handleQRCodeClick}>
          <QRCodeShow username={user.customDomain} />
        </div>
        <div className="h-24" />
      </div>
      {/* Spacer for floating buttons */}
      <div className="fixed bottom-0 left-0 right-0 z-50 pb-6">
        <FloatingActionButtons username={user.customDomain} />
      </div>
    </div>
  );
}
