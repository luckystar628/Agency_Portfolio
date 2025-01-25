"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

export default function BookingModal() {
  // Add Calendly script when component mounts
  const modalRef = useRef<HTMLDivElement>(null);
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
      <div>
        <div className="w-screen h-screen bg-black z-50 fixed top-0 left-0 opacity-50" />
        <div
          className={`fixed top-[50%] -translate-y-[50%] right-[50%] translate-x-[50%]  z-50 w-full h-auto ${
            true ? "" : "invisible"
          }`}
          ref={modalRef}
        >
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/luckydev0331/30min"
            style={{ minWidth: "320px", height: "730px" }}
          >
            <script
              type="text/javascript"
              src="https://assets.calendly.com/assets/external/widget.js"
            />
          </div>
        </div>
        <div className="bg-red-600 fixed w-screen h-screen top-0 left-0 opacity-0" style={{zIndex: 100}} onClick={toggleBookingModal}></div>
      </div>
    </>
  );
}
