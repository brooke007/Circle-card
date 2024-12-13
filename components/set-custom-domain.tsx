"use client";

import { useState } from "react";

interface SetCustomDomainProps {
  account: string;
  onDomainSet: (domain: string) => void;
}

export default function SetCustomDomain({ account, onDomainSet }: SetCustomDomainProps) {
  const [customDomain, setCustomDomain] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'updateCustomDomain', username: account, customDomain }),
      });

      console.log(response)
      if (!response.ok) {
        throw new Error('更新自定义域名失败');
      }

      const result = await response.json();
      if (result.success) {
        onDomainSet(customDomain);
      } else {
        setError("更新自定义域名失败");
      }
    } catch (error: any) {
      setError(error.message || "发生错误");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <input
        type="text"
        value={customDomain}
        onChange={e => setCustomDomain(e.target.value)}
        placeholder="Enter custom domain"
        className="w-64 p-2 border rounded mb-4 text-gray-800"
        required
      />
      <button
        type="submit"
        className="bg-black text-white px-2 py-1 rounded-md text-lg font-semibold hover:bg-gray-800 transition-colors"
      >
        Set Custom Domain
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}
