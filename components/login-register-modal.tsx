"use client";

import { useState } from "react";

interface LoginRegisterModalProps {
  onClose: () => void;
  onLoginRegister: (account: string, password: string) => void;
}

export default function LoginRegisterModal({ onClose, onLoginRegister }: LoginRegisterModalProps) {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', username: account, password }),
      });

      if (!response.ok) {
        throw new Error('登录失败');
      }

      const user = await response.json();
      if (user) {
        onLoginRegister(account, password);
      } else {
        // 如果用户不存在，尝试注册
        const registerResponse = await fetch('/api/user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'register', username: account, password }),
        });

        if (!registerResponse.ok) {
          throw new Error('注册失败');
        }

        const newUser = await registerResponse.json();
        if (newUser) {
          onLoginRegister(account, password);
        } else {
          setError("账户已存在");
        }
      }
    } catch (error: any) {
      setError(error.message || "发生错误");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Log in/Sign up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={account}
            onChange={e => setAccount(e.target.value)}
            placeholder="Account"
            className="w-full p-2 border rounded mb-4 text-gray-800"
            required
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 border rounded mb-4 text-gray-800"
            required
          />
          <button
            type="submit"
            className="w-full bg-gray-700 text-white p-2 rounded mb-2 hover:bg-gray-800 transition-colors"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="w-full bg-gray-700 text-white p-2 rounded hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}
