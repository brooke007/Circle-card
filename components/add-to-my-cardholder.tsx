"use client";

import { useState } from "react";
import { addSavedCard, getSavedCards } from "@/lib/data";

interface AddToMyCardholderProps {
  currentUser: string;
  targetUser: string;
}

export default function AddToMyCardholder({ currentUser, targetUser }: AddToMyCardholderProps) {
  const [isAdded, setIsAdded] = useState(getSavedCards(currentUser).includes(targetUser));

  const handleAdd = () => {
    if (!isAdded) {
      addSavedCard(currentUser, targetUser);
      setIsAdded(true);
    }
  };

  if (isAdded) {
    return null;
  }

  return (
    <button
      onClick={handleAdd}
      className="fixed bottom-4 left-4 right-4 bg-white text-gray-800 shadow-lg flex justify-around py-2 rounded-2xl border border-gray-300"
    >
      add to my cardholder
    </button>
  );
}
