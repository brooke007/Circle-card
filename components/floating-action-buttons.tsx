import Link from "next/link";
import { Edit, Users, Globe } from "lucide-react";
import { useEffect, useState } from "react";

export default function FloatingActionButtons({ username }: { username: string }) {
  const [buttonSize, setButtonSize] = useState(24);

  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth;
      const newSize = Math.max(16, Math.min(32, viewportWidth / 15)); // Responsive size between 16 and 32
      setButtonSize(newSize);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 shadow-lg flex justify-around py-4">
      <Link
        href={`/${username}/edit`}
        className="p-4 bg-transparent hover:bg-gray-700 rounded-full transition-colors duration-300"
      >
        <Edit size={buttonSize} className="text-white" />
      </Link>
      <Link
        href={`/${username}/cardholder`}
        className="p-4 bg-transparent hover:bg-gray-700 rounded-full transition-colors duration-300"
      >
        <Users size={buttonSize} className="text-white" />
      </Link>
      <Link
        href={`/${username}/web3`}
        className="p-4 bg-transparent hover:bg-gray-700 rounded-full transition-colors duration-300"
      >
        <Globe size={buttonSize} className="text-white" />
      </Link>
    </div>
  );
}
