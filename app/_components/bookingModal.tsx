"use client";

import { useEffect } from "react";
import { useTheme } from "./ThemeProvider";

interface BookingModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  // Add Calendly script when component mounts
  const { toggleBookingModal } = useTheme();
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

      <div className="w-screen h-screen bg-black z-50 fixed top-0 left-0 opacity-50" onClick={() => toggleBookingModal()}>
      </div>
      <div className={`fixed top-[50%] -translate-y-[50%] right-[50%] translate-x-[50%] z-50 w-full h-auto ${true ? "" : "invisible"}`} >
      <div onClick={(event) => {event.stopPropagation(); toggleBookingModal();}} style={{ cursor: 'pointer' }}>
        <div
          className="calendly-inline-widget"
          data-url="https://calendly.com/luckydev0331/30min"
          style={{ minWidth: '320px', height: '730px' }}
        />
      </div>
        <script
          type="text/javascript"
          src="https://assets.calendly.com/assets/external/widget.js"
        ></script>
        
      </div>
    </>
  );
}
