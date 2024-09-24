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
      className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors mt-4"
    >
      add to my cardholder
    </button>
  );
}
