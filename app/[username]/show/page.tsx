"use client";

import { notFound } from "next/navigation";
import { getUserByCustomDomain, getUserUrls } from "@/lib/data";
import ProfileShow from "@/components/profile-show";
import GoBack from "@/components/go-back";
import AddToMyCardholder from "@/components/add-to-my-cardholder";

export default function ShowPage({ params }: { params: { username: string } }) {
  const user = getUserByCustomDomain(params.username);

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
      <ProfileShow urls={socialLinks} username={user.customDomain} />
      <AddToMyCardholder currentUser={params.username} targetUser={user.customDomain} /> {/* 直接获取当前/[username] */}
    </div>
  );
}
