"use client";

import { useState, useEffect } from "react";
import CardShow from "@/components/card-show";
import { getSavedCards, getUserByCustomDomain, addSavedCard } from "@/lib/data";
import GoBack from "@/components/go-back";
import AddCardModal from "@/components/add-card-modal";

export default function CardHolderPage() {
  const [savedCards, setSavedCards] = useState<Array<{ customDomain: string; account: string }>>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // 从本地存储中获取登录用户信息
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const loggedInUser = JSON.parse(storedUser);
      const cards = getSavedCards(loggedInUser.customDomain).map(customDomain => ({
        customDomain,
        account: getUserByCustomDomain(customDomain)?.account || "Unknown User",
      }));
      setSavedCards(cards);
    }
  }, []);

  const handleAddCard = (newCard: string) => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const loggedInUser = JSON.parse(storedUser);
      if (newCard && !savedCards.some(card => card.customDomain === newCard)) {
        addSavedCard(loggedInUser.customDomain, newCard);
        const newCardUser = getUserByCustomDomain(newCard);
        setSavedCards([
          ...savedCards,
          {
            customDomain: newCard,
            account: newCardUser ? newCardUser.account : "Unknown User",
          },
        ]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="inline-flex items-center mb-4 text-blue-500">
        <GoBack />
      </div>
      <div className="space-y-4">
        <CardShow cards={savedCards} />
        <div
          onClick={() => setIsModalOpen(true)}
          className="block p-4 bg-white rounded border border-gray-300 hover:bg-gray-100 transition cursor-pointer flex items-center justify-center"
        >
          <span className="text-2xl text-gray-400">+</span>
        </div>
      </div>
      {isModalOpen && <AddCardModal onAdd={handleAddCard} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
