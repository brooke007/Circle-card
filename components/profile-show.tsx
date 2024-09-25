"use client";

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
    alert("copied");
  };

  const iconSize = connectionUrls.length > 4 ? 30 : 40; // 根据图标数量调整图标大小

  return (
    <div className="flex flex-col items-center">
      {/* 添加空白 */}
      <div className="h-16"></div>
      {/* 黑色圆环 */}
      {/* <div className="w-24 h-24 border-4 border-black rounded-full mb-4"></div> */}
      {/* 用户域名 */}
      <h1 className="text-2xl font-bold mb-4 text-gray-900">{username}</h1> {/* 使文字颜色更深 */}
      {/* Connection 方框 */}
      <div
        className="bg-white p-4 rounded-lg mb-4 w-full mx-2 border border-gray-200"
        style={{ height: "120px", maxWidth: "600px" }}
      >
        {" "}
        {/* 调整卡片边距和高度 */}
        {/* <h2 className="text-l font-semibold mb-2 text-gray-500">Connection</h2> */}
        <div className="grid grid-cols-4 gap-2">
          {connectionUrls.map((url, index) => (
            <Link key={index} href={url.url} target="_blank" className="flex justify-center items-center">
              <Image
                src={`/${url.platform}.png`}
                alt={url.platform}
                width={iconSize}
                height={iconSize}
                className="rounded-lg"
              />
            </Link>
          ))}
        </div>
      </div>
      {/* Social Media 方框 */}
      <div className="w-full mx-2" style={{ height: "120px", maxWidth: "600px" }}>
        {" "}
        {/* 透明框，固定高度 */}
        <div className="overflow-y-auto h-full">
          {socialMediaUrls.map((url, index) => (
            <div
              key={index}
              className="bg-white p-2 rounded-lg mb-2 flex justify-between items-center shadow-md"
              style={{ height: "50px" }}
            >
              {" "}
              {/* 调整卡片边距和高度 */}
              <div className="flex items-center">
                <Image src={`/${url.platform}.png`} alt={url.platform} width={40} height={40} className="rounded-lg" />
                <span className="ml-4 text-gray-500">{url.platform}</span> {/* 使文字颜色更深 */}
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
