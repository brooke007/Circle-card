"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import ProfileShow from "@/components/profile-show";
import GoBack from "@/components/go-back";
import AddToMyCardholder from "@/components/add-to-my-cardholder";
import { User } from '../../types/user'; // 假设您有一个 User 类型定义
import FloatingActionButtons from "@/components/floating-action-buttons";
// import ProfileShow from '@/components/profile-show'
import CustomWalletButton from "@/components/custom-wallet-button";


export default function ProfilePage({ params }: { params: { username: string } }) {
  
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(`/api/user?username=${params.username}`);
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    }
    fetchUser();
  }, [params.username]);
  const [loggedInUser, setLoggedInUser] = useState<{
    account: string;
    password: string;
    customDomain: string;
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

  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    async function fetchSocialLinks() {
      const response = await fetch(`/api/user?customDomain=${user?.customDomain}`);
      if (response.ok) {
        const links = await response.json();
        setSocialLinks(links);
      }
    }
    fetchSocialLinks();
  }, [user.customDomain]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4">
      {/* 回退按钮 */}
      <div className="fixed top-4 left-4">
        <GoBack />
      </div>
      <div className="fixed top-4 right-4 z-50">
        <CustomWalletButton />
      </div>
      <ProfileShow urls={socialLinks} username={user.customDomain || ''} />
      <div className="fixed bottom-0 left-0 right-0 z-50 pb-6">
        {loggedInUser && loggedInUser.customDomain === user.customDomain ? (
          <FloatingActionButtons username={user.customDomain || ''} />
        ) : (
          // 新增判断逻辑
          loggedInUser &&
          loggedInUser.customDomain && user.customDomain && (
            <AddToMyCardholder currentUser={loggedInUser.customDomain} targetUser={user.customDomain} />
          )
        )}
 (added database)
      </div>
    </div>
  );
}
