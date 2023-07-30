"use client";

import { Html5QrcodeScanner } from "html5-qrcode";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const QrCodeScanner = ({ props }: { props: boolean }) => {
  const router = useRouter();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 20,
        qrbox: 250,
      },
      false
    );

    scanner.render(
      (success) => {
        if (success) {
          scanner.clear();
          router.push(success);
        }
      },
      (error) => {
        console.log(error);
        return <div>error</div>;
      }
    );

    return () => {
      scanner.clear();
    };
  }, [router]);

  return (
    <div className="max-w-md mx-auto">
        <h1>Scan QR Code</h1>
        <div id={`reader`} className="min-h-[300px]">
        </div>
    </div>
  )
};

export default QrCodeScanner;
