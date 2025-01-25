"use client";

import { useEffect } from "react";

interface BookingModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  // Add Calendly script when component mounts
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div className="w-screen h-screen bg-black z-50 fixed top-0 left-0 opacity-50"></div>
      <div className={`fixed top-[50%] -translate-y-[50%] right-[50%] translate-x-[50%] z-50 w-full h-auto ${true ? "" : "invisible"}`}>
        <div
          className="calendly-inline-widget w-full h-full"
          data-url="https://calendly.com/luckydev0331/30min"
          style={{ minWidth: 320 + "px", height: 730 + "px" }}
        />
        <script
          type="text/javascript"
          src="https://assets.calendly.com/assets/external/widget.js"
        ></script>
      </div>
    </>
  );
}
