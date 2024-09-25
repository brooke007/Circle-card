"use client";

import { useRouter } from "next/navigation";

export default function GoBack() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="bg-transparent text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 transition-colors"
    >
      &lt;
    </button>
  );
}
