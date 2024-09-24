"use client";

// import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProfileShowProps {
  urls: Array<{ platform: string; url: string }>;
  username: string;
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

export default function ProfileShow({ urls, username }: ProfileShowProps) {
  const connectionUrls = urls.filter(url => connectionPlatforms.includes(url.platform)).slice(0, 8);
  const socialMediaUrls = urls.filter(url => socialMediaPlatforms.includes(url.platform));

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    alert("链接已复制到剪贴板");
  };

  return (
    <div className="flex flex-col items-center p-4">
      {/* 黑色圆环 */}
      <div className="w-24 h-24 border-4 border-black rounded-full mb-4"></div>
      {/* 用户域名 */}
      <h1 className="text-2xl font-bold mb-4 text-gray-900">{username}</h1> {/* 使文字颜色更深 */}
      {/* Connection 方框 */}
      <div className="bg-gray-200 p-4 rounded-lg mb-4 w-full max-w-md mx-2" style={{ height: "150px" }}>
        {" "}
        {/* 调整卡片边距和高度 */}
        <h2 className="text-xl font-semibold mb-2">Connection</h2>
        <div className="grid grid-cols-4 gap-2">
          {connectionUrls.map((url, index) => (
            <Link key={index} href={url.url} target="_blank" className="flex justify-center items-center">
              <Image src={`/${url.platform}.png`} alt={url.platform} width={40} height={40} className="rounded-lg" />
            </Link>
          ))}
        </div>
      </div>
      {/* Social Media 方框 */}
      <div className="w-full max-w-md overflow-hidden" style={{ height: "200px" }}>
        {" "}
        {/* 透明框，固定高度 */}
        <div className="overflow-y-auto h-full">
          {socialMediaUrls.map((url, index) => (
            <div
              key={index}
              className="bg-white p-2 rounded-lg mb-2 flex justify-between items-center shadow-md mx-2"
              style={{ height: "50px" }}
            >
              {" "}
              {/* 调整卡片边距和高度 */}
              <div className="flex items-center">
                <Image src={`/${url.platform}.png`} alt={url.platform} width={40} height={40} className="rounded-lg" />
                <span className="ml-4">{url.platform}</span>
              </div>
              <button
                onClick={() => copyToClipboard(url.url)}
                className="bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
