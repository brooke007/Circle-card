import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';

const QRCodeScanner = () => {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  const handleScan = (data: string | null) => {
    if (data) {
      setResult(data);
      if (window.confirm(`Do you want to visit this link? ${data}`)) {
        window.location.href = data;
      }
      setIsScanning(false);
    }
  };

  const handleError = (err: Error) => {
    console.error(err);
    setError('Error occurred while scanning.');
  };

  const startScanning = () => {
    setIsScanning(true);
    setError(null);
    setResult(null);
  };

  const stopScanning = () => {
    setIsScanning(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 h-screen w-screen"> {/* 设置为全屏 */}
      <button 
        onClick={startScanning} 
        disabled={isScanning}
        className={`absolute top-4 right-4 mb-1 p-0 bg-transparent hover:bg-gray-400 disabled:opacity-50 active:bg-gray-500`} 
      >
        <img src="ScanQRcodeIcon.png" alt="Start" className="w-11 h-11" />
      </button>

      {isScanning ? (
        <div className="relative w-full h-full"> {/* 使QrScanner全屏 */}
          <QrScanner
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%', height: '100%' }} // 设置QrScanner为100%宽高
          />
          <button 
            onClick={stopScanning} 
            className="absolute top-2/3 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
          >
            Stop Scanning
          </button>
        </div>
      ) : (
        <p className="text-gray-300 text-xs">Scan</p>
      )}
      
      {result && <p className="mt-4 text-lg font-semibold">{result}</p>}
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
};

export default QRCodeScanner;
