"use client";

import { useState } from "react";
import LoginRegisterModal from "@/components/login-register-modal";
import SetCustomDomain from "@/components/set-custom-domain";
import { findUser, createUser } from "@/lib/data";
import "./globals.css";

export default function Home() {
  const [showLoginRegisterModal, setShowLoginRegisterModal] = useState(false);
  const [user, setUser] = useState<{
    account: string;
    password: string;
    customDomain: string;
    avatarUrl: string;
  } | null>(null);

  const handleLoginRegister = (account: string, password: string) => {
    let loggedInUser = findUser(account, password);
    if (!loggedInUser) {
      loggedInUser = createUser(account, password) || undefined;
      setUser(loggedInUser || null);
      setShowLoginRegisterModal(false);
      // 注册后需要设置 customDomain 并跳转到 /[username]/edit 页面
      if (!loggedInUser?.customDomain) {
        return;
      }
    } else {
      setUser(loggedInUser);
      setShowLoginRegisterModal(false);
      // 登录后直接跳转到 /[username] 页面
      if (loggedInUser.customDomain) {
        window.location.href = `/${loggedInUser.customDomain}`;
        return;
      }
    }
  };
  const handleDomainSet = (domain: string) => {
    if (user) {
      setUser({ ...user, customDomain: domain });
      // 保存数据到数据库中
      localStorage.setItem("users", JSON.stringify(user));
      window.location.href = `/${domain}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center relative">
      <div className="flex items-center justify-center my-8">
        <div className="w-64 h-64 border-4 border-black rounded-full"></div>
      </div>
      <h1 className="text-2xl font-bold text-gray-800 ml-8 mr-8">Get Your Pizza Card Here!</h1>

      {user ? (
        !user.customDomain && <SetCustomDomain account={user.account} onDomainSet={handleDomainSet} />
      ) : (
        <button
          onClick={() => setShowLoginRegisterModal(true)}
          className="bg-black text-white px-2 py-1 mt-8 rounded-md text-lg font-semibold hover:bg-gray-800 transition-colors"
        >
          Log in/Sign up
        </button>
      )}
      {showLoginRegisterModal && (
        <LoginRegisterModal onClose={() => setShowLoginRegisterModal(false)} onLoginRegister={handleLoginRegister} />
      )}
    </div>
  );
}
