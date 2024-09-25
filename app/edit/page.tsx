"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProfileEdit from "@/components/profile-edit";
import { getUserUrls, updateUserUrls } from "@/lib/data";
import GoBack from "@/components/go-back";

export default function EditProfilePage({ params }: { params: { username: string } }) {
  const [socialLinks, setSocialLinks] = useState<{ platform: string; url: string }[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<{
    account: string;
    password: string;
    customDomain: string;
    avatarUrl: string;
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const links = getUserUrls(params.username);
    setSocialLinks(links);

    // 从本地存储中获取登录用户信息
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, [params.username]);

  const handleSave = (updatedUrls: { platform: string; url: string }[]) => {
    updateUserUrls(params.username, updatedUrls);
    router.push(`/${params.username}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="inline-flex items-center mb-4 text-blue-500">
        <GoBack />
      </div>
      {loggedInUser && (
        <ProfileEdit
          initialUrls={socialLinks}
          onSave={handleSave}
          username={params.username}
          loggedInUserCustomDomain={loggedInUser.customDomain}
        />
      )}
    </div>
  );
}
