"use client";

import { useState, useEffect } from "react";
import LoginRegisterModal from "@/components/login-register-modal";
import SetCustomDomain from "@/components/set-custom-domain";
import { findUser, createUser } from "@/lib/data";
import FloatingActionButtons from "@/components/floating-action-buttons";
import CustomWalletButton from "@/components/custom-wallet-button";
import QRCodeShow from "@/components/QRCode-show";
import "./globals.css";

export default function Home() {
  const [showLoginRegisterModal, setShowLoginRegisterModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [user, setUser] = useState<{
    account: string;
    // password: string;
    customDomain: string;
    avatarUrl: string;
  } | null>(null);

  useEffect(() => {
    // 从本地存储中获取用户信息
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginRegister = (account: string, password: string) => {
    let loggedInUser = findUser(account, password);
    if (!loggedInUser) {
      loggedInUser = createUser(account, password) || undefined;
      setUser(loggedInUser || null);
      setShowLoginRegisterModal(false);
      // 注册后需要设置 customDomain
      if (!loggedInUser?.customDomain) {
        return;
      }
    } else {
      setUser(loggedInUser);
      setShowLoginRegisterModal(false);
      // 登录后直接显示内容
      if (loggedInUser.customDomain) {
        // 缓存用户信息
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        return;
      }
    }
    // 缓存用户信息
    localStorage.setItem("user", JSON.stringify(loggedInUser));
  };

  const handleDomainSet = (domain: string) => {
    if (user) {
      const updatedUser = { ...user, customDomain: domain };
      setUser(updatedUser);
      // 保存数据到数据库中
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const handleQRCodeClick = () => {
    if (user) {
      window.location.href = `/${user.customDomain}`;
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setShowLogoutModal(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative">
      {!user ? (
        <>
          <div className="flex items-center justify-center my-8">
            <video className="w-full h-full rounded-lg" src="/circle-video.mkv" autoPlay loop muted></video>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 ml-8 mr-8">Get Your Circle Card Here!</h1>
          <button
            onClick={() => setShowLoginRegisterModal(true)}
            className="bg-black text-white px-2 py-1 mt-8 rounded-md text-lg font-semibold hover:bg-gray-800 transition-colors w-[calc(100%-2rem)] mx-4"
          >
            Log in/Sign up
          </button>
        </>
      ) : !user.customDomain ? (
        <SetCustomDomain account={user.account} onDomainSet={handleDomainSet} />
      ) : (
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
              <h1 className="text-xl text-gray-800 font-bold cursor-pointer" onClick={() => setShowLogoutModal(true)}>
                {user.customDomain}
              </h1>
            </div>
            <div onClick={handleQRCodeClick}>
              <QRCodeShow customDomain={user.customDomain} />
            </div>
            <div className="h-24" />
          </div>
          {/* Spacer for floating buttons */}
          <div className="fixed bottom-0 left-0 right-0 z-50 pb-6">
            <FloatingActionButtons username={user.customDomain} />
          </div>
        </div>
      )}
      {showLoginRegisterModal && (
        <LoginRegisterModal onClose={() => setShowLoginRegisterModal(false)} onLoginRegister={handleLoginRegister} />
      )}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-96">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Log out</h2>
            <p className="mb-4 text-gray-800">Are you sure you want to log out?</p>
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 text-white p-2 rounded mb-2 hover:bg-red-700 transition-colors"
            >
              Log out
            </button>
            <button
              onClick={() => setShowLogoutModal(false)}
              className="w-full bg-gray-700 text-white p-2 rounded hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
