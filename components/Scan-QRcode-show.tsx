import React, { useState } from "react";
import QrScanner from "react-qr-scanner";

const QRCodeScanner = ({ onClose }: { onClose: () => void }) => {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(true); // 默认开始扫描

  const handleScan = (data: string | null) => {
    if (data) {
      setResult(data);
      if (window.confirm(`Do you want to visit this link? ${data}`)) {
        window.location.href = data;
      }
      setIsScanning(false);
      onClose(); // 扫描完成后关闭
    }
  };

  const handleError = (err: Error) => {
    console.error(err);
    setError("Error occurred while scanning.");
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 h-screen w-screen">
      {isScanning && (
        <div className="relative w-full h-full">
          <QrScanner delay={300} onError={handleError} onScan={handleScan} style={{ width: "100%", height: "100%" }} />
          <button
            onClick={() => {
              setIsScanning(false);
              onClose();
            }}
            className="absolute top-2/3 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-white text-gray-800 rounded hover:bg-red-700 hover:text-white border border-gray-300"
          >
            Stop Scanning
          </button>
        </div>
      )}
      {result && <p className="mt-4 text-lg font-semibold">{result}</p>}
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
};

export default QRCodeScanner;
