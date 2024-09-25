import Link from "next/link";
import { Edit, Users, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import QRCodeScanner from "./Scan-QRcode-show";

export default function FloatingActionButtons({ username }: { username: string }) {
  const [buttonSize, setButtonSize] = useState(20);
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth;
      const newSize = Math.max(12, Math.min(30, viewportWidth / 20)); // Responsive size between 12 and 28
      setButtonSize(newSize);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleStartScanning = () => {
    setShowScanner(true);
  };

  const handleCloseScanner = () => {
    setShowScanner(false);
  };

  return (
    <>
      <div className="fixed bottom-4 left-4 right-4 bg-white shadow-lg flex justify-around py-1 rounded-2xl border border-gray-300">
        <Link
          href={`/${username}/edit`}
          className="p-2 bg-transparent hover:bg-gray-200 rounded-full transition-colors duration-300"
        >
          <Edit size={buttonSize} className="text-gray-900" />
        </Link>
        <Link
          href={`/${username}/cardholder`}
          className="p-2 bg-transparent hover:bg-gray-200 rounded-full transition-colors duration-300"
        >
          <Users size={buttonSize} className="text-gray-900" />
        </Link>
        <Link
          href={`/${username}/web3`}
          className="p-2 bg-transparent hover:bg-gray-200 rounded-full transition-colors duration-300"
        >
          <Globe size={buttonSize} className="text-gray-900" />
        </Link>
        <button
          onClick={handleStartScanning}
          className="p-2 bg-transparent hover:bg-gray-200 rounded-full transition-colors duration-300"
        >
          <img src="ScanQRcodeIcon.png" alt="Scan" className="w-5 h-5" />
        </button>
      </div>
      {showScanner && <QRCodeScanner onClose={handleCloseScanner} />}
    </>
  );
}
