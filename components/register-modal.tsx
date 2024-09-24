"use client";

import { useState } from "react";
import { createUser } from "@/lib/data";

interface RegisterModalProps {
  onClose: () => void;
  onRegister: (user: any) => void;
}

export default function RegisterModal({ onClose, onRegister }: RegisterModalProps) {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const newUser = createUser(account, password);
    if (newUser) {
      onRegister(newUser);
    } else {
      setError("Account already exists");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={account}
            onChange={e => setAccount(e.target.value)}
            placeholder="Account"
            className="w-full p-2 border rounded mb-4"
            required
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 border rounded mb-4"
            required
          />
          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded mb-2">
            Register
          </button>
          <button onClick={onClose} className="w-full bg-gray-300 text-gray-800 p-2 rounded">
            Cancel
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}
