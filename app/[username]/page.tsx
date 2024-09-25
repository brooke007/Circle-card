"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { getUserByCustomDomain, getUserUrls, getSavedCards } from "@/lib/data";
import ProfileShow from "@/components/profile-show";
import GoBack from "@/components/go-back";
import AddToMyCardholder from "@/components/add-to-my-cardholder";
import CustomWalletButton from "@/components/custom-wallet-button";
import FloatingActionButtons from "@/components/floating-action-buttons";

export default function ProfilePage({ params }: { params: { username: string } }) {
  const user = getUserByCustomDomain(params.username);
  const [loggedInUser, setLoggedInUser] = useState<{
    account: string;
    password: string;
    customDomain: string;
    avatarUrl: string;
  } | null>(null);

  useEffect(() => {
    // 从本地存储中获取登录用户信息
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    notFound();
  }

  const socialLinks = getUserUrls(user.customDomain);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4">
      {/* 回退按钮 */}
      <div className="fixed top-4 left-4">
        <GoBack />
      </div>
      <div className="fixed top-4 right-4 z-50">
        <CustomWalletButton />
      </div>
      <ProfileShow urls={socialLinks} username={user.customDomain} /> {/* 传递 newusername */}
      <div className="fixed bottom-0 left-0 right-0 z-50 pb-6">
        {loggedInUser && loggedInUser.customDomain === user.customDomain ? (
          <FloatingActionButtons username={user.customDomain} />
        ) : (
          // 新增判断逻辑
          loggedInUser &&
          !getSavedCards(loggedInUser.customDomain).includes(user.customDomain) && (
            <AddToMyCardholder currentUser={loggedInUser.customDomain} targetUser={user.customDomain} />
          )
        )}
      </div>
    </div>
  );
}
