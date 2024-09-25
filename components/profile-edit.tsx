"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { getUserUrls, updateUserUrls } from "@/lib/data"; // 假设 getUserUrls 可以根据 customDomain 获取用户的 profileurl 和 platform

interface ProfileEditProps {
  initialUrls: Array<{ platform: string; url: string }>;
  onSave: (urls: Array<{ platform: string; url: string }>) => void;
  username: string;
  loggedInUserCustomDomain: string; // 新增属性
}

const connectionPlatforms = ["wechat", "QQ", "email", "telegram", "discord", "phonenumber"];
const socialMediaPlatforms = [
  "twitter",
  "Facebook",
  "ins",
  "steam",
  "GitHub",
  "bilibili",
  "微博",
  "豆瓣",
  "小红书",
  "抖音",
];

export default function ProfileEdit({ initialUrls, onSave, username, loggedInUserCustomDomain }: ProfileEditProps) {
  const [urls, setUrls] = useState(initialUrls);
  const [connectionOpen, setConnectionOpen] = useState(false);
  const [socialMediaOpen, setSocialMediaOpen] = useState(false);
  const [changedUrls, setChangedUrls] = useState<Set<string>>(new Set());
  const router = useRouter();

  useEffect(() => {
    setUrls(initialUrls);
  }, [initialUrls]);

  useEffect(() => {
    // 根据 loggedInUserCustomDomain 获取用户的 profileurl 和 platform
    const userUrls = getUserUrls(loggedInUserCustomDomain);
    setUrls(userUrls);
  }, [loggedInUserCustomDomain]);

  const handleUrlChange = (platform: string, value: string) => {
    const index = urls.findIndex(url => url.platform === platform);
    if (index !== -1) {
      const newUrls = [...urls];
      newUrls[index].url = value;
      setUrls(newUrls);
    } else {
      setUrls([...urls, { platform, url: value }]);
    }
    setChangedUrls(new Set(changedUrls).add(platform));
  };

  const handleSave = async (type: "connection" | "socialMedia") => {
    // 使用 type 参数
    console.log(type); // 这里可以根据需要使用 type
    onSave(urls);
    setChangedUrls(new Set());
    // 保存数据到数据库
    await updateUserUrls(loggedInUserCustomDomain, urls);
    // 保存数据后跳转到登录用户的 customDomain 页面
    router.push(`/${loggedInUserCustomDomain}`);
  };

  const renderUrlInputs = (platforms: string[]) => {
    return platforms.map(platform => {
      const url = urls.find(u => u.platform === platform)?.url || "";
      const isChanged = changedUrls.has(platform);
      return (
        <div key={platform} className="mb-2">
          <label className="block text-sm font-medium text-gray-700">{platform}</label>
          <input
            type="text"
            value={url}
            onChange={e => handleUrlChange(platform, e.target.value)}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
              isChanged ? "text-gray-400" : "text-gray-900"
            }`}
          />
        </div>
      );
    });
  };

  return (
    <div className="space-y-4">
      <button
        onClick={() => setConnectionOpen(!connectionOpen)}
        className="w-full p-4 text-left font-semibold flex justify-between items-center bg-white text-gray-700 rounded-lg border-b border-gray-200"
      >
        Connection
        {connectionOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      {connectionOpen && (
        <div className="p-4">
          {renderUrlInputs(connectionPlatforms)}
          <button onClick={() => handleSave("connection")} className="mt-4 w-full p-2 bg-blue-500 text-white rounded">
            Save Connection
          </button>
        </div>
      )}
      <button
        onClick={() => setSocialMediaOpen(!socialMediaOpen)}
        className="w-full p-4 text-left font-semibold flex justify-between items-center bg-white text-gray-700 rounded-lg border-b border-gray-200"
      >
        Social Media
        {socialMediaOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      {socialMediaOpen && (
        <div className="p-4">
          {renderUrlInputs(socialMediaPlatforms)}
          <button onClick={() => handleSave("socialMedia")} className="mt-4 w-full p-2 bg-blue-500 text-white rounded">
            Save Social Media
          </button>
        </div>
      )}
      <button
        onClick={() => router.push(`/system`)}
        className="w-full p-4 text-left font-semibold flex justify-between items-center bg-white text-gray-700 rounded-lg border border-gray-200"
      >
        System
      </button>
    </div>
  );
}
